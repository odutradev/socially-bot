const Discord = require('discord.js');


module.exports = {
  name: 'help',
  aliases: ['ajuda', 'painel', 'h', 'comandos'],
  botperm: [' '],
  devs: '',
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {


//pulling main variables
var db = all.db;
var fs = all.fs;
var c = all.config;


//declaring prototype function 
String.prototype.fistLetter =  function() { return this.toLowerCase().replace(/(\s|^)\w/g, m => m.toUpperCase()) }

//declaring global traslate
let tradução = await all.roles.traslate(message, [`Ola meu prefixo nesse servidor e \`${all.prefix}\`, Use \`${all.prefix}Help\` para ter ajuda.`]);


//creating help embed 
var embed = new Discord.MessageEmbed()
.setColor(c.cor).setTimestamp()
.setAuthor(`${client.user.username} HELP:`, client.user.displayAvatarURL())
.setDescription(tradução[0])

//starting forEach()
fs.readdirSync('./commands').forEach(dir => {

//pulling commands folder
cmds = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
//declaring array with 'cmds'
let array = Object.entries(cmds);

if (array.length != 0){

//mapping the array
embed.addField(`${dir.fistLetter()} - (${array.length})`,  `${cmds.map(v => `\`${v.slice(0, -3).fistLetter()}\` `)}.`)

}

        })



//sending message in channel 
message.channel.send({ embeds: [ embed ] })







  }}