#!/bin/sh
# Inicia o bot com o ffmpeg portátil (pasta bin/) no PATH.
export PATH="/home/container/bin:$PATH"
exec node dados/src/.scripts/start.js
