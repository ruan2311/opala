import https from 'https';
import fs from 'fs';
import verificarAPI from '../API.js';
import * as gratis from '../gratis.js';

const CONFIG_FILE = JSON.parse(
    fs.readFileSync(new URL('../../config.json', import.meta.url), 'utf8')
);

const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000;

function getCached(key) {
    const item = cache.get(key);
    if (!item) return null;
    if (Date.now() - item.ts > CACHE_TTL) {
        cache.delete(key);
        return null;
    }
    return item.val;
}

function setCache(key, val) {
    if (cache.size >= 1000) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
    }
    cache.set(key, { val, ts: Date.now() });
}

/**
 * Gera imagem estática Brat (Retorna a URL direta)
 */
async function gerarbratVex(query, bg, text_color, blur) {
    const checkAPI = await verificarAPI();
    if (checkAPI !== true) return { ok: false, msg: checkAPI };

    try {
        if (!query) return { ok: false, msg: 'O texto (query) é obrigatório' };

        const cacheKey = `brat:${query.toLowerCase()}:${bg}:${text_color}:${blur}`;
        const cached = getCached(cacheKey);
        if (cached) return { ok: true, ...cached, cached: true };

        const { apikey_vex, site_vex } = CONFIG_FILE;

        // Monta a URL que retorna a imagem diretamente
        let url = `${site_vex}/api/canvas/brat?apikey=${apikey_vex}&query=${encodeURIComponent(query)}`;
        if (bg) url += `&bg=${encodeURIComponent(bg)}`;
        if (text_color) url += `&text_color=${encodeURIComponent(text_color)}`;
        if (blur) url += `&blur=${encodeURIComponent(blur)}`;

        const result = {
            criador: 'Tokyo',
            type: 'image',
            mime: 'image/webp',
            query,
            url: url // A URL é o próprio endpoint, pois ele já entrega a imagem
        };

        setCache(cacheKey, result);
        return { ok: true, ...result };

    } catch (err) {
        return { ok: false, msg: err.message };
    }
}


async function gerarbratvidVex(query, bg, text_color, bpm, blur) {
    const checkAPI = await verificarAPI();
    if (checkAPI !== true) return { ok: false, msg: checkAPI };

    try {
        if (!query) return { ok: false, msg: 'O texto (query) é obrigatório' };

        const cacheKey = `bratvid:${query.toLowerCase()}:${bg}:${text_color}:${bpm}:${blur}`;
        const cached = getCached(cacheKey);
        if (cached) return { ok: true, ...cached, cached: true };

        const { apikey_vex, site_vex } = CONFIG_FILE;


        let url = `${site_vex}/api/canvas/bratvideo?apikey=${apikey_vex}&query=${encodeURIComponent(query)}`;
        if (bg) url += `&bg=${encodeURIComponent(bg)}`;
        if (text_color) url += `&text_color=${encodeURIComponent(text_color)}`;
        if (bpm) url += `&bpm=${encodeURIComponent(bpm)}`;
        if (blur) url += `&blur=${encodeURIComponent(blur)}`;

        const result = {
            criador: 'Tokyo',
            type: 'video',
            mime: 'image/webp',
            query,
            url: url
        };

        setCache(cacheKey, result);
        return { ok: true, ...result };

    } catch (err) {
        return { ok: false, msg: err.message };
    }
}


async function gerarwelcomecardVex(avatar, nome, texto, fundo, corMoldura, corLinhas, glow) {
    const checkAPI = await verificarAPI();
    if (checkAPI !== true) return { ok: false, msg: checkAPI };

    try {

        if (!avatar || !nome) {
            return { ok: false, msg: 'Avatar e Nome são obrigatórios para o Welcome Card' };
        }

        const { apikey_vex, site_vex } = CONFIG_FILE;


        let url = `${site_vex}/api/canvas/welcome2?apikey=${apikey_vex}` +
            `&avatar=${encodeURIComponent(avatar)}` +
            `&nome=${encodeURIComponent(nome)}` +
            `&texto=${encodeURIComponent(texto || '')}` +
            `&fundo=${encodeURIComponent(fundo || '')}` +
            `&corMoldura=${encodeURIComponent(corMoldura || '')}` +
            `&corLinhas=${encodeURIComponent(corLinhas || '')}` +
            `&glow=${glow || 'false'}`;

        const result = {
            criador: 'Tokyo',
            type: 'image',
            mime: 'image/png',
            nome,
            url: url
        };


        return { ok: true, ...result };

    } catch (err) {
        return { ok: false, msg: err.message };
    }
}

// As três abaixo são feitas no próprio bot (sharp + fonte em dados/midias/fontes).
// Devolvem "buffer"; a Vex (que devolve "url") só entra se a geração local falhar.
async function gerarbrat(query, bg, text_color, blur) {
    if (!query) return { ok: false, msg: 'O texto (query) é obrigatório' };
    try {
        const buffer = await gratis.brat(query, bg, text_color, blur);
        return { ok: true, type: 'image', mime: 'image/webp', query, buffer };
    } catch (err) {
        console.warn('[brat] geração local falhou:', err.message);
    }
    return gratis.temVex() ? gerarbratVex(query, bg, text_color, blur) : { ok: false, msg: '💎 Não consegui fazer a figurinha brat... (╥﹏╥)' };
}

async function gerarbratvid(query, bg, text_color, bpm, blur) {
    if (!query) return { ok: false, msg: 'O texto (query) é obrigatório' };
    try {
        const buffer = await gratis.bratAnimado(query, bg, text_color, bpm, blur);
        return { ok: true, type: 'video', mime: 'image/webp', query, buffer };
    } catch (err) {
        console.warn('[bratvid] geração local falhou:', err.message);
    }
    return gratis.temVex() ? gerarbratvidVex(query, bg, text_color, bpm, blur) : { ok: false, msg: '💎 Não consegui fazer a figurinha brat animada... (╥﹏╥)' };
}

async function gerarwelcomecard(avatar, nome, texto, fundo, corMoldura, corLinhas, glow) {
    if (!nome) return { ok: false, msg: 'Nome é obrigatório para o cartão' };
    try {
        const buffer = await gratis.cartaoBoasVindas(avatar, nome, texto, fundo, corMoldura, corLinhas);
        return { ok: true, type: 'image', mime: 'image/png', nome, buffer };
    } catch (err) {
        console.warn('[boas-vindas] cartão local falhou:', err.message);
    }
    return gratis.temVex() ? gerarwelcomecardVex(avatar, nome, texto, fundo, corMoldura, corLinhas, glow) : { ok: false, msg: 'Não consegui gerar o cartão' };
}

export {
    gerarbrat,
    gerarbratvid,
    gerarwelcomecard
};
