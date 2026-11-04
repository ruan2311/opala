<div align="center">

# 💎 Opala

**Bot de WhatsApp fofo, completo e leve, do [Project Gems](https://projectgems.github.io).**

Figurinhas · músicas e downloads · jogos e brincadeiras · RPG · proteção de grupo · IA

</div>

---

## 📑 Índice

1. [O que o Opala faz](#-o-que-o-opala-faz)
2. [Antes de começar](#-antes-de-começar)
3. [Onde instalar? Escolha o seu caminho](#-onde-instalar-escolha-o-seu-caminho)
   - [📱 Termux (celular Android)](#-termux-celular-android)
   - [🐧 Linux (PC ou VPS)](#-linux-pc-ou-vps)
   - [🪟 Windows](#-windows)
   - [🦖 Pterodactyl (Waifly e outras hospedagens com painel)](#-pterodactyl-waifly-e-outras-hospedagens-com-painel)
   - [☁️ Outras hospedagens](#️-outras-hospedagens)
4. [Conectar o número (QR code ou código)](#-conectar-o-número-qr-code-ou-código)
5. [Configuração](#️-configuração)
6. [Primeiros comandos](#-primeiros-comandos)
7. [Deixar ligado 24 horas](#-deixar-ligado-24-horas)
8. [Atualizar o bot](#-atualizar-o-bot)
9. [Problemas comuns](#-problemas-comuns)
10. [Segurança](#-segurança)

---

## ✨ O que o Opala faz

| Categoria | Exemplos |
|---|---|
| 🎵 Músicas e downloads | `!play`, `!playvid`, `!tiktok`, `!spotify`, `!soundcloud`, `!letra` |
| ✨ Figurinhas | `!sticker`, `!ttp`, `!attp`, `!brat`, `!emojimix`, `!toimg` |
| 🎧 Efeitos | voz grave, eco, acelerar, cortar áudio e vídeo, tirar fundo de imagem |
| 🎮 Brincadeiras | jogo da velha, UNO, forca, quiz, wordle, casal do dia, testes de % |
| ⚔️ RPG | carteira, banco, empregos, pesca, mineração, pets, clãs, cassino |
| 🛡️ Admins | antilink, boas-vindas, advertências, moderadores, horários do grupo |
| 🧰 Ferramentas | clima, lembretes, notas, tradutor, calculadora, QR code |

Tudo aparece organizado no `!menu`, com uma frase explicando cada comando.

---

## 🧾 Antes de começar

Você vai precisar de:

| O quê | Por quê |
|---|---|
| 📱 **Um número de WhatsApp secundário** | O bot usa o número como se fosse uma pessoa. **Nunca use o seu número principal**: o WhatsApp pode banir números que agem como robô. |
| 🟢 **Node.js 20 ou mais novo** | É o programa que roda o bot. |
| 🎬 **FFmpeg** | Faz figurinhas animadas, efeitos de áudio e vídeo. |
| ▶️ **yt-dlp** | Baixa músicas e vídeos do YouTube (`!play`, `!playvid`). O bot procura na pasta `bin/` ou no sistema. |
| 🤖 **Chave grátis da NVIDIA** *(opcional)* | Para a IA e o `!assistente`. Crie em [build.nvidia.com](https://build.nvidia.com) → foto de perfil → *API Keys* → *Generate API Key*. |
| 🎧 **Chave grátis da Groq** *(opcional)* | Só para transformar áudio em texto. Crie em [console.groq.com](https://console.groq.com) → *API Keys*. |

> 💡 **Quanto o bot consome:** cerca de 100 a 150 MB de memória parado e até uns 300 MB em uso pesado. Um plano de 400 MB já dá conta.

---

## 🧭 Onde instalar? Escolha o seu caminho

| Onde | Bom para | Fica ligado 24h? |
|---|---|---|
| [📱 Termux](#-termux-celular-android) | Testar ou usar com o celular sempre na tomada | Só com o celular ligado e o Termux aberto |
| [🐧 Linux](#-linux-pc-ou-vps) | PC antigo, Raspberry Pi ou VPS | ✅ Sim |
| [🪟 Windows](#-windows) | Testar no seu PC | Só com o PC ligado |
| [🦖 Pterodactyl](#-pterodactyl-waifly-e-outras-hospedagens-com-painel) | Hospedagens de bot gratuitas ou baratas | ✅ Sim |

Em todos os caminhos, o fim é igual: você roda o bot, ele pergunta algumas coisas (nome, dono, prefixo) e depois você [conecta o número](#-conectar-o-número-qr-code-ou-código).

---

### 📱 Termux (celular Android)

1. Instale o **Termux** pelo [F-Droid](https://f-droid.org/packages/com.termux/) ou pelo [GitHub](https://github.com/termux/termux-app/releases).
   ⚠️ A versão da Play Store é antiga e não funciona direito.
2. Abra o Termux e cole, um de cada vez:

   ```bash
   pkg update -y && pkg upgrade -y
   pkg install -y nodejs-lts git ffmpeg python
   pip install -U yt-dlp
   ```

3. Baixe o Opala e entre na pasta:

   ```bash
   git clone https://github.com/ruan2311/opala.git
   cd opala/bot
   ```

4. Ligue o bot:

   ```bash
   npm start
   ```

   Na primeira vez, ele instala o que falta, faz algumas perguntas ([veja quais](#️-configuração)) e mostra as opções para [conectar o número](#-conectar-o-número-qr-code-ou-código).

5. Para o Android não fechar o Termux em segundo plano:

   ```bash
   termux-wake-lock
   ```

   Também vale tirar o Termux da economia de bateria em *Configurações → Apps → Termux → Bateria → Sem restrições*.

**Para ligar de novo depois:** abra o Termux e rode `cd opala/bot && npm start`.

---

### 🐧 Linux (PC ou VPS)

Os comandos abaixo são para **Ubuntu e Debian**. Em outras distribuições, troque o `apt` pelo instalador da sua (`dnf`, `pacman`...).

1. Instale o Node.js 22, o Git, o FFmpeg e o yt-dlp:

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt install -y nodejs git ffmpeg
   sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux -o /usr/local/bin/yt-dlp
   sudo chmod a+rx /usr/local/bin/yt-dlp
   ```

   No Raspberry Pi (ARM), troque `yt-dlp_linux` por `yt-dlp_linux_aarch64`.

2. Baixe o Opala:

   ```bash
   git clone https://github.com/ruan2311/opala.git
   cd opala/bot
   ```

3. Ligue o bot pela primeira vez (é aqui que você configura e conecta o número):

   ```bash
   npm start
   ```

4. Depois que conectar e responder no WhatsApp, aperte `Ctrl + C` e [deixe ele ligado 24 horas](#-deixar-ligado-24-horas).

---

### 🪟 Windows

1. Instale estes programas (pode aceitar tudo no padrão):
   - **Node.js LTS** → [nodejs.org](https://nodejs.org)
   - **Git** → [git-scm.com](https://git-scm.com/download/win)
   - **FFmpeg** e **yt-dlp** → abra o **PowerShell** e rode:

     ```powershell
     winget install --id Gyan.FFmpeg -e
     winget install --id yt-dlp.yt-dlp -e
     ```

2. Feche e abra o PowerShell de novo (para ele achar os programas novos).
3. Baixe o Opala:

   ```powershell
   git clone https://github.com/ruan2311/opala.git
   cd opala\bot
   ```

   Sem Git? Na página do GitHub, clique em **Code → Download ZIP**, extraia e abra a pasta `bot` no PowerShell (*Shift + clique direito na pasta → Abrir no Terminal*).

4. Ligue o bot:

   ```powershell
   npm start
   ```

> ⚠️ No Windows use sempre `npm start`. O arquivo `iniciar.sh` é para Linux, Termux e painéis.

---

### 🦖 Pterodactyl (Waifly e outras hospedagens com painel)

Painéis Pterodactyl são aquela tela com **Console**, **Files** (arquivos) e **Startup** (inicialização). Exemplos: Waifly, Bot-Hosting e muitas hospedagens de bot.

**1. Crie o servidor**
- Escolha o tipo (*egg*) **Node.js** ou **NodeJS Generic**, versão **20 ou mais nova**.
- 400 MB de memória já bastam.

**2. Envie os arquivos**
- No seu PC, baixe o Opala (**Code → Download ZIP** no GitHub) e extraia.
- Entre na pasta `bot` e compacte **o que está dentro dela** num `.zip`.
- No painel, vá em **Files → Upload**, envie o `.zip`, clique nos três pontinhos dele e escolha **Unarchive** (descompactar).
- Ao final, os arquivos `package.json` e `iniciar.sh` devem estar na **pasta principal** do servidor, e não dentro de outra pasta.

**3. FFmpeg e yt-dlp (a maioria dos painéis não tem)**
- No painel, crie uma pasta chamada **`bin`** (em **Files → New Folder**).
- **FFmpeg:** no seu PC, baixe a versão para Linux em [johnvansickle.com/ffmpeg](https://johnvansickle.com/ffmpeg/) → *release* → **amd64** (ou **arm64**, se o painel disser que a máquina é ARM). Extraia e envie só `ffmpeg` e `ffprobe` para a pasta `bin`.
- **yt-dlp:** baixe o [`yt-dlp_linux`](https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux) (ou o `yt-dlp_linux_aarch64`, se a máquina for ARM), renomeie para **`yt-dlp`**, sem extensão, e envie para a pasta `bin`.
- O bot encontra essa pasta sozinho.

**4. Comando de início**
- Na aba **Startup**, procure o campo do comando de início (pode se chamar *Startup Command*, *SECOND_CMD*, *CMD*...):
  - Se der para escrever o comando, use: **`sh iniciar.sh`**
  - Se o painel só pedir o **arquivo principal** (*Main File*, *JS File*), use: **`dados/src/.scripts/start.js`**
- Se houver um campo que roda `npm install` antes de ligar, deixe-o assim na primeira vez (ele instala as dependências).

**5. Ligue e configure**
- Clique em **Start** e abra o **Console**.
- As perguntas aparecem ali, e você responde na caixa de texto embaixo do console.
- Escolha a opção **2 (código de pareamento)**, porque o QR code costuma sair torto no console do painel. Depois siga o [passo a passo da conexão](#-conectar-o-número-qr-code-ou-código).

**6. Deixe mais leve (opcional)**
Depois que tudo funcionar, troque o comando que roda `npm install` a cada início por `echo ok`. Assim o bot liga mais rápido e gasta menos. Se um dia precisar instalar algo novo, volte o comando antigo, ligue uma vez e troque de novo.

> 💡 **Plano grátis da Waifly:** servidor desligado por 3 dias é suspenso. Deixe o bot sempre ligado.

---

### ☁️ Outras hospedagens

Qualquer lugar serve, desde que tenha:

- ✅ **Node.js 20+**
- ✅ **FFmpeg** e **yt-dlp** (instalados ou na pasta `bin/`)
- ✅ **Disco que não se apaga**: a pasta `dados/database/` guarda a sessão do WhatsApp. Se ela sumir a cada reinício, você vai ter que conectar o número de novo toda vez.
- ✅ **Processo ligado o tempo todo**: planos que "dormem" quando ninguém acessa um site não servem para bot.
- ✅ **Comando de início:** `sh iniciar.sh` (ou `npm start`)

| Tipo | Como fazer |
|---|---|
| **VPS** (Oracle Cloud, Google Cloud, Contabo, Hostinger...) | Siga o [guia do Linux](#-linux-pc-ou-vps). |
| **Hospedagens de bot com painel próprio** (Discloud, Square Cloud...) | Envie a pasta `bot` em `.zip`. Use `sh iniciar.sh` (ou `npm start`) como comando e Node 20+ na configuração da hospedagem. |
| **Raspberry Pi** | Siga o [guia do Linux](#-linux-pc-ou-vps). Para o FFmpeg e o yt-dlp portáteis, use as versões **arm64**/**aarch64**. |

---

## 🔗 Conectar o número (QR code ou código)

Na primeira vez que liga, o bot pergunta:

```
🔧 Escolha o método de conexão:
1. 📷 Conectar via QR Code
2. 🔑 Conectar via código de pareamento
```

**Opção 1: QR code** (melhor no PC)
1. Um QR code aparece na tela.
2. No celular **do número do bot**, abra o WhatsApp → **⋮ → Aparelhos conectados → Conectar um aparelho** e aponte a câmera para o QR code.

**Opção 2: código de pareamento** (melhor no Termux e em painéis)
1. Digite o número **do bot** com código do país e DDD, só números. Exemplo: `5511999998888`.
2. O bot mostra um código de 8 letras, tipo `ABCD-1234`.
3. No celular do número do bot, abra o WhatsApp → **⋮ → Aparelhos conectados → Conectar um aparelho → Conectar com número de telefone** e digite o código.

Pronto! Quando aparecer **"Bot iniciado com sucesso"**, mande `!menu` no WhatsApp.
Nas próximas vezes, ele conecta sozinho.

---

## ⚙️ Configuração

Na primeira vez, o bot pergunta tudo isso e salva em `dados/src/config.json`. Se preferir, copie o `config.exemplo.json` para `config.json` e edite à mão.

| Campo | O que é | Exemplo |
|---|---|---|
| `nomedono` | Seu nome | `Ana` |
| `numerodono` | **Seu** número (o do dono, não o do bot), com código do país e DDD | `5511999998888` |
| `nomebot` | Nome do bot | `Opala` |
| `prefixo` | Símbolo antes dos comandos | `!` |
| `nvidia_apikey` | Chave grátis da NVIDIA, para a IA e o `!assistente` *(opcional)* | `nvapi-...` |
| `groq_apikey` | Chave grátis da Groq, só para transformar áudio em texto *(opcional)* | `gsk_...` |

### 👑 Como o bot reconhece o dono

O WhatsApp não mostra mais o telefone de quem manda mensagem: cada pessoa aparece com um código interno, o **LID**. O Opala resolve isso sozinho:

1. Você coloca o seu número em `numerodono`. Pode ser com ou sem o 9 extra, e até com `+` e espaços: o bot limpa.
2. Você manda **qualquer mensagem** para o bot, no privado ou em grupo.
3. O bot vê que o número bate, guarda o seu LID no campo `lidowner` do `config.json` e passa a te reconhecer sempre.

Para conferir, mande `!verificardono`. Ele responde se você é o dono e, se não for, mostra o número que ele viu e o número configurado. Assim fica fácil achar o erro.

> Trocou de dono? Use `!numerodono 5511999998888` (do número do dono atual). O LID antigo é apagado e o novo dono é reconhecido na primeira mensagem.

Depois de ligado, dá para mudar quase tudo pelo próprio WhatsApp, usando o número do dono:
`!nomebot`, `!prefixo`, `!fotomenu`, `!designmenu` (visual do menu), `!setpersonalidade` (jeito da IA) e outros (veja `!menudono`).

---

## 🚀 Primeiros comandos

| Comando | O que faz |
|---|---|
| `!menu` | Mostra todas as categorias |
| `!menudono` | Comandos do dono (configurar o bot) |
| `!menuadm` | Comandos dos admins do grupo |
| `!modobn` | Liga as brincadeiras no grupo |
| `!modorpg` | Liga o RPG no grupo |
| `!bemvindo` | Liga as boas-vindas |
| `!ping` | Mostra se o bot está rápido |

> O bot precisa ser **admin do grupo** para remover pessoas, apagar mensagens e mudar configurações do grupo.

---

## 🔁 Deixar ligado 24 horas

**Linux / VPS: com o PM2** (religa sozinho e liga junto com o computador)

```bash
sudo npm install -g pm2
cd ~/opala/bot
pm2 start iniciar.sh --name opala --interpreter sh
pm2 save
pm2 startup        # copie e rode o comando que ele mostrar
```

| Para... | Use |
|---|---|
| Ver o que o bot está escrevendo | `pm2 logs opala` |
| Reiniciar | `pm2 restart opala` |
| Parar | `pm2 stop opala` |

**Termux:** use `termux-wake-lock` e deixe o celular na tomada. Na primeira vez, o bot também pergunta se você quer que ele ligue sozinho ao abrir o Termux.

**Pterodactyl:** já fica ligado e religa sozinho se cair.

---

## ⬆️ Atualizar o bot

O Opala **não se atualiza sozinho**: assim nada muda sem você saber.

**Com Git (Termux, Linux, Windows):**

```bash
cd opala
git pull
cd bot && npm install
```

Depois, reinicie o bot.

**Em painel:** baixe o ZIP novo e envie só os arquivos que mudaram. **Não apague** a pasta `dados/database/` (é a sessão do WhatsApp e os dados dos grupos) nem o `dados/src/config.json`.

---

## 🩺 Problemas comuns

<details>
<summary><b>"node: command not found" ou versão antiga do Node</b></summary>

Instale o Node 20 ou mais novo (veja o guia do seu sistema). Para conferir a versão: `node -v`.
</details>

<details>
<summary><b>Figurinha animada ou efeito de áudio não funciona</b></summary>

Falta o FFmpeg. Rode `ffmpeg -version`: se der erro, instale (veja o guia do seu sistema). No painel, confira se `ffmpeg` e `ffprobe` estão dentro da pasta `bin/`.
</details>

<details>
<summary><b>O código de pareamento não aparece ou dá "inválido"</b></summary>

- Digite o número do **bot** com o código do país, sem `+`, espaços ou traços (ex.: `5511999998888`).
- O código expira em pouco tempo: digite-o no WhatsApp logo que aparecer.
- Se falhar várias vezes, apague a pasta `dados/database/qr-code` e ligue de novo.
</details>

<details>
<summary><b>O bot desconectou e pede para conectar de novo</b></summary>

O número foi desconectado pelo celular, ou a pasta `dados/database/qr-code` foi apagada. Apague essa pasta (se ainda existir) e conecte de novo.
</details>

<details>
<summary><b>"!play" não funciona</b></summary>

- Rode `yt-dlp --version`. Se der erro, falta o yt-dlp: instale (veja o guia do seu sistema). No painel, confira se o arquivo `yt-dlp` está dentro da pasta `bin/`.
- O YouTube muda sempre: mantenha o yt-dlp atualizado com `yt-dlp -U` (no painel, envie o arquivo novo por cima).
- Se aparecer *"Sign in to confirm you're not a bot"*, o YouTube bloqueou o endereço da sua hospedagem. Em casa (Termux ou PC) isso quase nunca acontece.
</details>

<details>
<summary><b>A hospedagem reclama que o bot está gastando demais</b></summary>

Use o `iniciar.sh` como comando de início: ele limita a memória do bot. No painel, troque o `npm install` do início por `echo ok` (veja o [passo 6 do Pterodactyl](#-pterodactyl-waifly-e-outras-hospedagens-com-painel)).
</details>

<details>
<summary><b>O "!assistente" não liga ou a IA não responde</b></summary>

A IA precisa de uma chave grátis da NVIDIA. Sem ela, o `!assistente` manda o passo a passo no privado do dono. Em resumo: entre em [build.nvidia.com](https://build.nvidia.com), toque na foto de perfil → *API Keys* → *Generate API Key*, copie a chave (começa com `nvapi-`) e mande `!chaveia nvapi-suachave` no **privado** do bot. Vale na hora, sem reiniciar.
</details>

<details>
<summary><b>"!totext" (áudio em texto) não funciona</b></summary>

Essa função precisa de uma chave grátis da Groq. Crie em [console.groq.com](https://console.groq.com) → *API Keys*, coloque no campo `groq_apikey` do `config.json` e reinicie o bot.
</details>

<details>
<summary><b>O bot não me reconhece como dono</b></summary>

- Mande `!verificardono` e compare o número que ele mostra com o `numerodono` do `config.json`.
- O `numerodono` é o **seu** número, não o do bot.
- Mensagens enviadas **pelo próprio número do bot** sempre contam como dono.
- Se mudou o `config.json` à mão, reinicie o bot.
</details>

<details>
<summary><b>O bot não responde no grupo</b></summary>

- Confira o prefixo: mande `!menu` (ou o prefixo que você escolheu).
- Algumas categorias precisam ser ligadas por um admin: `!modobn` (brincadeiras) e `!modorpg` (RPG).
- O modo "só admins" pode estar ligado: um admin desliga com `!soadm`.
</details>

---

## 🔒 Segurança

- **Nunca compartilhe a pasta `dados/database/`**: quem tiver a pasta `qr-code` controla o número do bot.
- **Nunca envie o `config.json` para o GitHub** (ele guarda suas chaves). Ele já está no `.gitignore`.
- **Use sempre um número secundário.**

---

<div align="center">

Feito com carinho por **Ruan Amaral** · [Project Gems](https://projectgems.github.io) 💎
Licença: veja o arquivo [LICENSE](bot/LICENSE).

</div>
