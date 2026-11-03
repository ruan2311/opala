import https from 'https'
import fs from 'fs'
import verificarAPI from '../API.js'
import * as gratis from '../gratis.js'
import ytSearch from 'yt-search'

const CONFIG_FILE = JSON.parse(
  fs.readFileSync(new URL('../../config.json', import.meta.url), 'utf8')
)

function request(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
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

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
    }).on('error', reject)
  })
}

async function searchVex(query) {
  const checkAPI = await verificarAPI()
  if (checkAPI !== true) return { ok: false, msg: checkAPI }

  try {
    const { apikey_vex, site_vex } = CONFIG_FILE
    const url = `${site_vex}/api/pesquisa/youtube?apikey=${apikey_vex}&query=${encodeURIComponent(query)}`

    const data = await request(url)


    const checkAfter = await verificarAPI(data)
    if (checkAfter !== true) return { ok: false, msg: checkAfter }

    if (!data?.status) {
      throw new Error('Erro ao buscar vídeo')
    }

    const results = data.results
    if (!results || results.length === 0) {
      return { ok: false, msg: 'Nenhum vídeo encontrado' }
    }

    const video = results[0]

    return {
      ok: true,
      data: {
        videoId: video.videoId,
        url: video.url,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        seconds: video.seconds,
        timestamp: video.timestamp,
        views: video.views,
        ago: video.ago,
        author: video.author?.name
      }
    }

  } catch (err) {
    return { ok: false, msg: err.message }
  }
}

async function mp3Vex(url) {
  const checkAPI = await verificarAPI()
  if (checkAPI !== true) return { ok: false, msg: checkAPI }

  try {
    const { apikey_vex, site_vex } = CONFIG_FILE
    const api = `${site_vex}/api/downloads/youtubemp3?apikey=${apikey_vex}&query=${encodeURIComponent(url)}`
    
    const data = await request(api)


    const checkAfter = await verificarAPI(data)
    if (checkAfter !== true) return { ok: false, msg: checkAfter }

    const resposta = data?.resposta

    if (!resposta?.dlurl) {
      throw new Error('URL de download não encontrada')
    }

    const buffer = await downloadFile(resposta.dlurl)

    return {
      ok: true,
      buffer,
      title: resposta.title || 'YouTube Audio',
      thumbnail: resposta.thumbnail || '',
      filename: `${(resposta.title || 'audio').replace(/[^\w\s]/gi, '')}.mp3`
    }

  } catch (err) {
    return { ok: false, msg: err.message }
  }
}

async function mp4Vex(url) {
  const checkAPI = await verificarAPI()
  if (checkAPI !== true) return { ok: false, msg: checkAPI }

  try {
    const { apikey_vex, site_vex } = CONFIG_FILE
    const api = `${site_vex}/api/downloads/youtubemp4?apikey=${apikey_vex}&query=${encodeURIComponent(url)}`
    
    const data = await request(api)


    const checkAfter = await verificarAPI(data)
    if (checkAfter !== true) return { ok: false, msg: checkAfter }

    const resposta = data?.resposta

    if (!resposta?.dlurl) {
      throw new Error('URL de download não encontrada')
    }

    const buffer = await downloadFile(resposta.dlurl)

    return {
      ok: true,
      buffer,
      title: resposta.title || 'YouTube Video',
      thumbnail: resposta.thumbnail || '',
      filename: `${(resposta.title || 'video').replace(/[^\w\s]/gi, '')}.mp4`
    }

  } catch (err) {
    return { ok: false, msg: err.message }
  }
}

// Pesquisa grátis com o yt-search (mesmos campos da Vex)
async function search(query) {
  try {
    const r = await ytSearch(query)
    const video = r?.videos?.[0]
    if (video) {
      return {
        ok: true,
        data: {
          videoId: video.videoId,
          url: video.url,
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail,
          seconds: video.seconds,
          timestamp: video.timestamp,
          views: video.views,
          ago: video.ago,
          author: video.author?.name
        }
      }
    }
  } catch (err) {
    console.warn('[youtube] pesquisa grátis falhou:', err.message)
  }
  if (gratis.temVex()) return searchVex(query)
  return { ok: false, msg: 'Nenhum vídeo encontrado' }
}

// Download com o yt-dlp (grátis, na pasta bin/ ou no sistema); a Vex só entra se ele falhar
async function baixar(url, tipo, reserva) {
  try {
    const { buffer, title } = await gratis.baixarYoutube(url, tipo)
    return {
      ok: true,
      buffer,
      title,
      thumbnail: '',
      filename: `${(title || (tipo === 'mp3' ? 'audio' : 'video')).replace(/[^\w\s]/gi, '')}.${tipo}`
    }
  } catch (err) {
    console.warn(`[youtube] yt-dlp falhou (${tipo}):`, err.message)
  }
  if (gratis.temVex()) return reserva(url)
  return { ok: false, msg: 'não deu pra baixar agora... tenta de novo daqui a pouquinho? (╥﹏╥)' }
}

const mp3 = url => baixar(url, 'mp3', mp3Vex)
const mp4 = url => baixar(url, 'mp4', mp4Vex)

export { search, mp3, mp4 }
export const ytmp3 = mp3
export const ytmp4 = mp4