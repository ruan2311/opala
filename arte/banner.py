# Banner pixel art do bot A+ 3.0: duas garotas chibi e um "A+" no centro.
# Desenha em 192x128 e amplia 8x (1536x1024, mesmo tamanho do banner original).
import random
import sys
from PIL import Image, ImageDraw

W, H, SCALE = 192, 128, 8
random.seed(7)
OUT = sys.argv[1] if len(sys.argv) > 1 else 'menu.jpg'

INK = (58, 36, 86)


def layer():
    return Image.new('RGBA', (W, H), (0, 0, 0, 0))


def shade(c, f):
    return tuple(max(0, min(255, int(v * f))) for v in c[:3])


def outline_inside(img, color):
    """Pinta de `color` os pixels da borda da própria forma."""
    px = img.load()
    edge = []
    for y in range(H):
        for x in range(W):
            if px[x, y][3] == 0:
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if not (0 <= nx < W and 0 <= ny < H) or px[nx, ny][3] == 0:
                    edge.append((x, y))
                    break
    for p in edge:
        px[p] = color + (255,)
    return img


def outline_outside(img, color):
    """Contorno de 1px por fora da forma."""
    px = img.load()
    add = []
    for y in range(H):
        for x in range(W):
            if px[x, y][3]:
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < W and 0 <= ny < H and px[nx, ny][3]:
                    add.append((x, y))
                    break
    for p in add:
        px[p] = color + (255,)
    return img


def stamp(img, grid, x0, y0, pal, flip=False):
    px = img.load()
    for j, row in enumerate(grid):
        if flip:
            row = row[::-1]
        for i, ch in enumerate(row):
            if ch in pal and 0 <= x0 + i < W and 0 <= y0 + j < H:
                px[x0 + i, y0 + j] = pal[ch] + (255,)


# ---------------------------------------------------------------- fundo
def background():
    bg = Image.new('RGB', (W, H))
    px = bg.load()
    top, bot = (122, 108, 214), (255, 196, 226)
    bands = 9
    for y in range(H):
        t = y / (H - 1) * (bands - 1)
        b = int(t)
        frac = t - b
        for x in range(W):
            # Dither xadrez na transição entre faixas
            bb = b + 1 if (frac > 0.5 and (x + y) % 2 == 0) or frac > 0.85 else b
            k = min(bb, bands - 1) / (bands - 1)
            px[x, y] = tuple(int(top[i] + (bot[i] - top[i]) * k) for i in range(3))
    d = ImageDraw.Draw(bg)

    # Brilho atrás do logo
    for r, c in ((40, (190, 170, 240)), (31, (220, 190, 245)), (22, (245, 214, 248))):
        for y in range(H):
            for x in range(W):
                dist = ((x - 96) ** 2 + ((y - 50) * 1.15) ** 2) ** 0.5
                if dist < r and ((x + y) % 2 == 0 or dist < r - 3):
                    px[x, y] = c

    # Estrelinhas
    for _ in range(46):
        x, y = random.randrange(4, W - 4), random.randrange(4, 92)
        if abs(x - 96) < 34 and 14 < y < 86:
            continue
        c = random.choice([(255, 255, 255), (255, 240, 170), (255, 220, 240)])
        px[x, y] = c
        if random.random() < 0.35:
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                px[x + dx, y + dy] = shade(c, 0.9)

    # Lua
    sky = bg.copy()
    d.ellipse([10, 8, 24, 22], fill=(255, 246, 200))
    cut = Image.new('1', (W, H))
    ImageDraw.Draw(cut).ellipse([15, 6, 29, 20], fill=1)
    bg.paste(sky, (0, 0), cut)
    return bg


