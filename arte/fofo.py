# Troca as respostas padrão da Nazuna pela estética fofa do A+ 3.0.
# Uso: python3 fofo.py <pasta bot/dados/src> [--aplicar]
import re
import sys
from pathlib import Path

SRC = Path(sys.argv[1])
APLICAR = '--aplicar' in sys.argv

# ------------------------------------------------------------ menus
DESIGN = {
    'menuTopBorder': '╭─ ',
    'bottomBorder': '╰─────── ⋆｡˚ ✧ ───────',
    'menuTitleIcon': '✧',
    'menuItemIcon': ' ♡ ',
    'separatorIcon': '✦',
    'middleBorder': '│',
}
HEADER = '`╭─── ⋆｡˚ ☁︎ *${botName}* ☁︎ ˚｡⋆ ───╮\\n│ Oi, #user#! ♡\\n╰──────────────────────╯`'
HEADER_RPG = '`╭─── ⋆｡˚ ⚔︎ *Modo RPG* ⚔︎ ˚｡⋆ ───╮\\n│ Oi, #user#! ♡\\n╰──────────────────────╯`'

PEQUENAS = {'e', 'de', 'do', 'da', 'dos', 'das', 'a', 'o', 'com', 'para', 'em'}
SIGLAS = {'VIP', 'RPG', 'TXT'}


def titulo(texto):
    """'🎵 MÚSICA & ÁUDIO' -> '🎵 Música & Áudio'."""
    def palavra(m):
        p = m.group(0)
        if p in SIGLAS or not p.isupper():
            return p
        if any(ch.isdigit() for ch in p):
            return p.lower()
        low = p.lower()
        return low if low in PEQUENAS else low[0].upper() + low[1:]
    out = re.sub(r"[A-Za-zÀ-ÿ0-9\-]+", palavra, texto)
    return out


def menus():
    for f in sorted((SRC / 'menus').glob('*.js')):
        if f.name == 'index.js':
            continue
        s = orig = f.read_text(newline='')
        for k, v in DESIGN.items():
            s = re.sub(rf'(\b{k} = )"[^"\n]*"', lambda m: f'{m.group(1)}"{v}"', s)
        s = re.sub(r'(\bheader = )`[^`\n]*`', lambda m: m.group(1) + (HEADER_RPG if 'MODO RPG' in m.group(0) else HEADER), s)
        # Títulos passados como parâmetro
        s = re.sub(r'(\b\w+(?:Title) = )(["\'])([^"\'\n]+)\2', lambda m: f'{m.group(1)}{m.group(2)}{titulo(m.group(3))}{m.group(2)}', s)
        # Títulos escritos direto no texto: *TÍTULO*
        s = re.sub(r'(\$\{(?:separatorIcon|menuTitleIcon)\} \*)([^*$\n]+)(\*)', lambda m: m.group(1) + titulo(m.group(2)).strip() + m.group(3), s)
        if s != orig:
            print(f'menu: {f.name}')
            if APLICAR:
                f.write_text(s, newline='')


# -------------------------------------------------- respostas comuns
FOFO = {
    'grupo': '✿ Esse comando só funciona em grupos, tá? (๑•́ ₃ •̀๑)',
    'adm_usuario': '✿ Só os admins podem usar isso, desculpa! (｡•́︿•̀｡)',
    'adm_ou_mod': '✿ Só admins ou moderadores com permissão podem usar isso! (｡•́︿•̀｡)',
    'adm_bot': '✿ Preciso ser admin do grupo pra fazer isso! (っ˘̩╭╮˘̩)っ',
    'dono': '✿ Esse comando é só pro meu dono! ( ˘ ³˘)♡',
    'erro': '✿ Ops, deu um errinho aqui... tenta de novo daqui a pouquinho? (╥﹏╥)',
    'aguarde': '✿ Só um momentinho... ⋆｡˚ ☁︎',
    'marque': '✿ Marca alguém pra mim! (・・ ) ?',
    'rpg_grupo': '⚔︎ Esse comando só funciona em grupos com o Modo RPG ligado ♡',
    'brincadeira': '✿ O modo brincadeira não tá ligado nesse grupo! (｡•́︿•̀｡)',
    'saldo': '✿ Saldo insuficiente... (｡•́︿•̀｡)',
}

