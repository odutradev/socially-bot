const Discord = require('discord.js');
const socially = require('../../files/socially.json')
const  { MessageActionRow, MessageButton , MessageSelectMenu } = require('discord.js')

module.exports = {
  name: 'registrar',
  aliases: ['r'],
  devs: '',
  botperm: [' '],
  memberperm: [' '],
  nsfw: ' ',
  run: async (client, message, args, all) => {

const{ co } = all.roles;
message.delete()



if (!message.guild.members.cache.get(message.author.id).roles.cache.find(r => r.id === '900689425653170196')){

if(!message.guild.members.cache.get(message.author.id).permissions.has('MANAGE_ROLES')) return co(message, `Apenas usuarios com cargo <@&900689425653170196> ou permição de \`GERENCIAR CARGOS\` podem usar esse comando!`)

}

var user = message.mentions.members.first();
if (!user) return co(message, "Mencione um usuario para registrar!")
if (user.bot) return co(message, "Você não pode registrar um `BOT`!")


var cargos = socially.cargos;
var cache = [];

async function addButton(array = {}){

let n = 0;

var menu =  new MessageActionRow().addComponents([
array.forEach(v => {

var button = new MessageButton()

if (n % 2 == 0){ button.setStyle('PRIMARY'); n++} else { button.setStyle('SECONDARY'); n++ }
console.log(v.label)
button.setCustomId(v.id).setLabel(v.label)


    })


])

return menu
}

//addButton([{label: 'HOMEM', id: 'homem'},{label: 'MULHER', id: 'mulher'},{label: 'NÃO BINARIO', id: 'não-binario'}])




var buttonOne = new MessageActionRow()
.addComponents(
[

    new MessageButton().setStyle('SECONDARY').setLabel('HOMEM').setCustomId('homem'),
   
    new MessageButton().setStyle('PRIMARY').setLabel('MULHER').setCustomId('mulher'),

    new MessageButton().setStyle('SECONDARY').setLabel('NÃO BINARIO').setCustomId('não-binario')
]
)

var buttonTwo = new MessageActionRow()
.addComponents(
[

    new MessageButton().setStyle('SECONDARY').setLabel('HETERO').setCustomId('hetero'),
   
    new MessageButton().setStyle('PRIMARY').setLabel('LGBTQA+').setCustomId('lgbtqa'),

    
]
)
var buttonThree = new MessageActionRow()
.addComponents(
[

    new MessageButton().setStyle('SECONDARY').setLabel('+18').setCustomId('+18'),
   
    new MessageButton().setStyle('PRIMARY').setLabel('-18').setCustomId('-18'),

    
]
)

var buttonFour = new MessageActionRow()
.addComponents(
[

    new MessageButton().setStyle('SECONDARY').setLabel('NAMORANDO').setCustomId('namorando'),
   
    new MessageButton().setStyle('PRIMARY').setLabel('SOLTEIRO').setCustomId('solteiro'),

    
]
)



var selectMenu = new MessageActionRow()
.addComponents([
    new MessageSelectMenu()
    .setCustomId('selectmenu')
    .setPlaceholder('Selecione um local')
    .addOptions({label: "SUL", value: "1" })
    .addOptions({label: "SUDESTE", value: "2" })
    .addOptions({label: "CENTRO OESTE", value: "3" })
    .addOptions({label: "NORTE", value: "4" })
    .addOptions({label: "NORDESTE", value: "5" })
    .addOptions({label: "ESTRANGEIRO", value: "6" })
])


var embed = new Discord.MessageEmbed()
.setColor(all.config.cor)
.setAuthor("Sistema de Registro:", client.user.displayAvatarURL())
.setFooter("Clique no botão de acordo com o cargo a ser setado no usuario.")
.setDescription(`**Cargos disponiveis:**\n<@&${cargos['homem']}>\n<@&${cargos['mulher']}>\n<@&${cargos['não-binario']}>`)


let  msg = await message.channel.send({
   

    embeds:[embed],
    components:[ buttonOne]

})

var filter = (b)  => b.user.id === message.author.id
var coletor = msg.createMessageComponentCollector({filter, time: 2*60000})

coletor.on('collect', (v) => {

    
    
if (v.customId == 'homem'  || v.customId == 'mulher' ||  v.customId == 'não-binario') {

    cache.push(cargos[v.customId]) 
    switch (v.customId) {
        case 'homem':
        user.roles.add(cargos['homem'], 'SISTEMA DE REGISTRO')
        
            break;
        case 'mulher':
        user.roles.add(cargos['mulher'], 'SISTEMA DE REGISTRO')
        break;
        case 'não-binario':
        user.roles.add(cargos['não-binario'], 'SISTEMA DE REGISTRO')
        break;
        default:
            break;
    }
 
v.update({
    
embeds: [ embed.setDescription(`**Cargos disponiveis:**\n<@&${cargos['hetero']}>\n<@&${cargos['lgbtqa']}>`) ],
components: [ buttonTwo]

})

}

if (v.customId == 'hetero'  || v.customId == 'lgbtqa' ) {

    cache.push(cargos[v.customId]) 
    switch (v.customId) {
        case 'hetero':
        user.roles.add(cargos['hetero'], 'SISTEMA DE REGISTRO')
            break;
        case 'lgbtqa':
        user.roles.add(cargos['lgbtqa'], 'SISTEMA DE REGISTRO')
        break;
       
        default:
            break;
    }
    v.update({
        
    embeds: [ embed.setDescription(`**Cargos disponiveis:**\n<@&${cargos['+18']}>\n<@&${cargos['-18']}>`) ],
    components: [ buttonThree]
    
    })
    
    }

    if (v.customId == '+18'  || v.customId == '-18' ) {

        cache.push(cargos[v.customId]) 
        switch (v.customId) {
            case '+18':
            user.roles.add(cargos['+18'], 'SISTEMA DE REGISTRO')
                break;
            case '-18':
            user.roles.add(cargos['-18'], 'SISTEMA DE REGISTRO')
            break;
         
            default:
                break;
        }
        v.update({
            
        embeds: [ embed.setDescription(`**Cargos disponiveis:**\n<@&${cargos['namorando']}>\n<@&${cargos['solteiro']}>`) ],
        components: [ buttonFour]
        
        })
        
        }

        if (v.customId == 'namorando'  || v.customId == 'solteiro' ) {

            cache.push(cargos[v.customId]) 
            switch (v.customId) {
                case 'namorando':
                user.roles.add(cargos['namorando'], 'SISTEMA DE REGISTRO')
                    break;
                case 'solteiro':
                user.roles.add(cargos['solteiro'], 'SISTEMA DE REGISTRO')
                break;
             
                default:
                    break;
            }
           
            v.update({
                
           
            embeds: [ embed.setDescription(`**Cargos disponiveis:**\n<@&${cargos['sul']}>\n<@&${cargos['sudeste']}>\n<@&${cargos['centro-oeste']}>\n<@&${cargos['nordeste']}>\n<@&${cargos['norte']}>\n<@&${cargos['estrangeiro']}>`) ],
            components: [ selectMenu ]
            
            })
            

msg.createMessageComponentCollector(filter = (b)  => b.user.id === message.author.id,{ max: 10}).on('collect', (i) => {

let select = i.values[0];


switch (select) {
    case '1':
    user.roles.add(cargos['sul'], 'SISTEMA DE REGISTRO')
    cache.push(cargos['sul']) 
        break;
    case '2':
    user.roles.add(cargos['sudeste'], 'SISTEMA DE REGISTRO')
    cache.push(cargos['sudeste']) 
    break;
    case '3':
    user.roles.add(cargos['centro-oeste'], 'SISTEMA DE REGISTRO')
    cache.push(cargos['centro-oeste']) 
    break;
    case '4':
    user.roles.add(cargos['nordeste'], 'SISTEMA DE REGISTRO')
    cache.push(cargos['nordeste']) 
    break;
    case '5':
    user.roles.add(cargos['norte'], 'SISTEMA DE REGISTRO')
    cache.push(cargos['norte']) 
    break;
    case '6':
    user.roles.add(cargos['estrangeiro'], 'SISTEMA DE REGISTRO')
    cache.push(cargos['estrangeiro']) 
    break;
    default:
    break;
}


let fim = new Discord.MessageEmbed()
.setColor(all.config.cor)
.setAuthor("Sistema de Registro:", client.user.displayAvatarURL())
.setDescription(`Cargos setados no usuario com sucesso!`)
.addField("Cargos", `${cache.map(ch => `<@&${ch}>`).join('\n')}`)

msg.delete()
message.channel.send({embeds: [ fim ]}).then(m => {
user.send({embeds: [ fim ]}).catch(v => {})
user.roles.remove(cargos['sem-registro'])


setTimeout(() => {
    
    message.channel.bulkDelete(1, true).catch(v => {})

}, 15000);


})




})


            }

})




}}