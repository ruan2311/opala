// Menu montado a partir do catálogo (catalogo.js), com o design do dono.
import { desenhar } from './catalogo.js';

export default async function menuedits(prefix, botName = "MeuBot", userName = "Usuário", design = {}) {
  return desenhar('menuedits', prefix, botName, userName, design);
}
