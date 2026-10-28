# Imagens do comando !aura: beta (<30%), aura boa (30-79%) e aura máxima (80%+).
# Reaproveita as garotas do banner. Desenha em 128x128 e amplia 8x (1024x1024).
# Uso: python3 aura.py <pasta de saída>
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw

import banner as b

b.W = b.H = W = H = 128
SCALE = 8
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else '.')

LILAS = dict(hair=(196, 168, 240), eye=(80, 196, 214), dress=(118, 108, 210), style='long')
ROSA = dict(hair=(255, 150, 194), eye=(164, 104, 230), dress=(126, 206, 236), style='twin')

FONTE = {
    'A': [".XXX.", "X...X", "XXXXX", "X...X", "X...X"],
    'U': ["X...X", "X...X", "X...X", "X...X", ".XXX."],
    'R': ["XXXX.", "X...X", "XXXX.", "X..X.", "X...X"],
    'M': ["X...X", "XX.XX", "X.X.X", "X...X", "X...X"],
    'X': ["X...X", ".X.X.", "..X..", ".X.X.", "X...X"],
    'B': ["XXXX.", "X...X", "XXXX.", "X...X", "XXXX."],
    'E': ["XXXXX", "X....", "XXXX.", "X....", "XXXXX"],
    'T': ["XXXXX", "..X..", "..X..", "..X..", "..X.."],
    '!': ["X", "X", "X", ".", "X"],
    ' ': ["..", "..", "..", "..", ".."],
}


def texto(img, msg, y, cor, borda=b.INK, escala=2):
    """Escreve `msg` centralizado com a fonte pixelada e contorno."""
    largura = sum(len(FONTE[c][0]) + 1 for c in msg) - 1
    camada = b.layer()
    x = (W - largura * escala) // 2
    for c in msg:
        g = FONTE[c]
        for j, linha in enumerate(g):
            for i, ch in enumerate(linha):
                if ch == 'X':
                    for dy in range(escala):
                        for dx in range(escala):
                            camada.putpixel((x + i * escala + dx, y + j * escala + dy), cor + (255,))
        x += (len(g[0]) + 1) * escala
    b.outline_outside(camada, borda)
    img.alpha_composite(camada)


def brilho(img, sprite, cores):
    """Aura em volta da garota: anéis de cor, do mais perto para o mais longe."""
    mask = Image.new('L', (W, H))
    mask.paste(sprite.getchannel('A'))
    atual = {(x, y) for y in range(H) for x in range(W) if mask.getpixel((x, y))}
    aura = b.layer()
    px = aura.load()
    for n, cor in enumerate(cores):
        anel = set()
        for x, y in atual:
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)):
                p = (x + dx, y + dy)
                if p not in atual and 0 <= p[0] < W and 0 <= p[1] < H:
                    anel.add(p)
        for x, y in anel:
            # Anéis de fora com xadrez, para parecer que a aura "vibra"
            if n < len(cores) - 2 or (x + y) % 2 == 0:
                px[x, y] = cor + (255,)
        atual |= anel
    img.alpha_composite(aura)


def ceu(topo, base):
    bg = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        k = min(7, int(y / H * 8)) / 7
        d.line([(0, y), (W, y)], fill=tuple(int(topo[i] + (base[i] - topo[i]) * k) for i in range(3)) + (255,))
    return bg


def chao(img, cor, sombra):
    d = ImageDraw.Draw(img)
    d.rectangle([0, 112, W, H], fill=cor + (255,))
    for x in range(0, W, 2):
        d.point((x, 112), fill=sombra + (255,))


def garota(dados, mood, top=44):
    camada = b.layer()
    b.girl(camada, 64, top, dados['hair'], dados['eye'], dados['dress'], dados['style'], mood)
    return camada


def salvar(img, nome):
    img.convert('RGB').resize((W * SCALE, H * SCALE), Image.NEAREST).save(OUT / nome, quality=95, subsampling=0)
    print('ok', OUT / nome)


