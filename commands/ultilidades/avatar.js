const Discord = require('discord.js');


module.exports = {
  name: 'avatar',
  aliases: ['usericon'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {

let user = message.mentions.users.first() || client.users.cache.get(message.author.id);

    let icon = user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 });


    let embed = new Discord.MessageEmbed() 
    .setColor(all.config.cor) 
    .setDescription(`[DownLoad](${user.displayAvatarURL()})`)
    .setImage(icon) 
    
    message.channel.send({embeds: [embed] })
 




}}