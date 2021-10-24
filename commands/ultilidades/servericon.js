const Discord = require('discord.js');


module.exports = {
  name: 'servericon',
  aliases: ['si'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {


let icon = message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 });


   let embed = new Discord.MessageEmbed() 
   .setColor(all.config.cor) 
   .setDescription(`[DownLoad](${message.guild.iconURL()})`)
   .setImage(icon) 
   
   message.channel.send({embeds: [embed] })




}}