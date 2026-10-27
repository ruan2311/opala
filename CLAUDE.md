# Opala

Bot de WhatsApp do Ruan. Os projetos dele têm nomes de pedras e gemas (Onix = launcher de TV, Amethyst, Opala = este bot).

## Ideia
- Base: a Nazuna Bot (https://github.com/DevTokyoVx/nazuna), em Node.js com a biblioteca Baileys. É gratuita e de código aberto. Os comandos de download (play, TikTok, Instagram) dependem da Vex API, que é paga.
- Objetivo: rodar 24h sozinho em uma máquina na nuvem. Opção preferida: Oracle Cloud "Always Free". Se não der, Google Cloud e2-micro ou uma hospedagem paga de bot.
- O usuário não sabe configurar servidor: guie passo a passo, com prints, e faça o máximo possível por SSH.
- Nada foi instalado ainda (pasta criada em 27/10/2026).

## Cuidados
- Usar um número **secundário** no bot, nunca o principal (risco de banimento).
- A pasta de sessão do WhatsApp dá acesso total ao número: nunca subir para o GitHub (já está no `.gitignore`) e manter o servidor com acesso por chave ou senha forte.

## Como trabalhar com o usuário
- Tudo que o usuário vê vai em **português do Brasil**, inclusive as notas curtas entre ferramentas.
- Explique em linguagem simples, sem jargão.
- Confira antes de afirmar (servidor, arquivos, documentação); nunca chute.
- Prints para o usuário vão em `/sdcard/Download/Imagens para o claude`.
- O projeto pode ser editado no celular (Termux) e no PC. Ao abrir a sessão, um hook roda `git pull --ff-only`; se falhar, avise antes de mexer em arquivos. Depois que existir um repositório no GitHub, rode `git push` ao terminar tarefas que geraram commits.
