const Discord = require('discord.js');


module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {


    let user = message.mentions.users.first() || client.users.cache.get(message.author.id);

let msg = await all.roles.traslate(message, ['Nome:', 'ID:', 'discriminator:', 'Bot:'])

//creating help embed 
var embed = new Discord.MessageEmbed()
.setColor(all.config.cor).setTimestamp()
.setAuthor(`Informações do Usuario:`, client.user.displayAvatarURL())
.setThumbnail(user.displayAvatarURL())


.addField(msg[0], `\`${user.tag}\``)
.addField(msg[1], `\`${user.id}\``)
.addField(msg[2], `\`${user.discriminator}\``)
.addField(msg[3], `\`${user.bot ? 'Sim.' : 'Não.'}\``)


message.channel.send({embeds: [ embed ] });




}}