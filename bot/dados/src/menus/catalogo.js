// Catálogo dos menus do Opala: categorias, seções e o que cada comando faz.
// Os arquivos de menu só escolhem uma categoria daqui; o desenho respeita o design do dono
// (!designmenu): cabeçalho, bordas e ícones.
//
// Item com descrição: ['play <música>', 'toca a música que você pedir']
// Seção só com nomes, um comando por linha: { lista: ['burro', 'inteligente', ...] }
// adulto: true -> some quando o grupo está no Modo Lite.

const CATALOGO = {
  menu: {
    titulo: 'Menu',
    intro: 'Escolhe uma categoria e manda o comando ♡',
    secoes: [
      {
        titulo: '🎵 Diversão & mídia',
        itens: [
          ['menudown', 'músicas, vídeos e downloads'],
          ['menufig', 'figurinhas do seu jeito'],
          ['alteradores', 'efeitos em áudio, vídeo e imagem'],
          ['menulogos', 'logos com o seu nome'],
          ['menuedits', 'edições prontas pra fotos'],
          ['menubn', 'jogos e brincadeiras da galera'],
          ['menurpg', 'o RPG do grupo'],
        ],
      },
      {
        titulo: '🧰 Dia a dia',
        itens: [
          ['ferramentas', 'utilidades: clima, notas, lembretes...'],
          ['menumemb', 'seu perfil, rankings e conquistas'],
        ],
      },
      {
        titulo: '🛡️ Cuidar do grupo',
        itens: [
          ['menuadm', 'comandos dos admins'],
          ['menuvip', 'comandos VIP'],
          ['menudono', 'só pro meu dono'],
        ],
      },
    ],
  },

  menudown: {
    titulo: 'Músicas & downloads',
    intro: 'Manda o nome ou o link que eu busco pra você ♡',
    secoes: [
      {
        titulo: '🎵 Música',
        itens: [
          ['play <música>', 'toca a música que você pedir'],
          ['play2 <música>', 'outro jeito de buscar a música'],
          ['spotify <música>', 'busca no Spotify'],
          ['soundcloud <música>', 'busca no SoundCloud'],
          ['letra <música>', 'mostra a letra'],
        ],
      },
      {
        titulo: '🎬 Vídeo',
        itens: [['playvid <vídeo>', 'manda o vídeo do YouTube']],
      },
      {
        titulo: '📥 Baixar por link',
        itens: [
          ['tiktok <link>', 'vídeo do TikTok'],
          ['instagram <link>', 'post ou reels do Instagram'],
          ['igstory <usuário>', 'stories do Instagram'],
          ['kwai <link>', 'vídeo do Kwai'],
          ['facebook <link>', 'vídeo do Facebook'],
          ['twitter <link>', 'vídeo do X (Twitter)'],
          ['gdrive <link>', 'arquivo do Google Drive'],
          ['mediafire <link>', 'arquivo do MediaFire'],
        ],
      },
      {
        titulo: '🔎 Imagens',
        itens: [['pinterest <tema>', 'imagens do Pinterest']],
      },
    ],
  },

  menufig: {
    titulo: 'Figurinhas',
    intro: 'Manda ou responde uma imagem, vídeo ou figurinha ♡',
    secoes: [
      {
        titulo: '✨ Criar',
        itens: [
          ['sticker', 'transforma imagem ou vídeo em figurinha'],
          ['sticker2', 'figurinha sem cortar a imagem'],
          ['sbg', 'figurinha sem o fundo da foto'],
          ['sfundo', 'figurinha com fundo transparente'],
          ['ttp <texto>', 'figurinha de texto'],
          ['attp <texto>', 'figurinha de texto animada'],
          ['brat <texto>', 'figurinha no estilo brat'],
          ['bratvid <texto>', 'figurinha brat animada'],
          ['qc <texto>', 'figurinha de citação'],
          ['emojimix 😀+😎', 'mistura dois emojis'],
        ],
      },
      {
        titulo: '🗂️ Cuidar das figurinhas',
        itens: [
          ['toimg', 'transforma a figurinha em imagem'],
          ['take <autor>/<pacote>', 'muda o autor e o pacote'],
          ['rgtake <autor>/<pacote>', 'guarda seu autor e pacote'],
          ['rename', 'renomeia com o autor guardado'],
          ['figurinhas', 'pacote de figurinhas prontas'],
          ['figualeatoria', 'uma figurinha surpresa'],
        ],
      },
    ],
  },

  alteradores: {
    titulo: 'Efeitos',
    intro: 'Responde um áudio, vídeo ou imagem com o comando ♡',
    secoes: [
      {
        titulo: '🎬 Vídeo',
        itens: [
          ['cortarvideo <início> <fim>', 'corta um trecho'],
          ['tomp3', 'tira o áudio do vídeo'],
          ['videorapido', 'acelera o vídeo'],
          ['videolento', 'deixa o vídeo lento'],
          ['videoreverso', 'vídeo de trás pra frente'],
          ['videoloop', 'repete o vídeo'],
          ['videomudo', 'tira o som'],
          ['pretoebranco', 'vídeo em preto e branco'],
          ['sepia', 'vídeo com cor antiga'],
          ['espelhar', 'espelha o vídeo'],
          ['rotacionar', 'gira o vídeo'],
        ],
      },
      {
        titulo: '🖼️ Imagem',
        itens: [
          ['rmbg', 'tira o fundo da imagem'],
          ['upscale', 'melhora a qualidade da imagem'],
        ],
      },
      {
        titulo: '✂️ Áudio · edição',
        itens: [
          ['cortaraudio <início> <fim>', 'corta um trecho'],
          ['velocidade <0.5-3>', 'muda a velocidade'],
          ['normalizar', 'deixa o volume por igual'],
          ['volumeboost', 'aumenta o volume'],
          ['equalizar', 'equaliza o som'],
        ],
      },
      {
        titulo: '🗣️ Áudio · voz',
        itens: [
          ['vozmenino', 'voz de menino'],
          ['vozmulher', 'voz feminina'],
          ['vozhomem', 'voz masculina'],
          ['vozcrianca', 'voz de criança'],
          ['vozrapida', 'voz acelerada'],
          ['vozlenta', 'voz lenta'],
          ['vozgrave', 'voz grave'],
        ],
      },
      {
        titulo: '🎧 Áudio · efeitos',
        lista: ['bass', 'bass2', 'bass3', 'bassbn <1-20>', 'eco', 'reverb', 'vozcaverna', 'audioreverso', 'chorus', 'phaser', 'flanger', 'tremolo', 'vibrato', 'overdrive', 'pitch', 'lowpass'],
      },
    ],
  },

  menulogos: {
    titulo: 'Logos',
    intro: 'Manda o comando com o seu texto ♡',
    secoes: [
      {
        titulo: '✨ Com um texto',
        nota: 'ex.: !galaxy Opala',
        lista: ['amongus', 'royal', 'mascotemetal', 'firework', 'summerbeach', 'cloudsky', 'techstyle', 'watercolor', 'ligatures', 'graffitistyle', 'frozen', 'colorful', 'balloon', 'multicolor', 'metal', 'doubleexposure', 'mascoteneon', 'eraser', 'america', 'snow', 'sunset', 'halloween', 'blood', 'hallobat', 'cemiterio', 'ffavatar', 'vintage3d', 'hollywood', 'glitch', 'galaxy', 'glossy', 'dragonfire', 'pubgavatar', 'comics'],
      },
      {
        titulo: '✨ Com dois textos',
        nota: 'ex.: !marvel Opala/Bot',
        lista: ['avengers', 'marvel', 'deadpool', 'pornhub'],
      },
    ],
  },

  menuedits: {
    titulo: 'Edições',
    intro: 'Responde uma foto com o comando ♡',
    secoes: [
      {
        titulo: '📸 Efeitos de foto',
        itens: [
          ['jornal', 'sua foto na capa do jornal'],
          ['cinema', 'sua foto no telão'],
          ['camera', 'sua foto numa câmera'],
          ['blackwhite', 'foto em preto e branco'],
          ['desfoque', 'desfoca a foto'],
          ['wojakreaction', 'reação do wojak'],
        ],
      },
    ],
  },

  ferramentas: {
    titulo: 'Ferramentas',
    intro: 'Utilidades pro dia a dia ♡',
    secoes: [
      {
        titulo: '🌦️ Tempo & lugar',
        itens: [
          ['clima <cidade>', 'previsão do tempo'],
          ['hora <cidade>', 'que horas são lá'],
          ['horoscopo <signo>', 'seu horóscopo do dia'],
          ['signos', 'a lista dos signos'],
        ],
      },
      {
        titulo: '📝 Organização',
        itens: [
          ['nota add <texto>', 'guarda uma nota'],
          ['notas', 'mostra suas notas'],
          ['nota ver <id>', 'abre uma nota'],
          ['nota buscar <termo>', 'procura nas notas'],
          ['nota fixar <id>', 'fixa uma nota no topo'],
          ['nota del <id>', 'apaga uma nota'],
          ['lembrete', 'cria um lembrete'],
          ['meuslembretes', 'seus lembretes'],
          ['apagalembrete', 'apaga um lembrete'],
          ['aniversario', 'guarda seu aniversário'],
        ],
      },
      {
        titulo: '🔧 Utilidades',
        itens: [
          ['calc <conta>', 'calculadora'],
          ['calc converter <valor> <de> <para>', 'converte medidas'],
          ['tradutor', 'traduz um texto'],
          ['tts <texto>', 'transforma texto em áudio'],
          ['transcrever', 'transforma áudio em texto'],
          ['qrcode <texto>', 'cria um QR code'],
          ['lerqr', 'lê o QR code de uma imagem'],
          ['removebg', 'tira o fundo de uma imagem'],
          ['ssweb <link>', 'print de um site'],
          ['encurtalink <link>', 'encurta um link'],
          ['upload', 'gera um link pra sua mídia'],
          ['verificar <link>', 'confere se o link é seguro'],
          ['gerarnick <nome>', 'nicks estilosos'],
          ['estatisticas', 'números do bot'],
        ],
      },
    ],
  },

  menumemb: {
    titulo: 'Você & a galera',
    intro: 'Seu cantinho no grupo ♡',
    secoes: [
      {
        titulo: '👤 Perfil',
        itens: [
          ['perfil', 'seu perfil no grupo'],
          ['meustatus', 'seus números'],
          ['afk <motivo>', 'avisa que você saiu'],
          ['voltei', 'avisa que você voltou'],
          ['mention', 'escolhe se pode ser marcado'],
        ],
      },
      {
        titulo: '🏆 Rankings',
        itens: [
          ['rankativo', 'quem mais fala no grupo'],
          ['rankinativo', 'quem anda sumido'],
          ['atividade', 'atividade de alguém'],
          ['checkativo @user', 'confere um membro'],
          ['totalcmd', 'quantos comandos já usaram'],
          ['topcmd', 'os comandos mais usados'],
        ],
      },
      {
        titulo: '🎁 Conquistas & presentes',
        itens: [
          ['conquistas', 'suas conquistas'],
          ['caixa diaria', 'abre a caixa do dia'],
          ['caixa rara', 'abre uma caixa rara'],
          ['caixa lendaria', 'abre uma caixa lendária'],
          ['presente @user <tipo>', 'dá um presente'],
          ['inv', 'seu inventário'],
        ],
      },
      {
        titulo: '⭐ Reputação',
        itens: [
          ['rep + @user', 'dá reputação boa'],
          ['rep - @user', 'dá reputação ruim'],
          ['rep @user', 'vê a reputação'],
          ['toprep', 'os mais bem falados'],
          ['denunciar @user <motivo>', 'denuncia pros admins'],
          ['denuncias', 'lista as denúncias'],
        ],
      },
      {
        titulo: '🎉 Rolês & grupo',
        itens: [
          ['roles', 'os rolês marcados'],
          ['role.vou <código>', 'confirma presença'],
          ['role.nvou <código>', 'desmarca presença'],
          ['role.confirmados <código>', 'quem vai'],
          ['regras', 'as regras do grupo'],
          ['statusgp', 'como está o grupo'],
          ['statusbot', 'como eu estou'],
          ['ping', 'minha velocidade'],
        ],
      },
    ],
  },

  menubn: {
    titulo: 'Brincadeiras',
    intro: 'Precisa do modo brincadeira ligado no grupo ♡',
    secoes: [
      {
        titulo: '🎮 Jogos',
        itens: [
          ['jogodavelha @user', 'jogo da velha'],
          ['tictactoe @user', 'jogo da velha (outro jeito)'],
          ['connect4 @user', 'lig 4'],
          ['batalhanaval @user', 'batalha naval'],
          ['uno criar', 'abre uma partida de UNO'],
          ['uno entrar', 'entra na partida'],
          ['uno jogar <nº>', 'joga uma carta'],
          ['uno cancelar', 'cancela a partida'],
          ['forca', 'jogo da forca'],
          ['wordle', 'adivinhe a palavra'],
          ['anagrama', 'desembaralhe a palavra'],
          ['cacapalavras', 'caça-palavras'],
          ['memoria', 'jogo da memória'],
          ['memoria ranking', 'ranking da memória'],
          ['quiz <categoria>', 'perguntas e respostas'],
          ['dueloquiz @user', 'quiz contra alguém'],
          ['digitar @user', 'quem digita mais rápido'],
          ['stop', 'adedonha'],
          ['ppt', 'pedra, papel e tesoura'],
        ],
      },
      {
        titulo: '🔮 Sorte & destino',
        itens: [
          ['sn <pergunta>', 'respondo sim ou não'],
          ['chance <algo>', 'a chance de acontecer'],
          ['quando <algo>', 'quando vai acontecer'],
          ['sorte', 'sua sorte de hoje'],
          ['aura', 'mede a sua aura'],
          ['casal', 'sorteia o casal do grupo'],
          ['shipo @user', 'shippa você com alguém'],
          ['eununca', 'eu nunca'],
          ['vab', 'você prefere?'],
        ],
      },
      {
        titulo: '💬 Frases',
        lista: ['conselho', 'conselhobiblico', 'cantada', 'piada', 'charada', 'motivacional', 'elogio', 'reflexao', 'fato'],
      },
      {
        titulo: '🤝 Interações',
        nota: 'marca alguém',
        lista: ['abraco', 'beijo', 'cafune', 'tapa', 'chute', 'soco', 'morder', 'lamber', 'tomate', 'explodir', 'matar'],
      },
      {
        titulo: '🔥 Interações picantes',
        nota: 'marca alguém',
        adulto: true,
        lista: ['beijob', 'tapar', 'sexo', 'surubao', 'mamar', 'gozar'],
      },
      {
        titulo: '💞 Relacionamentos',
        itens: [
          ['namoro @user', 'pede em namoro'],
          ['casamento @user', 'pede em casamento'],
          ['relacionamento', 'seu status'],
          ['terminar', 'termina o relacionamento'],
          ['trair @user', 'trai seu par'],
          ['historicotraicao', 'as traições do grupo'],
          ['brincadeira @user', 'chama pra uma brincadeira'],
        ],
      },
      {
        titulo: '🎯 Testes (ele)',
        nota: 'marca alguém e eu digo a porcentagem',
        lista: ['burro', 'inteligente', 'otaku', 'fiel', 'infiel', 'gado', 'gostoso', 'feio', 'rico', 'pobre', 'safado', 'vesgo', 'bebado', 'chato', 'sortudo', 'azarado', 'forte', 'fraco', 'pegador', 'otario', 'macho', 'bobo', 'nerd', 'preguicoso', 'trabalhador', 'brabo', 'lindo', 'malandro', 'simpatico', 'engracado', 'charmoso', 'misterioso', 'carinhoso', 'humilde', 'desumilde', 'ciumento', 'corajoso', 'covarde', 'esperto', 'chorao', 'brincalhao', 'mito', 'padrao', 'comedia', 'fortao', 'gamer', 'programador', 'romantico', 'zueiro', 'sonhador', 'viajante', 'visionario', 'poderoso', 'vencedor', 'billionario', 'senhor'],
      },
      {
        titulo: '🎯 Testes (ela)',
        nota: 'marca alguém e eu digo a porcentagem',
        lista: ['burra', 'inteligente', 'otaku', 'fiel', 'infiel', 'gostosa', 'feia', 'rica', 'pobre', 'safada', 'vesga', 'bebada', 'chata', 'sortuda', 'azarada', 'forte', 'fraca', 'pegadora', 'otaria', 'boba', 'nerd', 'preguicosa', 'trabalhadora', 'braba', 'linda', 'malandra', 'simpatica', 'engracada', 'charmosa', 'misteriosa', 'carinhosa', 'humilde', 'desumilde', 'ciumenta', 'corajosa', 'covarde', 'esperta', 'chorona', 'brincalhona', 'mito', 'padrao', 'comedia', 'fortona', 'gamer', 'programadora', 'romantica', 'zueira', 'sonhadora', 'viajante', 'visionaria', 'poderosa', 'vencedora', 'bilionaria', 'senhora', 'fofoqueira', 'dorminhoca', 'caseira', 'criativa', 'estudiosa'],
      },
      {
        titulo: '🌶️ Testes sem filtro',
        nota: 'só fora do Modo Lite',
        adulto: true,
        lista: ['gay', 'lesbica', 'corno', 'corna', 'talarico', 'talarica', 'pirocudo', 'bucetuda', 'ladrao', 'ladra', 'psicopata', 'bandido', 'bandida', 'vagabundo', 'vagabunda', 'pilantra', 'traidor', 'traidora', 'cachorro', 'cachorra', 'machista', 'homofobico', 'homofobica', 'racista', 'nazista', 'bolsonarista', 'petista', 'lulista', 'comunista', 'suicidio'],
      },
      {
        titulo: '🏆 Rankings do grupo',
        nota: 'o top 5 de cada um',
        lista: ['rankburro', 'rankburra', 'rankinteligente', 'rankotaku', 'rankfiel', 'rankinfiel', 'rankgado', 'rankgada', 'rankgostoso', 'rankgostosa', 'rankrico', 'rankrica', 'rankpobre', 'rankforte', 'rankpegador', 'rankpegadora', 'rankmacho', 'ranknerd', 'ranktrabalhador', 'ranktrabalhadora', 'rankbrabo', 'rankbraba', 'ranklindo', 'ranklinda', 'rankmalandro', 'rankmalandra', 'rankengracado', 'rankengracada', 'rankcharmoso', 'rankcharmosa', 'rankvisionario', 'rankvisionaria', 'rankpoderoso', 'rankpoderosa', 'rankvencedor', 'rankvencedora'],
      },
      {
        titulo: '🌶️ Rankings sem filtro',
        adulto: true,
        lista: ['rankgay', 'ranklesbica', 'rankcorno', 'rankcorna'],
      },
    ],
  },

  menurpg: {
    titulo: 'RPG',
    intro: 'Precisa do Modo RPG ligado no grupo ⚔︎',
    secoes: [
      {
        titulo: '👤 Você',
        itens: [
          ['perfilrpg', 'sua ficha'],
          ['carteira', 'seu dinheiro'],
          ['inv', 'seu inventário'],
          ['equipamentos', 'o que você está usando'],
          ['meustats', 'seus números'],
          ['evoluir', 'sobe de nível'],
          ['prestige', 'recomeça mais forte'],
          ['streak', 'seus dias seguidos'],
          ['reivindicar', 'pega as recompensas'],
          ['class', 'vê e escolhe sua classe'],
        ],
      },
      {
        titulo: '🌅 Todo dia',
        itens: [
          ['diario', 'recompensa do dia'],
          ['work', 'trabalha'],
          ['mine', 'minera'],
          ['fish', 'pesca'],
          ['caçar', 'caça'],
          ['coletar', 'coleta recursos'],
          ['plantar <planta>', 'planta'],
          ['colher', 'colhe a plantação'],
          ['plantacao', 'sua plantação'],
          ['sementes', 'as sementes à venda'],
          ['cook <receita>', 'cozinha'],
          ['receitas', 'as receitas'],
          ['ingredientes', 'seus ingredientes'],
          ['eat <comida>', 'come'],
          ['vendercomida <item>', 'vende comida'],
        ],
      },
      {
        titulo: '💰 Dinheiro',
        itens: [
          ['dep <valor|all>', 'guarda no banco'],
          ['sacar <valor|all>', 'tira do banco'],
          ['pix @user <valor>', 'manda dinheiro'],
          ['loja', 'a loja'],
          ['comprar <item>', 'compra'],
          ['vender <item> <qtd>', 'vende'],
          ['vagas', 'empregos abertos'],
          ['emprego <vaga>', 'pega um emprego'],
          ['demitir', 'larga o emprego'],
          ['habilidades', 'suas habilidades'],
          ['investir', 'a bolsa de valores'],
          ['investir <ação> <qtd>', 'compra ações'],
          ['sell <ação> <qtd>', 'vende ações'],
          ['tributos', 'paga os impostos'],
          ['doar <valor>', 'doa dinheiro'],
          ['topriqueza', 'os mais ricos'],
        ],
      },
      {
        titulo: '🎰 Cassino',
        lista: ['dados <valor>', 'coinflip <cara|coroa> <valor>', 'slots <valor>', 'crash <valor>', 'roleta <valor> <cor>', 'blackjack <valor>', 'apostar <valor>', 'corrida <valor> <cavalo>', 'loteria', 'loteria comprar <qtd>', 'leilao'],
      },
      {
        titulo: '🗺️ Aventura & combate',
        itens: [
          ['explore', 'explora o mapa'],
          ['masmorra', 'entra na masmorra'],
          ['bossrpg', 'enfrenta o chefão'],
          ['dungeon', 'as dungeons'],
          ['dungeon criar <tipo>', 'abre uma dungeon'],
          ['dungeon entrar <id>', 'entra numa dungeon'],
          ['dungeon iniciar', 'começa a dungeon'],
          ['dungeon sair', 'sai da dungeon'],
          ['duelrpg @user', 'duela com alguém'],
          ['arena', 'luta na arena'],
          ['torneio', 'o torneio'],
          ['assaltar @user', 'assalta alguém'],
          ['crime', 'tenta um crime'],
          ['guerra', 'guerra entre clãs'],
          ['desafio', 'um desafio'],
          ['desafiosemanal', 'o desafio da semana'],
          ['desafiomensal', 'o desafio do mês'],
          ['missoes', 'suas missões'],
          ['eventos', 'os eventos'],
        ],
      },
      {
        titulo: '🔨 Itens & casa',
        itens: [
          ['forge <item>', 'forja um item'],
          ['enchant', 'encanta um item'],
          ['dismantle <item>', 'desmonta um item'],
          ['reparar <item>', 'conserta um item'],
          ['materiais', 'seus materiais'],
          ['precos', 'os preços'],
          ['casa', 'sua casa'],
          ['casa comprar <tipo>', 'compra uma casa'],
          ['casa coletar', 'coleta o que a casa rende'],
          ['casa decorar <item>', 'decora a casa'],
          ['propriedades', 'as propriedades'],
          ['cprop <id>', 'compra uma propriedade'],
          ['cprops', 'coleta as propriedades'],
        ],
      },
      {
        titulo: '🛒 Mercado',
        itens: [
          ['mercado', 'o mercado da galera'],
          ['listar <item> <preço>', 'anuncia um item'],
          ['cmerc <nº>', 'compra do mercado'],
          ['meusan', 'seus anúncios'],
          ['cancelar <nº>', 'cancela um anúncio'],
          ['auction', 'o leilão de itens'],
          ['auction vender <item> <preço>', 'leiloa um item'],
          ['auction comprar <nº>', 'dá um lance'],
          ['auction meus', 'seus leilões'],
          ['auction cancelar <nº>', 'cancela um leilão'],
        ],
      },
      {
        titulo: '🐾 Pets',
        itens: [
          ['pets', 'seus pets'],
          ['adotar <pet>', 'adota um pet'],
          ['feed <nº>', 'alimenta'],
          ['train <nº>', 'treina'],
          ['evolve <nº>', 'evolui'],
          ['petbattle <nº>', 'batalha de pets'],
          ['petbet <valor> <nº> @user', 'aposta numa batalha'],
          ['renamepet <nº> <nome>', 'muda o nome'],
          ['equippet <nº> <item>', 'equipa um item'],
          ['unequippet <nº>', 'tira um item'],
        ],
      },
      {
        titulo: '💞 Família & clã',
        itens: [
          ['namorar @user', 'namora no RPG'],
          ['casar @user', 'casa no RPG'],
          ['divorciar', 'se divorcia'],
          ['casais', 'os casais'],
          ['abracarrpg @user', 'abraça'],
          ['beijarrpg @user', 'beija'],
          ['baterrpg @user', 'bate'],
          ['proteger @user', 'protege'],
          ['familia', 'sua família'],
          ['adotaruser @user', 'adota alguém'],
          ['deserdar @user', 'deserda alguém'],
          ['arvore', 'sua árvore'],
          ['criarcla <nome>', 'cria um clã'],
          ['cla', 'seu clã'],
          ['convidar @user', 'convida pro clã'],
          ['aceitarconvite <clã>', 'aceita um convite'],
          ['recusarconvite <clã>', 'recusa um convite'],
          ['expulsar @user', 'expulsa do clã'],
          ['rmconvite @user', 'cancela um convite'],
          ['sair', 'sai do clã'],
        ],
      },
      {
        titulo: '🏆 Rankings & loja premium',
        itens: [
          ['toprpg', 'os melhores do grupo'],
          ['rankglobal', 'os melhores de todos'],
          ['ranklvl', 'ranking de nível'],
          ['vote @user', 'vota em alguém'],
          ['lojapremium', 'a loja premium'],
          ['comprarpremium <item>', 'compra na loja premium'],
          ['boost', 'acelera seus ganhos'],
        ],
      },
      {
        titulo: '🔧 Admin do RPG (dono)',
        lista: ['rpgadd @user <valor>', 'rpgremove @user <valor>', 'rpgsetlevel @user <nível>', 'rpgadditem @user <item> <qtd>', 'rpgremoveitem @user <item> <qtd>', 'rpgresetplayer @user', 'rpgresetglobal confirmar', 'rpgstats'],
      },
    ],
  },

  menuadm: {
    titulo: 'Admins',
    intro: 'Pra quem cuida do grupo ♡',
    secoes: [
      {
        titulo: '👥 Membros',
        itens: [
          ['ban @user', 'remove do grupo'],
          ['ban2 @user', 'remove sem aviso'],
          ['roletaban', 'sorteia alguém pra sair'],
          ['bam @user', 'ban de mentirinha'],
          ['setbammsg <texto>', 'mensagem do ban de mentirinha'],
          ['promover @user', 'vira admin'],
          ['rebaixar @user', 'deixa de ser admin'],
          ['mute @user', 'apaga as mensagens da pessoa'],
          ['desmute @user', 'tira o mute'],
          ['mute2 @user', 'outro modo de mute'],
          ['desmute2 @user', 'tira o mute2'],
          ['adv @user', 'dá uma advertência'],
          ['rmadv @user', 'tira uma advertência'],
          ['listadv', 'as advertências'],
          ['banghost <nº>', 'remove quem mandou poucas mensagens'],
        ],
      },
      {
        titulo: '📊 Atividade',
        itens: [
          ['atividade', 'a atividade do grupo'],
          ['checkativo @user', 'confere um membro'],
          ['limparrank', 'tira do rank quem saiu'],
          ['resetrank', 'zera o rank'],
          ['mantercontador', 'guarda o rank de quem sai'],
        ],
      },
      {
        titulo: '💬 Conversa',
        itens: [
          ['del', 'apaga a mensagem respondida'],
          ['limpar', 'limpa o chat'],
          ['marcar', 'marca todo mundo'],
          ['hidetag <texto>', 'marca todo mundo sem aparecer'],
          ['enquete', 'cria uma enquete'],
          ['sorteio', 'faz um sorteio'],
          ['automsg', 'mensagens automáticas'],
        ],
      },
      {
        titulo: '⚙️ O grupo',
        itens: [
          ['nomegp <nome>', 'muda o nome'],
          ['descgrupo <texto>', 'muda a descrição'],
          ['fotogrupo', 'muda a foto'],
          ['linkgp', 'link do grupo'],
          ['grupo a/f', 'abre ou fecha o grupo'],
          ['opengp HH:MM', 'abre num horário'],
          ['closegp HH:MM', 'fecha num horário'],
          ['addregra <texto>', 'cria uma regra'],
          ['delregra <nº>', 'apaga uma regra'],
          ['role.criar', 'marca um rolê'],
          ['role.alterar', 'muda um rolê'],
          ['role.excluir', 'cancela um rolê'],
          ['setprefix <símbolo>', 'muda meu prefixo no grupo'],
        ],
      },
      {
        titulo: '🚪 Entrada & saída',
        itens: [
          ['bemvindo', 'liga as boas-vindas'],
          ['bemvindo2', 'boas-vindas com imagem'],
          ['legendabv <texto>', 'texto das boas-vindas'],
          ['fotobv', 'foto das boas-vindas'],
          ['set-fotobv', 'outra foto de boas-vindas'],
          ['set-bannerbv', 'banner das boas-vindas'],
          ['rmfotobv', 'tira a foto das boas-vindas'],
          ['saida', 'avisa quando alguém sai'],
          ['legendasaiu <texto>', 'texto da saída'],
          ['fotosaiu', 'foto da saída'],
          ['rmfotosaiu', 'tira a foto da saída'],
          ['solicitacoes', 'pedidos pra entrar'],
          ['aprovar', 'aprova um pedido'],
          ['aprovar all', 'aprova todos'],
          ['recusarsolic', 'recusa os pedidos'],
        ],
      },
      {
        titulo: '🛡️ Proteções',
        nota: 'manda o comando pra ligar ou desligar',
        lista: ['antilinkgp', 'antilinkcanal', 'antilinkhard', 'antilinksoft', 'antiporn', 'antiflood', 'antidoc', 'antiloc', 'antifig', 'antistickerplus', 'antibtn', 'antistatus', 'antitoxic', 'antipalavra', 'anticategoria', 'x9', 'limitmessage', 'minmessage', 'antibanmarcar'],
      },
      {
        titulo: '🚫 Bloqueios',
        itens: [
          ['blockuser @user', 'eu ignoro a pessoa'],
          ['unblockuser @user', 'volto a responder'],
          ['listblocksgp', 'os bloqueados'],
          ['addblacklist @user', 'remove sempre que entrar'],
          ['delblacklist @user', 'tira da lista negra'],
          ['listblacklist', 'a lista negra'],
          ['blockcmd <comando>', 'bloqueia um comando'],
          ['unblockcmd <comando>', 'libera um comando'],
          ['wladd @user', 'libera das proteções'],
          ['wl.remove @user', 'tira da liberação'],
          ['wl.lista', 'os liberados'],
        ],
      },
      {
        titulo: '👮 Moderadores',
        itens: [
          ['addmod @user', 'cria um moderador'],
          ['delmod @user', 'tira um moderador'],
          ['listmods', 'os moderadores'],
          ['grantmodcmd <comando>', 'libera um comando pros mods'],
          ['revokemodcmd <comando>', 'tira um comando dos mods'],
          ['listmodcmds', 'comandos dos mods'],
        ],
      },
      {
        titulo: '✨ Modos do grupo',
        itens: [
          ['modobn', 'brincadeiras'],
          ['modorpg', 'RPG'],
          ['modolite', 'filtro pra crianças'],
          ['soadm', 'só admins usam o bot'],
          ['assistente', 'a IA conversa no grupo'],
          ['autosticker', 'toda imagem vira figurinha'],
          ['autodl', 'baixa links sozinho'],
          ['autotranscrever', 'transcreve áudios sozinho'],
          ['modoparceria', 'parcerias'],
          ['cmdlimit', 'limite de comandos'],
        ],
      },
      {
        titulo: '🤖 Respostas & parcerias',
        itens: [
          ['addautoadm', 'cria uma resposta automática'],
          ['addautoadmidia', 'resposta automática com mídia'],
          ['listautoadm', 'as respostas automáticas'],
          ['delautoadm', 'apaga uma resposta'],
          ['autorespostas', 'liga ou desliga as respostas'],
          ['parcerias', 'as parcerias'],
          ['addparceria', 'adiciona uma parceria'],
          ['delparceria', 'tira uma parceria'],
          ['fotomenugrupo', 'foto do menu no grupo'],
          ['infoperso', 'a personalização do grupo'],
        ],
      },
    ],
  },

  menudono: {
    titulo: 'Dono',
    intro: 'Os comandos só do meu dono ♡',
    secoes: [
      {
        titulo: '🤖 Eu',
        itens: [
          ['nomebot <nome>', 'meu nome'],
          ['prefixo <símbolo>', 'meu prefixo'],
          ['nomedono <nome>', 'o nome do dono'],
          ['numerodono <número>', 'o número do dono'],
          ['chaveia <chave>', 'a chave grátis da IA (no privado)'],
          ['fotobot', 'minha foto'],
          ['fotomenu', 'a imagem do menu'],
          ['videomenu', 'vídeo no menu'],
          ['audiomenu', 'áudio no menu'],
          ['lermais', 'o "ler mais" do menu'],
          ['setletraaura', 'a letra do !aura'],
          ['personalizargrupo', 'deixa cada grupo me personalizar'],
          ['configcmdnotfound', 'aviso de comando errado'],
          ['setcmdmsg', 'texto do aviso'],
          ['msgprefix', 'resposta quando só mandam o prefixo'],
          ['tutorial', 'o passo a passo'],
        ],
      },
      {
        titulo: '🎨 Visual do menu',
        lista: ['designmenu', 'setheader', 'settitulo', 'setborda', 'setbordameio', 'setbordafim', 'setitem', 'setseparador', 'resetdesign'],
      },
      {
        titulo: '🧠 Personalidade da IA',
        itens: [
          ['setpersonalidade', 'escolhe a personalidade'],
          ['criarpers', 'cria uma personalidade'],
          ['iaclear', 'limpa a memória da IA'],
        ],
      },
      {
        titulo: '🛠️ Comandos',
        itens: [
          ['addcmd', 'cria um comando'],
          ['addcmdmidia', 'comando com mídia'],
          ['listcmd', 'seus comandos'],
          ['delcmd', 'apaga um comando'],
          ['testcmd', 'testa um comando'],
          ['addalias', 'cria um apelido de comando'],
          ['listalias', 'os apelidos'],
          ['delalias', 'apaga um apelido'],
          ['addauto', 'resposta automática'],
          ['addautomidia', 'resposta automática com mídia'],
          ['listauto', 'as respostas automáticas'],
          ['delauto', 'apaga uma resposta'],
          ['addreact', 'reação automática'],
          ['listreact', 'as reações'],
          ['delreact', 'apaga uma reação'],
          ['addnopref', 'comando sem prefixo'],
          ['listnopref', 'os sem prefixo'],
          ['delnopref', 'apaga um sem prefixo'],
          ['cmdlimitar', 'limita um comando'],
          ['cmddeslimitar', 'tira o limite'],
          ['cmdlimites', 'os limites'],
        ],
      },
      {
        titulo: '👥 Pessoas',
        itens: [
          ['addsubdono @user', 'cria um subdono'],
          ['delsubdono @user', 'tira um subdono'],
          ['listasubdonos', 'os subdonos'],
          ['addcmd-subdono', 'libera um comando pro subdono'],
          ['removecmd-subdono', 'tira um comando do subdono'],
          ['listcmd-subdono', 'comandos dos subdonos'],
          ['addpremium @user', 'dá premium'],
          ['delpremium @user', 'tira premium'],
          ['listprem', 'os premium'],
          ['resetgold @user', 'zera o dinheiro do RPG'],
          ['addindicacao @user', 'conta uma indicação'],
          ['topindica', 'quem mais indicou'],
          ['delindicacao @user', 'tira uma indicação'],
          ['blockuserg @user', 'bloqueia em todos os grupos'],
          ['unblockuserg @user', 'desbloqueia'],
          ['addblackglobal @user', 'lista negra global'],
          ['listblackglobal', 'a lista negra global'],
          ['rmblackglobal @user', 'tira da lista negra global'],
        ],
      },
      {
        titulo: '💎 VIP',
        lista: ['menuvip', 'infovip', 'statsvip', 'addcmdvip', 'removecmdvip', 'listcmdvip', 'togglecmdvip'],
      },
      {
        titulo: '🏠 Grupos',
        itens: [
          ['listagp', 'os grupos onde estou'],
          ['entrar <link>', 'entro num grupo'],
          ['sairgp', 'saio do grupo'],
          ['seradm', 'me deixa admin'],
          ['sermembro', 'tira meu admin'],
          ['bangp', 'bane o grupo'],
          ['unbangp', 'desbane o grupo'],
          ['listbangp', 'grupos banidos'],
          ['blockcmdg <comando>', 'bloqueia em todos os grupos'],
          ['unblockcmdg <comando>', 'libera em todos'],
          ['listblocks', 'os bloqueios'],
          ['modoliteglobal', 'Modo Lite em todos'],
          ['limparrankg', 'limpa os ranks de todos'],
          ['nuke', 'remove todo mundo do grupo'],
        ],
      },
      {
        titulo: '💰 Aluguel',
        lista: ['modoaluguel', 'addaluguel', 'gerarcod', 'listaraluguel', 'infoaluguel', 'estenderaluguel', 'removeraluguel', 'listaluguel', 'limparaluguel', 'dayfree', 'setdiv', 'divulgar'],
      },
      {
        titulo: '📣 Transmissões',
        itens: [
          ['tm <texto>', 'manda pra todos os grupos'],
          ['tm2 <texto>', 'manda no privado de todos'],
          ['statustm', 'como está a transmissão'],
          ['divdono add', 'adiciona um grupo na divulgação'],
          ['divdono rem', 'tira um grupo'],
          ['divdono list', 'os grupos'],
          ['divdono msg', 'o texto'],
          ['divdono time', 'o intervalo'],
          ['divdono send', 'manda agora'],
          ['divdono status', 'como está'],
        ],
      },
      {
        titulo: '🔒 Privado & segurança',
        lista: ['antipv', 'antipv2', 'antipv3', 'antipv4', 'antipvmsg', 'antispamcmd', 'viewmsg'],
      },
      {
        titulo: '⚡ Manutenção',
        itens: [
          ['reiniciar', 'me reinicia'],
          ['reviverqr', 'reconecta o WhatsApp'],
          ['limpardb', 'limpa dados velhos'],
          ['cases', 'lista os comandos do código'],
          ['getcase <comando>', 'mostra o código de um comando'],
        ],
      },
      {
        titulo: '🤖 Sub-bots',
        lista: ['addsubbot', 'removesubbot', 'listarsubbots', 'conectarsubbot'],
      },
    ],
  },
};


