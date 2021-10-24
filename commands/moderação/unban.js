const Discord = require('discord.js');


module.exports = {
  name: 'unban',
  aliases: ['desbanir'],
  devs: '',
  botperm: ['BAN_MEMBERS'],
  memberperm: ['BAN_MEMBERS'],
  nsfw: ' ',
  run: async (client, message, args, all) => {


let txt = args[0];

if (!txt) return all.roles.co(message, "Envie o `ID` de um usuario para desbanir!")

try {
    
    await message.guild.bans.fetch(txt)

} catch (e) {
    
    return all.roles.co(message, "Não achei nenhum usuario com esse `ID`!")

}


try{

  
message.guild.members.unban(txt)

all.roles.co(message, `O usuario foi desbanido com sucesso!`, 's');


} catch (e) {
    
all.roles.co(message, "Ouve um erro ao desbanir o usuario!")

}
  

let msg = await all.roles.traslate(message, ['Author:', 'Você foi desbanido do servidor']);


let embed = new Discord.MessageEmbed()
.setColor(all.config.green)
.setDescription(`${msg[1]} \`${message.guild.name}\`.`)
.addField(msg[0], `\`${message.author.tag}\``)



let user = await client.users.fetch(txt).catch(error => { });

user.send({embeds: [ embed ]}).catch(error => { });



  }}