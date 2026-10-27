async function menuSticker(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭─── ⋆｡˚ ☁︎ *${botName}* ☁︎ ˚｡⋆ ───╮\n│ Oi, #user#! ♡\n╰──────────────────────╯`,
    menuTopBorder = "╭─ ",
    bottomBorder = "╰─────── ⋆｡˚ ✧ ───────",
    menuTitleIcon = "✧",
    menuItemIcon = " ♡ ",
    separatorIcon = "✦",
    middleBorder = "│",
    createStickerMenuTitle = "🎨 Criação de Figurinhas",
    managementMenuTitle = "⚙️ Gerenciamento de Figurinhas"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}

${menuTopBorder}${separatorIcon} *${createStickerMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}emojimix
${middleBorder}${menuItemIcon}${prefix}ttp
${middleBorder}${menuItemIcon}${prefix}attp
${middleBorder}${menuItemIcon}${prefix}sticker
${middleBorder}${menuItemIcon}${prefix}sticker2
${middleBorder}${menuItemIcon}${prefix}sbg
${middleBorder}${menuItemIcon}${prefix}sfundo
${middleBorder}${menuItemIcon}${prefix}qc
${bottomBorder}

${menuTopBorder}${separatorIcon} *${managementMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}figualeatoria
${middleBorder}${menuItemIcon}${prefix}figurinhas
${middleBorder}${menuItemIcon}${prefix}rename
${middleBorder}${menuItemIcon}${prefix}rgtake
${middleBorder}${menuItemIcon}${prefix}take
${middleBorder}${menuItemIcon}${prefix}toimg
${middleBorder}${menuItemIcon}${prefix}brat
${middleBorder}${menuItemIcon}${prefix}bratvid
${bottomBorder}
`;
}
export default menuSticker;