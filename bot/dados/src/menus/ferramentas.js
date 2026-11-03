// Menu montado a partir do catálogo (catalogo.js), com o design do dono.
import { desenhar } from './catalogo.js';

export default async function menuFerramentas(prefix, botName = "MeuBot", userName = "Usuário", design = {}) {
  return desenhar('ferramentas', prefix, botName, userName, design);
}