function desenhar(chave, prefix, botName, userName, design = {}, opcoes = {}) {
  const menu = CATALOGO[chave];
  if (!menu) return '';
  const d = {
    header: `╭─── ⋆｡˚ 💎 *${botName}* 💎 ˚｡⋆ ───╮\n│ Oi, #user#! ♡\n╰──────────────────────╯`,
    menuTopBorder: '╭─ ',
    bottomBorder: '╰─────── ⋆｡˚ ✧ ───────',
    menuItemIcon: ' ♡ ',
    separatorIcon: '✦',
    middleBorder: '│',
    ...design,
  };
  const linhas = [String(d.header).replace(/#user#/g, userName), ''];
  linhas.push(`💎 *${menu.titulo}* · ${menu.intro}`, '');

  for (const secao of menu.secoes) {
    if (secao.adulto && opcoes.lite) continue;
    linhas.push(`${d.menuTopBorder}${d.separatorIcon} *${secao.titulo}*`);
    if (secao.nota) linhas.push(`${d.middleBorder} _${secao.nota}_`);
    linhas.push(d.middleBorder);
    if (secao.itens) {
      for (const [cmd, desc] of secao.itens) {
        linhas.push(`${d.middleBorder}${d.menuItemIcon}${prefix}${cmd} — _${desc}_`);
      }
    } else {
      for (const cmd of new Set(secao.lista)) {
        linhas.push(`${d.middleBorder}${d.menuItemIcon}${prefix}${cmd}`);
      }
    }
    linhas.push(d.bottomBorder, '');
  }

  linhas.push(chave === 'menu' ? `✧ Opala · feito com carinho ♡` : `✧ Manda *${prefix}menu* pra voltar ♡`);
  return linhas.join('\n');
}

export { CATALOGO, desenhar };
