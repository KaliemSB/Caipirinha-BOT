const fetch = require('node-fetch');

exports.run = async(client, message, args) => {
    await fetch('https://randomfox.ca/floof/').then((res) => res.json()).then((data) => {
    message.channel.send(data.image);})
    .catch(error => message.channel.send('Ops! Algo deu errado 🙈', error));
  }
  exports.config = {
    aliases: ["fox", "randomfox"]
  }