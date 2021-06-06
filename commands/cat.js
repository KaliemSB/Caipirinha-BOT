const fetch = require('node-fetch');

exports.run = async(client, message, args) => {
    await fetch('https://api.thecatapi.com/v1/images/search').then((res) => res.json()).then((data) => {
    message.channel.send(data[0].url);})
    .catch(error => message.channel.send('Ops! Algo deu errado 🙈', error));
  }
  exports.config = {
    aliases: ["dog", "randomdog"]
  }