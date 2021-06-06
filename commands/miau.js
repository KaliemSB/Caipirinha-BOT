const Discord = require("discord.js");

exports.run = async(client, message, args) => {
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play('https://firebasestorage.googleapis.com/v0/b/caipirinha-bot.appspot.com/o/Miau%2FMiau.mp3?alt=media&token=77634240-a1e8-4b77-9782-771345974422');
    
        dispatcher.on('start', () => {
            console.log('audio.mp3 is now playing!');
        });
    
        dispatcher.on('finish', () => {
            console.log('audio.mp3 has finished playing!');
        });
    
        // Always remember to handle errors appropriately!
        dispatcher.on('error', console.error);
    }
  }
  exports.config = {
    aliases: ["corona"]
  }