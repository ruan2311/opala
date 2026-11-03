# 💎 Opala

Bot de WhatsApp do **Project Gems** ([projectgems.github.io](https://projectgems.github.io)), feito em Node.js com a biblioteca [Baileys](https://github.com/WhiskeySockets/Baileys). No ar com o nome **A+ 3.0** e o prefixo `!`.

## Como rodar
1. Node.js 20 ou mais novo.
2. `npm install`
3. Copie `dados/src/config.exemplo.json` para `dados/src/config.json` e preencha nome do bot, dono e prefixo.
4. `sh iniciar.sh` (ou `npm start`). Na primeira vez, conecte o número pelo código de pareamento.

Use sempre um **número secundário** no bot, nunca o principal.

## O que não vai para o GitHub
`dados/src/config.json` (chaves), `dados/database/` (a sessão do WhatsApp dá acesso total ao número) e `bin/` ficam só no servidor.

## Atualizações
O Opala não se atualiza sozinho: as versões novas saem deste repositório e são enviadas ao servidor.

## Licença
Veja o arquivo [LICENSE](LICENSE).
