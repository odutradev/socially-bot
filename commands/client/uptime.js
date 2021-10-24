const Discord = require('discord.js');


module.exports = {
  name: 'uptime',
  aliases: ['tempoonline'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {


//declaring time of bot
let totalSeconds = client.uptime / 1000;
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;

//declaring uptime message
let uptime = `Estou online a \`${days.toFixed()}\` dias, \`${hours.toFixed()}\` horas, \`${minutes.toFixed()}\` minutos, \`${seconds.toFixed()}\` segundos.`



//creating discord embed
var embed = new Discord.MessageEmbed()
.setColor(all.config.cor)
.setDescription(uptime)


//sending message in channel
message.channel.send({embeds: [ embed ]})

  }}