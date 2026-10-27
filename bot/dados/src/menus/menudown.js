export default async function menudown(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭─── ⋆｡˚ ☁︎ *${botName}* ☁︎ ˚｡⋆ ───╮\n│ Oi, #user#! ♡\n╰──────────────────────╯`,
    menuTopBorder = "╭─ ",
    bottomBorder = "╰─────── ⋆｡˚ ✧ ───────",
    menuTitleIcon = "✧",
    menuItemIcon = " ♡ ",
    separatorIcon = "✦",
    middleBorder = "│",
    searchMenuTitle = "🔍 Pesquisas & Consultas",
    audioMenuTitle = "🎵 Música & Áudio",
    videoMenuTitle = "🎬 Vídeos & Streaming",
    downloadMenuTitle = "📥 Downloads",
    mediaMenuTitle = "📱 Mídias Sociais",
    gamesMenuTitle = "🎮 Gaming & Apps"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}
${menuTopBorder}${separatorIcon} *${audioMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}letra
${middleBorder}${menuItemIcon}${prefix}play
${middleBorder}${menuItemIcon}${prefix}play2
${middleBorder}${menuItemIcon}${prefix}spotify
${middleBorder}${menuItemIcon}${prefix}soundcloud
${bottomBorder}

${menuTopBorder}${separatorIcon} *${videoMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}playvid
${bottomBorder}

${menuTopBorder}${separatorIcon} *${downloadMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}tiktok
${middleBorder}${menuItemIcon}${prefix}instagram
${middleBorder}${menuItemIcon}${prefix}kwai
${middleBorder}${menuItemIcon}${prefix}igstory
${middleBorder}${menuItemIcon}${prefix}facebook
${middleBorder}${menuItemIcon}${prefix}gdrive
${middleBorder}${menuItemIcon}${prefix}mediafire
${middleBorder}${menuItemIcon}${prefix}twitter
${bottomBorder}

${menuTopBorder}${separatorIcon} *${mediaMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}pinterest
${bottomBorder}
`;
}