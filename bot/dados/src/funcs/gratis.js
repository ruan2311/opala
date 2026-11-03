// Opções grátis usadas antes da Vex API.
// Cada função daqui é tentada primeiro; se falhar (ou não existir), o módulo que chamou
// usa a Vex como reserva, mas só se houver chave configurada. Assim o bot funciona sem a Vex.
import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..'); // pasta do bot
const FONTES = path.join(RAIZ, 'dados', 'midias', 'fontes');
const FONTE = path.join(FONTES, 'NimbusSansNarrow-Regular.otf');
const FONTE_NEGRITO = path.join(FONTES, 'NimbusSansNarrow-Bold.otf');

function lerConfig() {
  try {
    return JSON.parse(fs.readFileSync(path.join(RAIZ, 'dados', 'src', 'config.json'), 'utf8'));
  } catch {
    return {};
  }
}

// Há chave da Vex de verdade? ("SUA_KEY" e "SUAKEY" são valores de exemplo)
function temVex() {
  const chave = String(lerConfig().apikey_vex || '').trim();
  return chave !== '' && !['SUA_KEY', 'SUAKEY'].includes(chave);
}

async function buscar(url, opcoes = {}, ms = 20000) {
  return fetch(url, { ...opcoes, signal: AbortSignal.timeout(ms) });
}

async function baixarBuffer(origem) {
  if (Buffer.isBuffer(origem)) return origem;
  if (!/^https?:\/\//.test(origem)) return fs.readFileSync(origem);
  const r = await buscar(origem, { headers: { 'user-agent': 'Mozilla/5.0' } }, 60000);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

// Roda um programa e devolve a saída. Com "entrada", manda o buffer para o programa.
function rodar(programa, args, { entrada = null, ms = 180000 } = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(programa, args, { stdio: ['pipe', 'pipe', 'pipe'] });
    const saida = [];
    let erro = '';
    const tempo = setTimeout(() => p.kill('SIGKILL'), ms);
    p.stdout.on('data', c => saida.push(c));
    p.stderr.on('data', c => { erro = (erro + c).slice(-2000); });
    p.on('error', e => { clearTimeout(tempo); reject(e); });
    p.on('close', codigo => {
      clearTimeout(tempo);
      if (codigo === 0) resolve(Buffer.concat(saida));
      else reject(new Error(erro.trim().split('\n').pop() || `${programa} saiu com código ${codigo}`));
    });
    if (entrada) p.stdin.end(entrada); else p.stdin.end();
  });
}

// ==================== TikTok (tikwm.com) ====================

async function tiktok(url) {
  const r = await buscar(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`);
  const j = await r.json();
  const d = j?.data;
  if (j?.code !== 0 || !d) throw new Error(j?.msg || 'tikwm sem resposta');
  const completo = u => (u && u.startsWith('/') ? `https://www.tikwm.com${u}` : u);
  const fotos = Array.isArray(d.images) && d.images.length ? d.images : null;
  return {
    title: d.title,
    type: fotos ? 'image' : 'video',
    mime: fotos ? 'image/jpeg' : 'video/mp4',
    urls: fotos || [completo(d.hdplay || d.play)].filter(Boolean),
    author: d.author?.nickname,
    username: d.author?.unique_id,
    views: d.play_count,
    likes: d.digg_count,
    comments: d.comment_count,
    shares: d.share_count
  };
}

// ==================== Letras (lrclib.net e lyrics.ovh) ====================

async function letra(busca) {
  try {
    const r = await buscar(`https://lrclib.net/api/search?q=${encodeURIComponent(busca)}`, {
      headers: { 'user-agent': 'Opala (https://projectgems.github.io)' }
    });
    if (r.ok) {
      const m = (await r.json()).find(x => x.plainLyrics);
      if (m) return { titulo: m.trackName, artista: m.artistName, letra: m.plainLyrics.trim() };
    }
  } catch {}

  // Reserva: o lyrics.ovh precisa de artista e música separados; a sugestão dele descobre os dois
  const s = await buscar(`https://api.lyrics.ovh/suggest/${encodeURIComponent(busca)}`);
  const sugestao = s.ok ? (await s.json())?.data?.[0] : null;
  if (!sugestao) return null;
  const artista = sugestao.artist?.name;
  const titulo = sugestao.title;
  const r = await buscar(`https://api.lyrics.ovh/v1/${encodeURIComponent(artista)}/${encodeURIComponent(titulo)}`);
  const j = r.ok ? await r.json() : null;
  if (!j?.lyrics) return null;
  return { titulo, artista, letra: j.lyrics.trim(), imagem: sugestao.album?.cover_big };
}

// ==================== Texto em voz (Google Tradutor + efeitos do ffmpeg) ====================

const EFEITOS_VOZ = {
  feminino: null,
  masculino: 'asetrate=24000*0.78,aresample=24000,atempo=1.28',
  robo: "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75",
  alien: 'asetrate=24000*1.35,aresample=24000,atempo=0.74,aecho=0.8:0.85:35:0.35'
};

async function voz(texto, modelo = 'feminino', idioma = 'pt-BR') {
  // O Google aceita até ~200 letras por vez: divide nas palavras e junta os pedaços
  const partes = [];
  let atual = '';
  for (const palavra of String(texto).slice(0, 1000).split(/\s+/)) {
    if ((atual + ' ' + palavra).trim().length > 190) { partes.push(atual.trim()); atual = ''; }
    atual += ' ' + palavra;
  }
  if (atual.trim()) partes.push(atual.trim());

  const audios = [];
  for (const parte of partes) {
    const u = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${idioma}&q=${encodeURIComponent(parte)}`;
    const r = await buscar(u, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!r.ok) throw new Error(`Google TTS HTTP ${r.status}`);
    audios.push(Buffer.from(await r.arrayBuffer()));
  }
  const mp3 = Buffer.concat(audios);
  const efeito = EFEITOS_VOZ[modelo];
  if (!efeito) return mp3;
  return rodar('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', 'pipe:0', '-af', efeito, '-f', 'mp3', 'pipe:1'], { entrada: mp3, ms: 60000 });
}

// ==================== Áudio em texto (Groq, chave grátis em console.groq.com) ====================

function temGroq() {
  return String(lerConfig().groq_apikey || '').trim() !== '';
}

async function transcrever(origem) {
  const chave = String(lerConfig().groq_apikey || '').trim();
  if (!chave) throw new Error('sem chave da Groq');
  const audio = await baixarBuffer(origem);
  const form = new FormData();
  form.append('file', new Blob([audio]), 'audio.ogg');
  form.append('model', 'whisper-large-v3-turbo');
  form.append('language', 'pt');
  const r = await buscar('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${chave}` },
    body: form
  }, 120000);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || typeof j.text !== 'string') throw new Error(j?.error?.message || `Groq HTTP ${r.status}`);
  return j.text.trim();
}

