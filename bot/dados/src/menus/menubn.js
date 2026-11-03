// Menu de brincadeiras: no Modo Lite, as seções adultas somem.
import { desenhar } from './catalogo.js';

export default async function menubn(prefix, botName = "MeuBot", userName = "Usuário", isLiteMode = false, design = {}) {
  return desenhar('menubn', prefix, botName, userName, design, { lite: isLiteMode });
}
