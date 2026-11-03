// Menu montado a partir do catálogo (catalogo.js), com o design do dono.
import { desenhar } from './catalogo.js';

export default async function menuadm(prefix, botName = "MeuBot", userName = "Usuário", design = {}) {
  return desenhar('menuadm', prefix, botName, userName, design);
}
