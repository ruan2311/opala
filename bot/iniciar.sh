#!/bin/sh
# Inicia o bot com o ffmpeg portátil (pasta bin/) no PATH.
# Roda o connect.js direto, sem o start.js por cima (era um segundo Node gastando memória),
# e limita a memória do Node para caber nos 400 MB do plano. Se o bot cair ou alguém usar
# !reiniciar, o laço liga de novo.
export PATH="/home/container/bin:$PATH"
while true; do
  node --max-old-space-size=200 --expose-gc dados/src/connect.js
  echo "🔄 Reiniciando o bot em 5 segundos..."
  sleep 5
done
