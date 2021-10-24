require('dotenv').config();

//requiring discord library 
const Discord = require("discord.js"); 
//requiring console color library
const { colors } = require('foguetecolors');
//creating the client 
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_MESSAGE_REACTIONS"]});

//declaring client commands and aliases
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//requiring engine of client
const engine = require('./files/engine.js');
//requring socially json
const socially = require('./files/socially.json');
//requirng config json
const config = require('./files/config.json');


//starting ready event
client.on("ready", async () => { 

module.exports.client = client;

//print stats in terminal
console.log(colors.green('Bot start successfully !'));
//iniciating engine 
await engine.start(client); 



})


client.on("guildMemberAdd", async (member) => {



})


//Bot logging into the api
client.login(process.env.TOKEN).resolve
