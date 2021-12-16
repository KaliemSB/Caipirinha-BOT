const fetch = require('node-fetch');
const Discord = require('discord.js')

exports.run = async(client, message, args) => {
    await fetch(`http://localhost:5000/build/${args[0]}/${args[1]}`).then((res) => res.json()).then((data) => {
      const sfbuff = new Buffer.from(data.split(",")[1], "base64")
      const sfattach = new Discord.MessageAttachment(sfbuff, "output.png");
      message.channel.send(sfattach)})
    .catch(error => message.channel.send('Ops! Algo deu errado 🙈', console.log(error)));
  }
  exports.config = {
    aliases: ["rune", "lolrune"]
  }