def clouds(img):
    cl = layer()
    d = ImageDraw.Draw(cl)
    x = -6
    while x < W + 6:
        r = random.randint(7, 12)
        d.ellipse([x - r, 104 - r // 2, x + r, 104 + r + 4], fill=(255, 250, 255))
        x += r + random.randint(2, 6)
    d.rectangle([0, 108, W, H], fill=(255, 250, 255))
    px = cl.load()
    # Sombra lilás na parte de baixo das nuvens
    for y in range(112, H):
        for x in range(W):
            if (y > 118) or ((x + y) % 2 == 0 and y > 114):
                px[x, y] = (232, 214, 246, 255)
    outline_outside(cl, (214, 170, 226))
    img.alpha_composite(cl)


HEART = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."]
SPARK = ["..X..", "..X..", "XXXXX", "..X..", "..X.."]


def hearts(img):
    for x, y, c in ((70, 14, (255, 120, 170)), (118, 10, (255, 150, 200)), (6, 46, (255, 140, 190)),
                    (180, 36, (255, 120, 170)), (64, 88, (255, 160, 205)), (124, 90, (255, 130, 180))):
        stamp(img, HEART, x, y, {'X': c})
        img.putpixel((x + 1, y + 1), (255, 235, 245, 255))
    for x, y in ((58, 30), (132, 26), (110, 76), (78, 72), (40, 6), (160, 12), (100, 4)):
        stamp(img, SPARK, x, y, {'X': (255, 255, 255)})
        img.putpixel((x + 2, y + 2), (255, 240, 170, 255))


# --------------------------------------------------------------- logo A+
def logo(img):
    shape = layer()
    d = ImageDraw.Draw(shape)
    x0, y0, w, h = 62, 28, 40, 44
    y1 = y0 + h
    m = x0 + w // 2
    d.polygon([(x0, y1), (m - 4, y0), (m + 4, y0), (x0 + w, y1), (x0 + w - 11, y1),
               (x0 + w - 14, y1 - 10), (x0 + 14, y1 - 10), (x0 + 11, y1)], fill=(255, 255, 255))
    d.polygon([(m - 1, y0 + 12), (m + 1, y0 + 12), (m + 6, y1 - 19), (m - 6, y1 - 19)], fill=(0, 0, 0, 0))
    px0, pc = 105, y0 + 22
    d.rectangle([px0, pc - 4, px0 + 21, pc + 4], fill=(255, 255, 255))
    d.rectangle([px0 + 7, pc - 11, px0 + 14, pc + 11], fill=(255, 255, 255))

    # Gradiente em faixas: branco -> rosa -> lilás
    px = shape.load()
    ramp = [(255, 255, 255), (255, 236, 246), (255, 206, 230), (255, 176, 214), (238, 156, 222), (206, 146, 236)]
    for y in range(H):
        k = (y - y0) / h
        c = ramp[max(0, min(len(ramp) - 1, int(k * len(ramp))))]
        for x in range(W):
            if px[x, y][3]:
                px[x, y] = c + (255,)

    # Brilho na quina superior esquerda de cada forma
    for y in range(H):
        for x in range(W):
            if px[x, y][3] and x > 0 and y > 0 and not px[x - 1, y][3] and px[x + 1, y][3] and y < y0 + 26:
                px[x + 1, y] = (255, 255, 255, 255)

    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    spx = shadow.load()
    for y in range(H - 3):
        for x in range(W - 3):
            if px[x, y][3]:
                spx[x + 3, y + 3] = (120, 72, 160, 255)
    outline_outside(shape, INK)
    outline_outside(shape, (255, 255, 255))
    img.alpha_composite(shadow)
    img.alpha_composite(shape)


# ------------------------------------------------------------- garotas
EYE = [
    "KKKKKK",
    "IWWIII",
    "IWWDDI",
    "IIDDDI",
    "IDDDDI",
    "ILDDLI",
    "ILLLLI",
    ".IIII.",
]


def girl(img, cx, top, hair, eye, dress, style, mood='normal'):
    hd, hl = shade(hair, 0.72), tuple(min(255, v + 45) for v in hair)
    skin, skin_d = (255, 228, 214), (240, 186, 176)
    sprite = layer()

    def part(draw_fn, fill, edge):
        p = layer()
        draw_fn(ImageDraw.Draw(p), fill)
        outline_inside(p, edge)
        sprite.alpha_composite(p)

    # Cabelo de trás
    if style == 'long':
        def back(d, f):
            d.rounded_rectangle([cx - 21, top - 1, cx + 21, top + 46], 12, fill=f)
            for i in range(-21, 21, 6):
                d.polygon([(cx + i, top + 45), (cx + i + 6, top + 45), (cx + i + 3, top + 50)], fill=f)
        part(back, hair, hd)
    else:
        def back(d, f):
            d.ellipse([cx - 19, top - 1, cx + 19, top + 33], fill=f)
            for s in (-1, 1):
                ex = cx + s * 24
                d.ellipse([ex - 6, top + 6, ex + 6, top + 48], fill=f)
                d.polygon([(ex - 5, top + 40), (ex + 5, top + 40), (ex + s * 3, top + 56)], fill=f)
        part(back, hair, hd)
        for s in (-1, 1):  # Prendedores das maria-chiquinhas
            ex = cx + s * 19
            part(lambda d, f, ex=ex: d.rectangle([ex - 2, top + 8, ex + 2, top + 11], fill=f), (255, 236, 130), (226, 180, 70))

    # Corpo (por baixo da cabeça)
    part(lambda d, f: d.rectangle([cx - 6, top + 54, cx - 2, top + 60], fill=f), skin, skin_d)
    part(lambda d, f: d.rectangle([cx + 2, top + 54, cx + 6, top + 60], fill=f), skin, skin_d)
    part(lambda d, f: (d.rectangle([cx - 6, top + 56, cx - 2, top + 60], fill=f),
                       d.rectangle([cx + 2, top + 56, cx + 6, top + 60], fill=f)), (255, 255, 255), (214, 200, 230))
    part(lambda d, f: (d.rectangle([cx - 8, top + 61, cx - 1, top + 63], fill=f),
                       d.rectangle([cx + 1, top + 61, cx + 8, top + 63], fill=f)), (150, 80, 110), (100, 50, 80))
    part(lambda d, f: d.polygon([(cx - 9, top + 32), (cx + 9, top + 32), (cx + 16, top + 55), (cx - 16, top + 55)], fill=f),
         dress, shade(dress, 0.7))
    part(lambda d, f: d.rectangle([cx - 15, top + 52, cx + 15, top + 53], fill=f), (255, 255, 255), (220, 210, 236))
    for s in (-1, 1):
        part(lambda d, f, s=s: d.ellipse([min(cx + s * 9, cx + s * 16), top + 33, max(cx + s * 9, cx + s * 16), top + 46], fill=f),
             dress, shade(dress, 0.7))
        part(lambda d, f, s=s: d.ellipse([min(cx + s * 11, cx + s * 15), top + 45, max(cx + s * 11, cx + s * 15), top + 49], fill=f), skin, skin_d)
    part(lambda d, f: d.polygon([(cx - 10, top + 32), (cx + 10, top + 32), (cx, top + 41)], fill=f), (255, 255, 255), (214, 200, 230))
    bow = ["RR.RR", "RRKRR", "RR.RR", ".R.R."]
    stamp(sprite, bow, cx - 2, top + 36, {'R': (255, 96, 140), 'K': (200, 50, 100)})

    # Cabeça
    part(lambda d, f: d.ellipse([cx - 18, top, cx + 18, top + 32], fill=f), skin, skin_d)
    face = sprite.load()
    for x in range(cx - 15, cx + 16):  # Sombra da franja
        for y in (top + 13, top + 14):
            if face[x, y][3]:
                face[x, y] = skin_d + (255,)

    # Franja e mechas laterais
    def bangs(d, f):
        d.ellipse([cx - 20, top - 3, cx + 20, top + 28], fill=f)
        d.rectangle([cx - 21, top + 13, cx + 21, top + 40], fill=(0, 0, 0, 0))
        for i in range(-16, 16, 5):
            d.polygon([(cx + i, top + 12), (cx + i + 5, top + 12), (cx + i + 2, top + 17)], fill=f)
        for s in (-1, 1):
            d.polygon([(cx + s * 20, top + 8), (cx + s * 14, top + 10), (cx + s * 15, top + 28), (cx + s * 18, top + 33),
                       (cx + s * 21, top + 26)], fill=f)
    part(bangs, hair, hd)
    hp = sprite.load()
    for x in range(cx - 13, cx + 14):  # Reflexo do cabelo
        y = top + 5 + (abs(x - cx) // 6)
        if (x // 3) % 2 == 0 and hp[x, y][3]:
            hp[x, y] = hl + (255,)

    # Olhos, bochechas e boca
    pal = {'K': INK, 'W': (255, 255, 255), 'I': eye, 'D': shade(eye, 0.55), 'L': tuple(min(255, v + 70) for v in eye)}
    for s in (-1, 1):
        ex = cx - 11 if s < 0 else cx + 6
        stamp(sprite, EYE, ex, top + 16, pal)
        sprite.putpixel((ex - 1 if s < 0 else ex + 6, top + 15), INK + (255,))
        sprite.putpixel((ex - 1 if s < 0 else ex + 6, top + 16), INK + (255,))
        bx = cx - 15 if s < 0 else cx + 11
        for i in range(4):
            sprite.putpixel((bx + i, top + 25), (255, 160, 180, 255))
    if mood == 'triste':
        # Sobrancelhas caídas, lágrimas e boquinha triste
        for s_ in (-1, 1):
            for i in range(4):
                sprite.putpixel((cx + s_ * (7 + i), top + 14 - (3 - i) // 2), INK + (255,))
            tx = cx - 11 if s_ < 0 else cx + 11
            for i in range(3):
                sprite.putpixel((tx, top + 24 + i), (150, 210, 255, 255))
        for dx, dy in ((-2, 1), (-1, 0), (0, 0), (1, 0), (2, 1)):
            sprite.putpixel((cx + dx, top + 26 + dy), (170, 60, 90, 255))
    elif mood == 'aura':
        # Estrelas nos olhos e sorrisão aberto
        for ex in (cx - 11, cx + 6):
            stamp(sprite, ["..W..", ".WWW.", "..W.."], ex + 1, top + 18, {'W': (255, 246, 170)})
        for dx in range(-3, 4):
            sprite.putpixel((cx + dx, top + 25), (150, 40, 70, 255))
        for dx in range(-2, 3):
            sprite.putpixel((cx + dx, top + 26), (255, 120, 150, 255))
        sprite.putpixel((cx - 1, top + 27), (150, 40, 70, 255))
        sprite.putpixel((cx, top + 27), (150, 40, 70, 255))
        sprite.putpixel((cx + 1, top + 27), (150, 40, 70, 255))
    else:
        for dx, dy in ((-2, 0), (-1, 1), (0, 0), (1, 1), (2, 0)):
            sprite.putpixel((cx + dx, top + 26 + dy), (170, 60, 90, 255))

    # Acessórios
    if style == 'long':  # Orelhinhas de gato
        for s in (-1, 1):
            part(lambda d, f, s=s: d.polygon([(cx + s * 8, top + 2), (cx + s * 18, top + 5), (cx + s * 16, top - 9)], fill=f), hair, hd)
            part(lambda d, f, s=s: d.polygon([(cx + s * 11, top + 2), (cx + s * 16, top + 3), (cx + s * 15, top - 4)], fill=f),
                 (255, 190, 210), (240, 150, 180))
    else:  # Laço e anteninha
        big_bow = ["MMM.....MMM", "MMMM...MMMM", "MMMMMKMMMMM", "MMMM...MMMM", "MMM.....MMM"]
        stamp(sprite, big_bow, cx + 6, top - 4, {'M': (140, 226, 206), 'K': (70, 170, 150)})
        for i, (dx, dy) in enumerate(((0, 0), (0, -1), (1, -2), (2, -3), (3, -3), (4, -2))):
            sprite.putpixel((cx - 4 + dx, top - 3 + dy), hair + (255,))

    outline_outside(sprite, INK)
    img.alpha_composite(sprite)
    return sprite


def frame(img):
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W - 1, H - 1], outline=INK + (255,))
    d.rectangle([1, 1, W - 2, H - 2], outline=(255, 255, 255, 255))
    for x, y in ((3, 3), (W - 6, 3), (3, H - 6), (W - 6, H - 6)):
        stamp(img, ["..X..", ".XXX.", "XXXXX", ".XXX.", "..X.."], x - 1, y - 1, {'X': (255, 214, 120)})


if __name__ == '__main__':
    canvas = background().convert('RGBA')
    hearts(canvas)
    clouds(canvas)
    logo(canvas)
    girl(canvas, 34, 46, (196, 168, 240), (80, 196, 214), (118, 108, 210), 'long')
    girl(canvas, 157, 46, (255, 150, 194), (164, 104, 230), (126, 206, 236), 'twin')
    frame(canvas)

    canvas.convert('RGB').resize((W * SCALE, H * SCALE), Image.NEAREST).save(OUT, quality=95, subsampling=0)
    print('ok', OUT)
