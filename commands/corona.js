const fetch = require('node-fetch');

exports.run = async(client, message, args) => {
    await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${args}`).then((res) => res.json()).then((data) => {
    message.channel.send(`**Confirmados:** ${data.All.confirmed} 🤒\n**Mortes:** ${data.All.deaths} ☠️\n**Recuperados:** ${data.All.recovered} 😀`);})
    .catch(error => message.channel.send('Ops! Algo deu errado 🙈', error));
  }
  exports.config = {
    aliases: ["corona"]
  }