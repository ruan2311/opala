#!/bin/sh
# Inicia o Opala. Funciona no Termux, no Linux e em painéis como o Pterodactyl.
# - Primeira vez (sem sessão do WhatsApp): abre o assistente, que pede a configuração
#   e pergunta se você quer conectar por QR code ou por código de pareamento.
# - Depois disso: roda o bot direto, com a memória limitada (cabe em planos de 400 MB),
#   e religa sozinho se ele cair ou se alguém usar !reiniciar.
cd "$(dirname "$0")"
if [ -d bin ]; then   # ffmpeg portátil, se você colocou um em bin/
  chmod +x bin/* 2>/dev/null
  export PATH="$(pwd)/bin:$PATH"
fi

SESSAO=dados/database/qr-code
if [ ! -d "$SESSAO" ] || [ "$(ls -A "$SESSAO" 2>/dev/null | wc -l)" -le 2 ]; then
  exec node dados/src/.scripts/start.js
fi

while true; do
  node --max-old-space-size=200 --expose-gc dados/src/connect.js
  echo "🔄 Reiniciando o bot em 5 segundos..."
  sleep 5
done
