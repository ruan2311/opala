export default async function menuFerramentas(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭─── ⋆｡˚ ☁︎ *${botName}* ☁︎ ˚｡⋆ ───╮\n│ Oi, #user#! ♡\n╰──────────────────────╯`,
    menuTopBorder = "╭─ ",
    bottomBorder = "╰─────── ⋆｡˚ ✧ ───────",
    menuTitleIcon = "✧",
    menuItemIcon = " ♡ ",
    separatorIcon = "✦",
    middleBorder = "│",
    nicknameMenuTitle = "📱 Gerador de Nomes & Identidade",
    captureMenuTitle = "🖼️ Capturas & Visualização",
    linkMenuTitle = "🌐 Links & Uploads",
    securityMenuTitle = "🔒 Segurança",
    timeMenuTitle = "🕐 Tempo & Clima",
    languageMenuTitle = "📚 Dicionário & Tradução",
    reminderMenuTitle = "⏰ Lembretes & Listas"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}

${menuTopBorder}${separatorIcon} *${nicknameMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}gerarnick
${bottomBorder}

${menuTopBorder}${separatorIcon} *${captureMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}ssweb
${middleBorder}${menuItemIcon}${prefix}qrcode <texto>
${middleBorder}${menuItemIcon}${prefix}lerqr (responda imagem)
${middleBorder}${menuItemIcon}${prefix}removebg (responda imagem)
${middleBorder}${menuItemIcon}${prefix}transcrever (responda áudio)
${middleBorder}${menuItemIcon}${prefix}tts <texto>
${bottomBorder}

${menuTopBorder}${separatorIcon} *🧮 Calculadora*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}calc <expressão>
${middleBorder}${menuItemIcon}${prefix}calc converter <valor> <de> <para>
${bottomBorder}

${menuTopBorder}${separatorIcon} *🔮 Horóscopo & Misticismo*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}horoscopo <signo>
${middleBorder}${menuItemIcon}${prefix}signos
${bottomBorder}

${menuTopBorder}${separatorIcon} *📝 Notas Pessoais*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}nota add <texto>
${middleBorder}${menuItemIcon}${prefix}notas
${middleBorder}${menuItemIcon}${prefix}nota ver <id>
${middleBorder}${menuItemIcon}${prefix}nota del <id>
${middleBorder}${menuItemIcon}${prefix}nota fixar <id>
${middleBorder}${menuItemIcon}${prefix}nota buscar <termo>
${bottomBorder}

${menuTopBorder}${separatorIcon} *${linkMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}encurtalink
${middleBorder}${menuItemIcon}${prefix}upload
${bottomBorder}

${menuTopBorder}${separatorIcon} *${securityMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}verificar <link>
${bottomBorder}

${menuTopBorder}${separatorIcon} *${timeMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}hora <cidade/país>
${middleBorder}${menuItemIcon}${prefix}clima <cidade>
${bottomBorder}

${menuTopBorder}${separatorIcon} *${languageMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}tradutor
${bottomBorder}

${menuTopBorder}${separatorIcon} *${reminderMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}lembrete
${middleBorder}${menuItemIcon}${prefix}meuslembretes
${middleBorder}${menuItemIcon}${prefix}apagalembrete
${middleBorder}
${middleBorder}${menuTitleIcon} *Outros* ${menuTitleIcon}
${middleBorder}${menuItemIcon}${prefix}aniversario
${middleBorder}${menuItemIcon}${prefix}estatisticas
${bottomBorder}
`;
}
