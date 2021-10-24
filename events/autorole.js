//requiring discord library
const Discord = require('discord.js');


//pulling files from './files/..'
const config = require('../files/config.json');
const roles = require('../files/roles.js');
const socially = require('../files/socially.json');


module.exports = {
    name: 'guildMemberAdd',
    run: async (member, client) => {

        if (member.user.bot == true ) return;
        if (member.guild.id  != '898361277234155540') return; 
    
    
    
    
    let embed = new Discord.MessageEmbed()
      
    .setColor(config.cor).setTimestamp()
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`<a:881178726547738635:899281208368857158>  <:coras:901061855991173180>  Seja bem-vindo(a) ao Socially  <:coras:901061855991173180>  <a:881178726547738635:899281208368857158> \n\n <:855532077524320366:899281277885222942>  fique à vontade para se registrar em <#898544844237078538>
    <:855532077524320366:899281277885222942>  Caso queira ser da nossa staff basta clicar aqui <#898540031831072818>`)
    
    let canal = client.channels.cache.get(socially.welcome);
    
    canal.send({
        content:`${member}`,
         embeds: [ embed ]
    });
    
    try {
      
    
        member.roles.add(socially.autorole, 'AUTOROLE')
        member.roles.add(socially.autorolesemregistro, 'AUTOROLE')
    
        let autorole = new Discord.MessageEmbed()
        .setColor(config.green)
        .setAuthor("Sistema de Autorole:", client.user.displayAvatarURL())
        .setDescription(`Cargo <@&${socially.autorole}>${socially.autorolesemregistro ? ` / <@&${socially.autorolesemregistro}>` : ""}adicionado em ${member}/\`${member.id}\`${member.user.bot ? "\n\nBOT: `SIM.`" : '' }`)
        
        client.channels.cache.get(socially.logs).send({embeds: [ autorole ]})
        
        } catch(e){
        
        client.channels.cache.get(socially.logs).send("Ouve um erro ao adicionar `AUTOROLE` no novo usuario " + member + "\n\n```js\n" + e + "```");
        
        }
    
    

    }}