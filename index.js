const Discord = require("discord.js"),
      client = new Discord.Client(),
      fs = require("fs");
      require('dotenv')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
    //Events "handler"
    fs.readdir('./events/', (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            let eventFunc = require(`./events/${file}`);
            console.log("Successfully loaded " + file)
            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunc.run(client, ...args));
        });
});

// client.on("voiceStateUpdate", async (message) => {
//     try {
//         const connection = await message.member.voice.channel.join();
//         const dispatcher = connection.play('https://firebasestorage.googleapis.com/v0/b/caipirinha-bot-1e83a.appspot.com/o/audio.mp3?alt=media&token=d8f1ab46-1239-424c-b64e-9dc94a07f554');

//         dispatcher.on('start', () => {
//             console.log('audio.mp3 is now playing!');
//         });

//         dispatcher.on('finish', async () => {
//             console.log('audio.mp3 has finished playing!');
//             await message.member.voice.channel.leave()
//         });

//         dispatcher.on('error', console.error);
//     } catch (error) {
//         console.log(error)
//     }
// })

client.on("ready", () => console.log("Online!"));
client.login(process.env.DISCORD_TOKEN)