// ==================== Figurinha brat (feita aqui, com a sharp) ====================

const escaparTexto = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const corValida = (cor, padrao) => {
  const c = String(cor || '').trim().replace(/^%23/, '#');
  return /^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(c) ? (c.startsWith('#') ? c : '#' + c) : (/^[a-z]+$/i.test(c) ? c.toLowerCase() : padrao);
};

const LADO = 512;
const MARGEM = 28;

// Desenha o texto. Sem "dpi", a sharp escolhe o maior tamanho que cabe no quadrado.
async function textoBrat(texto, cor, dpi) {
  const opcoes = {
    text: `<span foreground="${cor}">${escaparTexto(texto)}</span>`,
    fontfile: FONTE,
    font: 'Nimbus Sans Narrow',
    width: LADO - MARGEM * 2,
    rgba: true,
    align: 'left',
    wrap: 'word'
  };
  if (dpi) opcoes.dpi = dpi; else opcoes.height = LADO - MARGEM * 2;
  return sharp({ text: opcoes }).png().toBuffer({ resolveWithObject: true });
}

async function quadroBrat(textoPng, fundo, blur) {
  return sharp({ create: { width: LADO, height: LADO, channels: 4, background: fundo } })
    .composite([{ input: textoPng, left: MARGEM, top: MARGEM }])
    .blur(blur)
    .png()
    .toBuffer();
}

async function brat(texto, fundo, corTexto, blur) {
  const bg = corValida(fundo, 'white');
  const cor = corValida(corTexto, 'black');
  const desfoque = Math.min(Math.max(Number(blur) || 1.1, 0.3), 6);
  const { data } = await textoBrat(texto, cor);
  return sharp(await quadroBrat(data, bg, desfoque)).webp({ quality: 90 }).toBuffer();
}

// Versão animada: as palavras aparecem uma de cada vez, no ritmo do "bpm"
async function bratAnimado(texto, fundo, corTexto, bpm, blur) {
  const bg = corValida(fundo, 'white');
  const cor = corValida(corTexto, 'black');
  const desfoque = Math.min(Math.max(Number(blur) || 1.1, 0.3), 6);
  const palavras = String(texto).trim().split(/\s+/).slice(0, 40);
  const passo = Math.round(60000 / Math.min(Math.max(Number(bpm) || 120, 40), 300));
  const { info } = await textoBrat(palavras.join(' '), cor);
  const dpi = info.textAutofitDpi || 72;

  const quadros = [];
  for (let i = 1; i <= palavras.length; i++) {
    const { data } = await textoBrat(palavras.slice(0, i).join(' '), cor, dpi);
    quadros.push(await quadroBrat(data, bg, desfoque));
  }
  const tempos = quadros.map((_, i) => (i === quadros.length - 1 ? 1500 : passo));
  return sharp(quadros, { join: { animated: true } }).webp({ quality: 80, delay: tempos, loop: 0 }).toBuffer();
}

