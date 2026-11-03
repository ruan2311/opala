import https from 'https'
import fs from 'fs'
import verificarAPI from '../API.js'
import * as gratis from '../gratis.js'

const CONFIG_FILE = JSON.parse(
  fs.readFileSync(new URL('../../config.json', import.meta.url), 'utf8')
)

const cache = new Map()
const CACHE_TTL = 60 * 60 * 1000

function getCached(key) {
  const item = cache.get(key)

  if (!item) return null

  if (Date.now() - item.ts > CACHE_TTL) {
    cache.delete(key)
    return null
  }

  return item.val
}

function setCache(key, val) {
  if (cache.size >= 1000) {
    const oldest = cache.keys().next().value
    cache.delete(oldest)
  }

  cache.set(key, {
    val,
    ts: Date.now()
  })
}

function request(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch {
          reject(new Error('Resposta inválida da API'))
        }
      })
    }).on('error', reject)
  })
}

async function totextVex(url) {

  const checkAPI = await verificarAPI()

  if (checkAPI !== true) {
    return {
      ok: false,
      msg: checkAPI
    }
  }

  try {

    if (!url) {
      return {
        ok: false,
        msg: 'URL inválida'
      }
    }

    const cached = getCached(`totext:${url}`)

    if (cached) {
      return {
        ok: true,
        ...cached,
        cached: true
      }
    }

    const { apikey_vex, site_vex } = CONFIG_FILE

    const api =
      `${site_vex}/api/ias/transcrever?apikey=${apikey_vex}&query=${encodeURIComponent(url)}`

    const data = await request(api)

    const checkAfter = await verificarAPI(data)

    if (checkAfter !== true) {
      return {
        ok: false,
        msg: checkAfter
      }
    }

    if (!data?.status || !data?.texto) {
      return {
        ok: false,
        msg: 'Não foi possível transcrever o áudio'
      }
    }

    const result = {
      texto: data.texto,
      codigo: data.codigo || 200,
      message: data.message || 'sucesso'
    }

    setCache(`totext:${url}`, result)

    return {
      ok: true,
      ...result
    }

  } catch (err) {

    return {
      ok: false,
      msg: err.message
    }

  }
}

// Groq (chave grátis em console.groq.com, campo "groq_apikey" do config.json); Vex só como reserva
async function totext(url) {
  if (!url) return { ok: false, msg: 'URL inválida' }
  if (gratis.temGroq()) {
    try {
      const texto = await gratis.transcrever(url)
      if (texto) return { ok: true, texto, codigo: 200, message: 'sucesso' }
    } catch (err) {
      console.warn('[totext] Groq falhou:', err.message)
    }
  }
  if (gratis.temVex()) return totextVex(url)
  return {
    ok: false,
    msg: '💎 Pra eu transcrever áudio, o dono precisa colocar uma chave grátis da Groq (console.groq.com) no campo "groq_apikey" do config.json ♡'
  }
}

export { totext }