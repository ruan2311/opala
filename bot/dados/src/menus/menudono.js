// Menu montado a partir do catálogo (catalogo.js), com o design do dono.
import { desenhar } from './catalogo.js';

export default async function menuDono(prefix, botName = "MeuBot", userName = "Usuário", design = {}) {
  return desenhar('menudono', prefix, botName, userName, design);
}
