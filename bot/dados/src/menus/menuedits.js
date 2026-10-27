export default async function menuedits(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭─── ⋆｡˚ ☁︎ *${botName}* ☁︎ ˚｡⋆ ───╮\n│ Oi, #user#! ♡\n╰──────────────────────╯`,
    menuTopBorder = "╭─ ",
    bottomBorder = "╰─────── ⋆｡˚ ✧ ───────",
    menuTitleIcon = "✧",
    menuItemIcon = " ♡ ",
    separatorIcon = "✦",
    middleBorder = "│"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}

${menuTopBorder}${separatorIcon} *Menu Edits*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}jornal
${middleBorder}${menuItemIcon}${prefix}cinema
${middleBorder}${menuItemIcon}${prefix}blackwhite
${middleBorder}${menuItemIcon}${prefix}desfoque
${middleBorder}${menuItemIcon}${prefix}wojakreaction
${middleBorder}${menuItemIcon}${prefix}camera
${bottomBorder}`;
}