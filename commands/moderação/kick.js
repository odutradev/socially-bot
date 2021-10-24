const Discord = require('discord.js');


module.exports = {
  name: 'kick',
  aliases: ['expulsar'],
  devs: '',
  botperm: ['KICK_MEMBERS'],
  memberperm: ['KICK_MEMBERS'],
  nsfw: ' ',
  run: async (client, message, args, all) => {



    

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
 
if (!user) return all.roles.co(message, "Mencione `1` usuario para expulsar!")
if (user.id == message.author.id ) return all.roles.co(message,  "Você não pode se expulsar!")
if (user.kickable == false ) return all.roles.co(message,  "O usuario tem um cargo maior que o meu!")

let motivo;
if (args[1]) motivo = args.slice(args[0].lenght).join(" ")


try {
    
user.kick({reason: `Comando executado por ${message.author.tag}`})

all.roles.co(message, `O usuario ${user} foi expulso com sucesso!`, 's');


} catch (e) {
    
all.roles.co(message, "Ouve um erro ao expulsar o usuario!")

}


let msg = await all.roles.traslate(message, ['Author:', 'Motivo:', 'Você foi expulso do servidor']);


let embed = new Discord.MessageEmbed()
.setColor(all.config.red)
.setDescription(`${msg[2]} \`${message.guild.name}\`.`)
.addField(msg[0], `\`${message.author.tag}\``)

if (motivo != null) embed.addField(msg[1], `\`${motivo}\``)

user.send({embeds: [ embed ]}).catch(error => { });






}}
