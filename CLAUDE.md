# Opala

Bot de WhatsApp do Ruan. Os projetos dele têm nomes de pedras e gemas (Onix = launcher de TV, Amethyst, Opala = este bot).

## Ideia
- Base: a Nazuna Bot (https://github.com/DevTokyoVx/nazuna), em Node.js com a biblioteca Baileys. É gratuita e de código aberto. Os comandos de download (play, TikTok, Instagram) dependem da Vex API, que é paga.
- Objetivo: rodar 24h sozinho em uma máquina na nuvem. Opção preferida: Oracle Cloud "Always Free". Se não der, Google Cloud e2-micro ou uma hospedagem paga de bot.
- O usuário não sabe configurar servidor: guie passo a passo, com prints, e faça o máximo possível por SSH.
- Pasta criada em 27/10/2026.

## Situação (27/10/2026)
- Oracle e Google Cloud não deram certo: o único cartão do usuário é do Mercado Pago (pré-pago, recusado), e a conta antiga do Google Cloud foi encerrada.
- Hospedagem escolhida: **Waifly** (plano grátis, painel Pterodactyl em panel.waifly.com, servidor "Opala" id `961d5625`, 400 MB RAM, Node 22, Paris). Servidor desligado por 3 dias é suspenso.
- Nazuna 10.3.1 enviada ao servidor. Comando de início: `sh iniciar.sh` (põe `/home/container/bin` no PATH e roda `node --max-old-space-size=200 dados/src/connect.js` num laço que religa se o bot cair; sem o start.js por cima, para economizar memória).
- O servidor não tem ffmpeg: usamos o ffmpeg/ffprobe portátil (johnvansickle.com, amd64) em `bin/`, enviado com autorização do usuário.
- O "stop" do painel trava em "stopping"; para reiniciar, mande `kill` e depois `start` pela API.
- Bot **no ar** desde 27/10/2026: nome "A+ 3.0", prefixo `!`, dono Ruan ((numero do dono)), número do bot (numero do bot) (secundário, pareado por código). Sessão em `dados/database/qr-code` no servidor; ao reiniciar, conecta sozinho. Uso de memória: ~125 MB de 400.
- Vex API: chave gravada em `config.json` no servidor (cópia em `~/.config/opala/waifly.env`).
- Visual: banner pixel art e design do menu ficam em `arte/` (o banner vai para `dados/midias/menu.jpg`; o original da Nazuna ficou como `menu-nazuna-original.jpg`).
- Código do bot (Nazuna modificada) fica em `bot/` neste repositório; GitHub privado: https://github.com/ruan2311/opala. `config.json`, `database/` e `bin/` ficam só no servidor (ver `config.exemplo.json`).
- Textos na estética fofa do A+ (27/10/2026): `arte/fofo.py` refaz as trocas se a Nazuna for atualizada. Para publicar mudanças: empacotar só os arquivos alterados de `bot/` em .tar.gz, enviar pela API, descompactar em `/` e reiniciar (kill + start). Os arquivos `dados/src` usam quebra de linha CRLF: preservar ao editar.
- Menus e respostas autorais (03/11/2026): os menus saem de `bot/dados/src/menus/catalogo.js` (categorias → seções → comando e descrição; os arquivos de menu só chamam `desenhar()`). Respostas no jeito fofo do Opala com 💎 (ex.: "💎 Opa! Esse comando só funciona em grupo, tá? ♡"); comando novo deve seguir esse tom.
- Consumo (03/11/2026): a Waifly avisou do uso no limite. O bot roda sem o start.js, com teto de memória, 6 mensagens por vez e no máximo 800 mensagens guardadas. No painel, `STARTUP_CMD` virou `echo Pacotes ja instalados` (antes `npm install --save --production` a cada início); se precisar de pacote novo, volte o valor antigo, ligue uma vez e troque de novo.
- Mídias (03/11/2026): as imagens e vídeos dos jogos ficam em `bot/dados/midias/jogos/` (o `games.json` usa `jogos/arquivo`; links da internet também funcionam). A foto padrão de perfil fica em `midias/avatar-padrao.jpg`; o cartão de boas-vindas usa a cópia pública em `projectgems.github.io/img/avatar-padrao.jpg`. O guia de instalação para outras pessoas está no `README.md` da raiz.
- Dono (03/11/2026): o WhatsApp manda o remetente como LID. O `index.js` compara o número real que vem junto (`participantAlt`/`remoteJidAlt`, Baileys 7) com o `numerodono` (aceita com ou sem o 9) e guarda o `lidowner` sozinho. `!verificardono` mostra o diagnóstico.
- Sem depender da Vex (03/11/2026): `bot/dados/src/funcs/gratis.js` tem as opções grátis, tentadas antes da Vex: YouTube (yt-search + yt-dlp em `bin/yt-dlp` no servidor, um download por vez), TikTok pelo link (tikwm), letras (lrclib/lyrics.ovh), voz (Google + efeitos do ffmpeg), brat/bratvid/cartão de boas-vindas (sharp + fonte em `dados/midias/fontes`), transcrição (Groq, campo `groq_apikey`, ainda vazio). A Vex só entra como reserva se houver chave; ainda é necessária para Instagram, Pinterest, logos, efeitos de foto e busca do TikTok. Em 03/11/2026 a chave da Vex respondeu "limite 0/0".
- Teste no servidor: suba um `teste.sh` e um `iniciar.sh` que o rode antes do laço, reinicie, leia o console e depois restaure o `iniciar.sh` do repositório.
- Repositório público desde 03/11/2026. Antes, o histórico foi reescrito (git filter-repo) para tirar os números do dono e do bot: **no PC**, se o `git pull --ff-only` falhar, rode `git fetch && git reset --hard origin/main` (só se não houver mudanças locais sem enviar). Nunca escreva números de telefone, chaves ou senhas nos arquivos do repositório.
- Chave de API e senha do painel ficam em `~/.config/opala/waifly.env` (fora do repositório). Acesso pela API do Pterodactyl (`/api/client`).

## Cuidados
- Usar um número **secundário** no bot, nunca o principal (risco de banimento).
- A pasta de sessão do WhatsApp dá acesso total ao número: nunca subir para o GitHub (já está no `.gitignore`) e manter o servidor com acesso por chave ou senha forte.

## Como trabalhar com o usuário
- Tudo que o usuário vê vai em **português do Brasil**, inclusive as notas curtas entre ferramentas.
- Explique em linguagem simples, sem jargão.
- Confira antes de afirmar (servidor, arquivos, documentação); nunca chute.
- Prints para o usuário vão em `/sdcard/Download/Imagens para o claude`.
- O projeto pode ser editado no celular (Termux) e no PC. Ao abrir a sessão, um hook roda `git pull --ff-only`; se falhar, avise antes de mexer em arquivos. Depois que existir um repositório no GitHub, rode `git push` ao terminar tarefas que geraram commits.
