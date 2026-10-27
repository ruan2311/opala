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
- Nazuna 10.3.1 enviada ao servidor. Comando de início: `sh iniciar.sh` (põe `/home/container/bin` no PATH e roda `node dados/src/.scripts/start.js`).
- O servidor não tem ffmpeg: usamos o ffmpeg/ffprobe portátil (johnvansickle.com, amd64) em `bin/`, enviado com autorização do usuário.
- O "stop" do painel trava em "stopping"; para reiniciar, mande `kill` e depois `start` pela API.
- Bot **no ar** desde 27/10/2026: nome "A+ 3.0", prefixo `!`, dono Ruan ((numero do dono)), número do bot (numero do bot) (secundário, pareado por código). Sessão em `dados/database/qr-code` no servidor; ao reiniciar, conecta sozinho. Uso de memória: ~125 MB de 400.
- Vex API: chave gravada em `config.json` no servidor (cópia em `~/.config/opala/waifly.env`).
- Visual: banner pixel art e design do menu ficam em `arte/` (o banner vai para `dados/midias/menu.jpg`; o original da Nazuna ficou como `menu-nazuna-original.jpg`).
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
