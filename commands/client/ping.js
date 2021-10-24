const Discord = require('discord.js');


module.exports = {
  name: 'ping',
  aliases: ['latencia'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {
  

//declaring traslate messages




//creating embed
let embed = new Discord.MessageEmbed()
.setColor(all.config.cor)
.setDescription('Carregando...')

//sending and declaring message in channel
let msg = await message.channel.send({embeds: [ embed ] });

setTimeout(() => {
    embed.setDescription(`A latência da mensagem e \`${msg.createdTimestamp - message.createdTimestamp}\`ms. E a latência da API é \`${Math.round(client.ws.ping)}\`ms.`)
msg.edit({embeds: [ embed ]})

}, 5000)

  }}