# Cada regra: (categoria, regex que o texto inteiro da resposta precisa casar)
REGRAS = [
    ('grupo', r"[⚠️❌🚫 ]*(isso|este comando|esse comando) s[oó] (pode ser usado|funciona) em grupos?[.!]?( 💔)?"),
    ('adm_ou_mod', r"comando restrito a administradores ou moderadores com permiss[aã]o\.? ?💔?"),
    ('adm_usuario', r"[🚫⛔ ]*(voc[eê] precisa ser (adm|admin|administrador)( do grupo)?|comando restrito a administradores|apenas administradores podem usar este comando|este comando [eé] apenas para administradores( do grupo)?)[.!]?( 💔)?"),
    ('adm_bot', r"eu preciso ser (adm|admin|administrador)( para isso)?[.!]?( 💔)?"),
    ('dono', r"[🚫⛔ ]*(desculpe, )?(este comando [eé] (apenas|exclusivo) (para|pro) o (meu dono|dono do bot)|este comando é exclusivo para o meu dono)[.!]?( 💔)?"),
    ('erro', r"(❌ |🐝 Ops! )?(ocorreu um erro( interno)?|ocorreu um erro (inesperado|ao processar sua solicita[cç][aã]o))\.?( (tente|por favor, tente) novamente( em alguns (minutos|instantes)| mais tarde)?(, por favor)?[.!]?)?( 💔| 🥺)?"),
    ('aguarde', r"aguarde um momentinho\.\.\. ☀️"),
    ('marque', r"marque alguém 🙄"),
    ('rpg_grupo', r"⚔️ Este comando funciona apenas em grupos com Modo RPG ativo\."),
    ('brincadeira', r"❌ O modo brincadeira não est[aá] ativo nesse grupo\.?"),
    ('saldo', r"(❌ )?Saldo insuficiente[.!]"),
]
RPG_OFF = re.compile(r"reply\(`⚔️ Modo RPG desativado! Use \$\{prefix\}modorpg para ativar\.`")
RPG_OFF_NOVO = "reply(`⚔︎ O Modo RPG tá desligado! Usa ${prefix}modorpg pra ligar ♡`"


def respostas():
    f = SRC / 'index.js'
    s = f.read_text(newline='')
    contagem = {}
    exemplos = {}
    lit = re.compile(r"reply\((\"|'|`)((?:(?!\1)[^\\\n]|\\.)*)\1")

    def troca(m):
        q, txt = m.group(1), m.group(2)
        if '${' in txt:
            return m.group(0)
        for cat, rx in REGRAS:
            if re.fullmatch(rx, txt.strip(), flags=re.I):
                contagem[cat] = contagem.get(cat, 0) + 1
                exemplos.setdefault(cat, set()).add(txt)
                novo = FOFO[cat].replace(q, '\\' + q)
                return f'reply({q}{novo}{q}'
        return m.group(0)

    s2 = lit.sub(troca, s)
    n_rpg = len(RPG_OFF.findall(s2))
    s2 = RPG_OFF.sub(lambda m: RPG_OFF_NOVO, s2)
    contagem['rpg_desligado'] = n_rpg

    # Nome do pacote das figurinhas e textos do menu
    s2 = s2.replace("packname: 'Nazuna Bot - Stickers'", "packname: 'A+ 3.0 ✿ stickers'")
    s2 = s2.replace('reply("❌ Ocorreu um erro ao carregar o menu Nazuna")', 'reply("' + FOFO['erro'] + '")')

    for cat, n in sorted(contagem.items(), key=lambda x: -x[1]):
        print(f'{n:4d}  {cat}')
        for e in sorted(exemplos.get(cat, []))[:12]:
            print(f'        · {e}')
    print('total', sum(contagem.values()))
    if APLICAR:
        f.write_text(s2, newline='')


def design_padrao():
    f = SRC / 'utils' / 'database.js'
    s = f.read_text(newline='')
    velho = r"`╭┈⊰ 🌸 『 *{botName}* 』\n┊Olá, {userName}!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`"
    novo = r"`╭─── ⋆｡˚ ☁︎ *{botName}* ☁︎ ˚｡⋆ ───╮\n│ Oi, {userName}! ♡\n╰──────────────────────╯`"
    n = s.count(velho)
    s = s.replace(velho, novo)
    for k, v in DESIGN.items():
        s = re.sub(rf'(\b{k}: )"[^"\n]*"', lambda m: f'{m.group(1)}"{v}"', s)
    print(f'database.js: {n} cabeçalhos padrão trocados')
    if APLICAR:
        f.write_text(s, newline='')


menus()
respostas()
design_padrao()
