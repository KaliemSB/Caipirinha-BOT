const fetch = require('node-fetch');

exports.run = async( client, message, args ) => {
    await fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${args[0]}_${args[1]}.jpg`)
    .then(function(response) {
        if (response.status == 403) {
            message.channel.send(`Ops! Algo deu errado 🙈`)
         } else {
            message.channel.send(response.url);
         }
    })
}
  exports.config = {
    aliases: ["splash"]
  }

