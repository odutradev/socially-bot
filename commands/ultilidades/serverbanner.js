const Discord = require('discord.js');


module.exports = {
  name: 'serverbanner',
  aliases: ['sb'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {


let icon = message.guild.bannerURL()


if (!message.guild.banner) return all.roles.co(message, "O server não tem um banner!")


   let embed = new Discord.MessageEmbed() 
   .setColor(all.config.cor) 
   .setDescription(`[DownLoad](${message.guild.bannerURL()})`)
   .setImage(icon) 
   
   message.channel.send({embeds: [embed] })




}}