def beta():
    random.seed(1)
    img = ceu((70, 76, 104), (120, 128, 156))
    d = ImageDraw.Draw(img)
    # Nuvem de chuva
    for x, r in ((24, 10), (38, 13), (54, 11), (70, 12), (86, 13), (102, 10)):
        d.ellipse([x - r, 4 - r // 2, x + r, 16 + r // 2], fill=(150, 156, 178))
    for _ in range(70):
        x, y = random.randrange(W), random.randrange(24, 110)
        d.line([(x, y), (x - 1, y + 3)], fill=(170, 190, 230))
    chao(img, (96, 102, 124), (80, 86, 108))
    # Poça
    d.ellipse([34, 109, 94, 117], fill=(120, 140, 180))
    cinza = dict(LILAS, hair=(150, 146, 168), dress=(104, 104, 130), eye=(120, 140, 160))
    s = garota(cinza, 'triste')
    img.alpha_composite(s)
    # Florzinha murcha
    b.stamp(img, ["..RR.", ".RRRR", "..RR.", "...G.", "..G..", "..G..", ".GG.."], 100, 100,
            {'R': (150, 90, 110), 'G': (110, 130, 100)})
    texto(img, 'BETA', 30, (200, 205, 220), escala=2)
    b.frame(img)
    salvar(img, 'aura-beta.jpg')


def media():
    random.seed(2)
    img = ceu((150, 140, 230), (255, 200, 228))
    hp = img.load()
    for _ in range(30):
        x, y = random.randrange(4, W - 4), random.randrange(4, 100)
        hp[x, y] = (255, 255, 255, 255)
    for x, y in ((14, 30), (106, 40), (20, 80), (104, 88)):
        b.stamp(img, b.SPARK, x, y, {'X': (255, 255, 255)})
    chao(img, (255, 244, 252), (236, 214, 246))
    s = garota(ROSA, 'normal')
    brilho(img, s, [(255, 255, 255), (255, 214, 240), (240, 190, 250)])
    img.alpha_composite(s)
    texto(img, 'AURA', 8, (255, 255, 255), escala=2)
    b.frame(img)
    salvar(img, 'aura-boa.jpg')


def maxima():
    random.seed(3)
    img = Image.new('RGBA', (W, H), (34, 16, 58, 255))
    d = ImageDraw.Draw(img)
    # Raios de festa saindo do centro
    cores = [(90, 30, 130), (60, 22, 96)]
    for i in range(24):
        a1, a2 = i * 2 * math.pi / 24, (i + 1) * 2 * math.pi / 24
        d.polygon([(64, 70), (64 + 200 * math.cos(a1), 70 + 200 * math.sin(a1)),
                   (64 + 200 * math.cos(a2), 70 + 200 * math.sin(a2))], fill=cores[i % 2] + (255,))
    # Confete
    for _ in range(90):
        x, y = random.randrange(W), random.randrange(H)
        c = random.choice([(255, 220, 90), (255, 120, 200), (120, 230, 255), (180, 255, 150), (255, 255, 255)])
        d.rectangle([x, y, x + random.choice([0, 1]), y], fill=c + (255,))
    # Globo de espelhos
    d.line([(64, 0), (64, 4)], fill=(200, 200, 220))
    d.ellipse([58, 4, 70, 16], fill=(210, 210, 235))
    for y in range(5, 16, 3):
        for x in range(59, 70, 3):
            d.point((x, y), fill=(255, 255, 255))
    chao(img, (70, 30, 110), (110, 50, 160))
    s = garota(LILAS, 'aura')
    brilho(img, s, [(255, 250, 200), (255, 220, 90), (255, 160, 60), (230, 90, 200), (150, 70, 240)])
    img.alpha_composite(s)
    for x, y in ((10, 40), (108, 30), (16, 92), (104, 86), (30, 22), (96, 60)):
        b.stamp(img, b.SPARK, x, y, {'X': (255, 246, 170)})
    texto(img, 'AURA MAX!', 20, (255, 230, 110), escala=2)
    b.frame(img)
    salvar(img, 'aura-max.jpg')


beta()
media()
maxima()
