export default async function menuMembros(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭─── ⋆｡˚ ☁︎ *${botName}* ☁︎ ˚｡⋆ ───╮\n│ Oi, #user#! ♡\n╰──────────────────────╯`,
    menuTopBorder = "╭─ ",
    bottomBorder = "╰─────── ⋆｡˚ ✧ ───────",
    menuTitleIcon = "✧",
    menuItemIcon = " ♡ ",
    separatorIcon = "✦",
    middleBorder = "│",
    perfilMenuTitle = "👤 Perfil & Estatísticas",
    botStatusMenuTitle = "🤖 Status do Bot",
    personalMenuTitle = "⚙️ Configurações Pessoais",
    rankMenuTitle = "🏆 Rankings & Gamificação",
    gamingMenuTitle = "🎮 Conteúdo Gamer"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}

${menuTopBorder}${separatorIcon} *${perfilMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}perfil
${middleBorder}${menuItemIcon}${prefix}meustatus
${bottomBorder}

${menuTopBorder}${separatorIcon} *${botStatusMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}ping
${middleBorder}${menuItemIcon}${prefix}statusbot
${middleBorder}${menuItemIcon}${prefix}statusgp
${middleBorder}${menuItemIcon}${prefix}regras
${bottomBorder}

${menuTopBorder}${separatorIcon} *${personalMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}mention
${middleBorder}${menuItemIcon}${prefix}afk
${middleBorder}${menuItemIcon}${prefix}voltei
${bottomBorder}

${menuTopBorder}${separatorIcon} *👬 Interação Social*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}roles
${middleBorder}${menuItemIcon}${prefix}transcrever
${middleBorder}${menuItemIcon}${prefix}role.vou
${middleBorder}${menuItemIcon}${prefix}role.nvou
${middleBorder}${menuItemIcon}${prefix}role.confirmados
${bottomBorder}

${menuTopBorder}${separatorIcon} *${rankMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}rankativo
${middleBorder}${menuItemIcon}${prefix}rankinativo
${middleBorder}${menuItemIcon}${prefix}rankativos
${middleBorder}${menuItemIcon}${prefix}atividade
${middleBorder}${menuItemIcon}${prefix}checkativo
${middleBorder}${menuItemIcon}${prefix}totalcmd
${middleBorder}${menuItemIcon}${prefix}topcmd
${bottomBorder}

${menuTopBorder}${separatorIcon} *Conquistas & Presentes*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}conquistas
${middleBorder}${menuItemIcon}${prefix}caixa diaria
${middleBorder}${menuItemIcon}${prefix}caixa rara
${middleBorder}${menuItemIcon}${prefix}caixa lendaria
${middleBorder}${menuItemIcon}${prefix}presente @user <tipo>
${middleBorder}${menuItemIcon}${prefix}inv
${bottomBorder}

${menuTopBorder}${separatorIcon} *⭐ Reputação & Denúncias*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}rep + @user
${middleBorder}${menuItemIcon}${prefix}rep - @user
${middleBorder}${menuItemIcon}${prefix}rep @user
${middleBorder}${menuItemIcon}${prefix}toprep
${middleBorder}${menuItemIcon}${prefix}denunciar @user <motivo>
${middleBorder}${menuItemIcon}${prefix}denuncias
${bottomBorder}

${menuTopBorder}${separatorIcon} *${gamingMenuTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}likeff
${middleBorder}${menuItemIcon}${prefix}infoff
${bottomBorder}
`;
}