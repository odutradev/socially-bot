const Discord = require('discord.js');


module.exports = {
  name: 'channelinfo',
  aliases: ['infochat', 'ci'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {



let channel = client.channels.cache.get(message.channel.id)


let msg = await all.roles.traslate(message, ['Nome:', 'ID:', 'E nsfw ?', 'Topico:'])

//creating help embed 
var embed = new Discord.MessageEmbed()
.setColor(all.config.cor).setTimestamp()
.setAuthor(`Informações do Canal:`, client.user.displayAvatarURL())
.setThumbnail(message.guild.iconURL())

.addField(msg[0], `\`${channel.name}\``)
.addField(msg[1], `\`${channel.id}\``)
.addField(msg[2], `\`${channel.nsfw ? 'Sim.' : 'Não:'}\``)
.addField(msg[3], `\`${channel.topic ? channel.topic : 'Sem topico.'}\``)


message.channel.send({embeds: [ embed ] });

}}