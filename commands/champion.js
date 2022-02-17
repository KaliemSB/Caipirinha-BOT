const Discord = require('discord.js')
const fetch = require('node-fetch')

exports.run = async(client, message, args) => {
  let query = args[0]
  if (args[1]) {
    query = `${args[0]}${args[1]}`
  }
  query = query.toLowerCase().replace(/\s+|'|\./g, '')
  if (query === 'wukong') {
    query = 'monkeyking'
  }

  let response = await fetch('https://blitz-cdn-plain.blitz.gg/blitz/ddragon/12.4.1/data/pt_BR/champions.json').then(res => res.json())

  response = response.data

  query = query.charAt(0).toUpperCase() + query.slice(1);

  response = response[query]

  let enemy = response.tips.enemy.map(x => `${x}\n`).join('')

  let ally = response.tips.ally.map(x => `${x}\n`).join('')

  message.channel.send(
`
**Campeão: ${response.name}**

**Passiva: ${response.spells[0].name}**
${response.spells[0].description}

**Q: ${response.spells[1].name}**
${response.spells[1].description}

**W: ${response.spells[2].name}**
${response.spells[2].description}

**E: ${response.spells[3].name}**
${response.spells[3].description}

**R: ${response.spells[4].name}**
${response.spells[4].description}

**Status: **
Armadura: ${response.stats.armor}
Resistencia magica: ${response.stats.spellblock}
Vida: ${response.stats.hp}
Mana: ${response.stats.mp}
Velocidade de movimento: ${response.stats.movespeed}

**Dicas:**
${ally}
**Counter:**
${enemy}
`)
  }
  exports.config = {
    aliases: ["champion", "champ"]
  }