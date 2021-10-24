const Discord = require('discord.js');


module.exports = {
  name: 'clear',
  aliases: ['limpar', 'limparchat'],
  devs: '',
  botperm: ['MANAGE_MESSAGES'],
  memberperm: ['MANAGE_MESSAGES'],
  nsfw: ' ',
  run: async (client, message, args, all) => {



let txt = args[0];


if (!txt) return all.roles.co(message, "Digite uma quantia de mensagens para apagar !")

if (isNaN(txt)) return all.roles.co(message, "Use apenas numeros de `1` a `100`!")

if (parseInt(txt) > 100 || parseInt(txt) < 1) return all.roles.co(message, "Use apenas numeros de `1` a `100`!")  

//escolhe o filme aki
try {
    
    message.channel.bulkDelete(txt, true).then(v => {

        txt = Number(txt) - Number(v.size)
  
        all.roles.co(message,  `Apaguei um total de \`${v.size}\`, Porem \`${Number(txt)}\` foram ignoradas.`, 's')
        
        })


} catch (e) {
    
all.roles.co(message, "Ocorreu um erro ao apagar as mensagens!")

}



  }}