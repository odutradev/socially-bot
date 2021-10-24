const Discord = require('discord.js');


module.exports = {
  name: 'emojiinfo',
  aliases: ['ei'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {


var txt = args[0];
var reg = /:[^:\s]*(?:::[^:\s]*)*:/;

if (!reg.test(txt)) return all.roles.co(message, "Envie um emoji valido para ver as informações!")
txt = txt.trim().split(':')[2].slice(0, 18);
txt = client.emojis.cache.find(v => v.id == txt);


if (!txt) return all.roles.co(message, "Não achei esse emoji!")

let msg = await all.roles.traslate(message, ['Nome:', 'ID:', 'Servidor', 'E animado ?'])




var embed = new Discord.MessageEmbed()
.setColor(all.config.cor).setThumbnail(txt.url)
.setAuthor('Informações do emoji:', client.user.displayAvatarURL())
.setDescription(`[Donwload](${txt.url})`)
.addField(msg[0], `\`${txt.name}\``)
.addField(msg[1], `\`${txt.id}\``)
.addField(msg[2], `\`${txt.guild.name}\``)
.addField(msg[3], `\`${txt.animated ? 'Sim.' : 'Não.'}\``)

message.channel.send({embeds: [ embed ]})


}}