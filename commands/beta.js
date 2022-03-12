const Discord = require('discord.js')
const Canvas = require('canvas');
const axios = require('axios');

exports.run = async(client, message, args) => {
  let currentPatch = ''
  let championBuild = ''

  try {
    currentPatch = await axios.get('https://utils.iesdev.com/static/json/lol/riot/versions').then(res => res.data[0])
  } catch (error) {
    message.channel.send('Algo deu na verificação do Path atual, tente novamente.')
  }

  function getTranslationTier(tier) {
    if (tier === undefined) tier = 'PLATINUM_PLUS'

    tier = tier.toUpperCase()

    const tierDic = {
      "FERRO": "IRON",
      "BRONZE": "BRONZE",
      "OURO": "GOLD",
      "PLATINA": "PLATINUM",
      "DIAMANTE": "DIAMOND",
      "MESTRE": "MASTER",
      "GRÃO-MESTRE": "GRANDMASTER",
      "DESAFIANTE": "CHALLENGER",
      "PLATINA+": "PLATINUM_PLUS",
      "IRON": "IRON",
      "BRONZE": "BRONZE",
      "GOLD": "GOLD",
      "PLATINUM": "PLATINUM",
      "DIAMOND": "DIAMOND",
      "MASTER": "MASTER",
      "GRANDMASTER": "GRANDMASTER",
      "CHALLENGER": "CHALLENGER",
      "PLATINUM_PLUS": "PLATINUM_PLUS",
      "PLATINUM+": "PLATINUM_PLUS",
    };
    
    return tierDic[tier] ?? "Elo não encontrado.";
  }

  function getTranslationLane(lane) {
    if (lane === undefined) lane = 'MID'

    lane = lane.toUpperCase()

    const laneDic = {
      "TOP": "TOP",
      "JUNGLE": "JUNGLE",
      "JG": "JUNGLE",
      "MID": "MID",
      "BOTTOM": "ADC",
      "BOT": "ADC",
      "ADC": "ADC",
      "SUP": "SUPPORT",
      "SUPPORT": "SUPPORT",
      "SUPORTE": "SUPPORT",
    };

    return laneDic[lane] ?? "Lane não encontrada.";
  }

  async function getChampionName(name) {
    if (name === undefined) championId = 'Udyr'

    name = name.toLowerCase()

    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    let championId = capitalized

    if (championId === 'Miss fortune' || championId === 'Miss' || championId === 'Missfortune') {
      championId = 'MissFortune'
    }

    if (championId === 'Wukong') {
      championId = 'MonkeyKing'
    }

    try {
      const championsInPatch = await axios.get(`https://blitz-cdn-plain.blitz.gg/blitz/ddragon/${currentPatch}/data/pt_BR/champions.json`).then(res => res.data.keys)

      championId = Object.keys(championsInPatch)[Object.values(championsInPatch).indexOf(capitalized)]

      if (championId === undefined) message.channel.send('Campeão não encontrado, tente escrever de uma maneira não burra.')
    } catch (error) {
      message.channel.send('Algo deu com a verificação do Id do campeão, tente novamente.')
    }

    return [championId, capitalized]
  }

  const tier = getTranslationTier(args[2])
  const laneQuery = getTranslationLane(args[1])
  const championQuery = await getChampionName(args[0])

  console.log(tier, laneQuery, championQuery)

  try {
    championBuild = await axios.get(`https://league-champion-aggregate.iesdev.com/api/champions/${championQuery[0]}?queue=420&region=world&role=${laneQuery}&tier=${tier}`).then(res => res.data.data[0].stats)
  } catch (error) {
    message.channel.send('Algo deu com a verificação da build do campeão, tente novamente.')
  }

  const canvas = Canvas.createCanvas(807, 747);
  const context = canvas.getContext('2d');

	let background = ''

  try {
    background = await Canvas.loadImage('https://raw.githubusercontent.com/KaliemSB/api/master/frame1.png');
  } catch (error) {
    background = await Canvas.loadImage('https://raw.githubusercontent.com/KaliemSB/api/master/blank.png');
  }

	// This uses the canvas dimensions to stretch the image onto the entire canvas
	context.drawImage(background, 0, 0, canvas.width, canvas.height);

  let avatar = ''

  try {
    avatar = await Canvas.loadImage(`https://ddragon.canisback.com/img/champion/tiles/${championQuery[1]}_0.jpg`)
  } catch (error) {
    avatar = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(avatar, 16*3, 11.5*3, 32*3, 32*3);

  let item1 = ''

  try {
    item1 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_starting_items.build[0]}.png`)
  } catch (error) {
    item1 = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(item1, 16*3, 211*3, 28*3, 28*3);

  let item2 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[0]}.png`)

  try {
    item2 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[0]}.png`)
  } catch (error) {
    item2 = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(item2, 48*3, 211*3, 28*3, 28*3);

  let item3 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[1]}.png`)

  try {
    item3 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[1]}.png`)
  } catch (error) {
    item3 = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(item3, 80*3, 211*3, 28*3, 28*3);

  let item4 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[2]}.png`)

  try {
    item4 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[2]}.png`)
  } catch (error) {
    item4 = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(item4, 112*3, 211*3, 28*3, 28*3);

  let item5 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[3]}.png`)

  try {
    item5 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[3]}.png`)
  } catch (error) {
    item5 = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(item5, 144*3, 211*3, 28*3, 28*3);

  let item6 = ''

  try {
    item6 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[4]}.png`)
  } catch (error) {
    item6 = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(item6, 176*3, 211*3, 28*3, 28*3);

  let item7 = ''
  
  try {
    item7 = await Canvas.loadImage(`https://ddragon.canisback.com/latest/img/item/${championBuild.most_common_big_item_builds.build[5]}.png`)
  } catch (error) {
    item7 = await Canvas.loadImage(`https://raw.githubusercontent.com/KaliemSB/api/master/blank.png`)
  }

  context.drawImage(item7, 208*3, 211*3, 28*3, 28*3);

  const rune1 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.most_common_runes.build[1]}.png`)

  context.drawImage(rune1, 125*3, 84*3, 32*3, 32*3);

  const rune2 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.most_common_runes.build[2]}.png`)

  context.drawImage(rune2, 161*3, 86*3, 28*3, 28*3);

  const rune3 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.most_common_runes.build[3]}.png`)

  context.drawImage(rune3, 193*3, 86*3, 28*3, 28*3);

  const rune4 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.most_common_runes.build[4]}.png`)

  context.drawImage(rune4, 225*3, 86*3, 28*3, 28*3);

  const rune5 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.most_common_runes.build[6]}.png`)

  context.drawImage(rune5, 125*3, 120*3, 28*3, 28*3);

  const rune6 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.most_common_runes.build[7]}.png`)

  context.drawImage(rune6, 157*3, 120*3, 28*3, 28*3);

  const rune7 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.rune_stat_shards.build[0]}.png`)

  context.drawImage(rune7, 125*3, 152*3, 20*3, 20*3);

  const rune8 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.rune_stat_shards.build[1]}.png`)

  context.drawImage(rune8, 149*3, 152*3, 20*3, 20*3);

  const rune9 = await Canvas.loadImage(`https://blitz-cdn.blitz.gg/runes/all/${championBuild.rune_stat_shards.build[2]}.png`)

  context.drawImage(rune9, 173*3, 152*3, 20*3, 20*3);

  context.font = `${16*3}px sans-serif`;

	context.fillStyle = '#000000';

  context.font = `${15*3}px sans-serif`;

	context.fillText(championQuery[1], 56 * 3, 75);

	context.fillStyle = '#4F5660';

  const formatLane = () => {
    let text = laneQuery.toLowerCase()

    text = text.charAt(0).toUpperCase() + text.slice(1);

    return text
  }

  const formatTier = () => {
    let text = tier.toLowerCase()

    text = text.charAt(0).toUpperCase() + text.slice(1);

    if (text === 'Platinum_plus') text = 'Platina+'

    return text
  }

	context.fillText(`${formatLane()} | ${formatTier()}`, 56 * 3, 125);

	// Use the helpful Attachment class structure to process the file for you
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile-image.png');

  message.channel.send({ files: [attachment] })
  }
  exports.config = {
    aliases: ["champion"]
  }
