const Discord = require('discord.js')
var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const database = admin.firestore(); 

const databaseRef = database.collection('builds');

exports.run = async(client, message, args) => {
  let query = args[0]
  if (args[1]) {
    query = `${args[0]}${args[1]}`
  }
  query = query.toLowerCase().replace(/\s+|'|\./g, '')
  if (query === 'wukong') {
    query = 'monkeyking'
  }
  const cityRef = database.collection('builds').doc(query);
  const doc = await cityRef.get();
  if (!doc.exists) {
    message.channel.send('Ops! Algo deu errado 🙈')
  } else {
    const sfbuff = new Buffer.from(doc.data().build, "base64");
    const sfattach = new Discord.MessageAttachment(sfbuff, `${doc.data().name}.png`);
    message.channel.send(sfattach);
  }
    // try {
    //   var db = admin.database();
    //   var ref = db.ref("/");

    //   await ref.orderByChild("stats/champion/name").equalTo(args.join(' ')).once("value", function(snapshot) {
    //     try {
    //       var data = snapshot.val();
    //       var id = Object.keys(snapshot.val())[0];
    //       const sfbuff = new Buffer.from(data[id].stats.champion.build, "base64");
    //       const sfattach = new Discord.MessageAttachment(sfbuff, "output.png");
    //       message.channel.send(sfattach);
    //     } catch (error) {
    //       message.channel.send('Ops! Algo deu errado 🙈', console.log(error))
    //     }
    //   })
    // } catch (error) {
    //   message.channel.send('Ops! Algo deu errado 🙈', console.log(error))
    // }
  }
  exports.config = {
    aliases: ["rune", "lolrune"]
  }