// ==================== Cartão de boas-vindas (feito aqui, com a sharp) ====================

async function cartaoBoasVindas(avatar, nome, titulo, fundo, corMoldura, corLinhas) {
  const L = 1024, A = 450, R = 140;
  const moldura = corValida(corMoldura, '#f0a46b');
  const linhas = corValida(corLinhas, '#ffffff');

  let base;
  try {
    if (!fundo) throw new Error('sem fundo');
    base = await sharp(await baixarBuffer(fundo)).resize(L, A, { fit: 'cover' }).modulate({ brightness: 0.55 }).png().toBuffer();
  } catch {
    base = await sharp(Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${A}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="#2a1a3a"/><stop offset="1" stop-color="#7a3d52"/></linearGradient></defs>` +
      `<rect width="100%" height="100%" fill="url(#g)"/></svg>`
    )).png().toBuffer();
  }

  let foto;
  try {
    foto = await baixarBuffer(avatar);
  } catch {
    foto = fs.readFileSync(path.join(RAIZ, 'dados', 'midias', 'avatar-padrao.jpg'));
  }
  const circulo = Buffer.from(`<svg width="${R * 2}" height="${R * 2}"><circle cx="${R}" cy="${R}" r="${R}" fill="#fff"/></svg>`);
  const fotoRedonda = await sharp(foto).resize(R * 2, R * 2, { fit: 'cover' })
    .composite([{ input: circulo, blend: 'dest-in' }]).png().toBuffer();
  const anel = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${L}" height="${A}">` +
    `<circle cx="${70 + R}" cy="${A / 2}" r="${R + 8}" fill="none" stroke="${moldura}" stroke-width="10"/>` +
    `<line x1="400" y1="${A / 2 + 6}" x2="${L - 70}" y2="${A / 2 + 6}" stroke="${linhas}" stroke-opacity="0.6" stroke-width="3"/></svg>`
  );

  const texto = async (t, negrito, altura) => (await sharp({
    text: {
      text: `<span foreground="#ffffff">${escaparTexto(t)}</span>`,
      fontfile: negrito ? FONTE_NEGRITO : FONTE, font: negrito ? 'Nimbus Sans Narrow Bold' : 'Nimbus Sans Narrow',
      width: L - 470, height: altura, rgba: true, wrap: 'char'
    }
  }).png().toBuffer());

  return sharp(base).composite([
    { input: anel, left: 0, top: 0 },
    { input: fotoRedonda, left: 70, top: A / 2 - R },
    { input: await texto(titulo || 'Bem-vindo(a)!', true, 90), left: 400, top: A / 2 - 100 },
    { input: await texto(nome, false, 60), left: 400, top: A / 2 + 30 }
  ]).png().toBuffer();
}

// ==================== YouTube (yt-dlp) ====================

// Procura o yt-dlp na pasta bin/ do bot e, se não achar, no sistema
function caminhoYtDlp() {
  for (const nome of ['yt-dlp', 'yt-dlp.exe']) {
    const p = path.join(RAIZ, 'bin', nome);
    if (fs.existsSync(p)) {
      try { fs.chmodSync(p, 0o755); } catch {}
      return p;
    }
  }
  return 'yt-dlp';
}

// Um download por vez, para não estourar a memória em planos pequenos
let filaYt = Promise.resolve();

function baixarYoutube(url, tipo) {
  const tarefa = filaYt.then(async () => {
    const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'opala-yt-'));
    try {
      const args = ['--no-warnings', '--no-playlist', '--max-filesize', '90M', '-o', path.join(pasta, 'arquivo.%(ext)s'), '--print', 'after_move:title'];
      if (tipo === 'mp3') {
        args.push('-f', 'bestaudio/best', '-x', '--audio-format', 'mp3', '--audio-quality', '128K');
      } else {
        // H.264 (avc1) primeiro: é o que o WhatsApp toca em qualquer celular
        args.push('-f', 'bv*[height<=480][vcodec^=avc1]+ba[ext=m4a]/bv*[height<=480][ext=mp4]+ba[ext=m4a]/b[height<=480]', '--merge-output-format', 'mp4');
      }
      args.push(url);
      const titulo = (await rodar(caminhoYtDlp(), args, { ms: 300000 })).toString().trim().split('\n').pop();
      const arquivo = fs.readdirSync(pasta).find(f => f.startsWith('arquivo.'));
      if (!arquivo) throw new Error('o arquivo não foi baixado (pode ser grande demais)');
      return { buffer: fs.readFileSync(path.join(pasta, arquivo)), title: titulo || 'YouTube' };
    } finally {
      fs.rmSync(pasta, { recursive: true, force: true });
    }
  });
  filaYt = tarefa.catch(() => {});
  return tarefa;
}

export {
  temVex,
  temGroq,
  tiktok,
  letra,
  voz,
  transcrever,
  brat,
  bratAnimado,
  cartaoBoasVindas,
  baixarYoutube
};
