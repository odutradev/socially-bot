//requiring discord library
const Discord = require('discord.js');
//pulling data from config.json
const config = require('./config.json');
//pulling index modules and variables
const index = require('../index');
//requiring google traslate api
const translate = require('@vitalets/google-translate-api');


//creating function to notification the owner
function ownerWarn(message, error, s){

//pulling client from index.js 
const { client } = require('../index');

//if you don't have logs it will return
if (config.errorLogs == 'none') return;

if (s){ s = "https://imgur.com/nYOgJIm.png" } else { s = "https://imgur.com/9qn8KMt.png" }

//creating warning embed
let embed = new Discord.MessageEmbed()
.setColor(config.red)
.setAuthor(message, s )
.setDescription(error)


//sending text in channel logs
client.channels.cache.get(config.errorLogs).send({embeds: [embed]});

}

async function traslate(message, array ){

//pulling firebase datbase
const db = require('firebase').database();

//pulling language from server 
var language = await db.ref(`servidores/${message.guild.id}/configurações/language`).once('value').then(v => v.val());

//return array
if (!language) return array;

//traslate array

for(let i in array){

//Traduzindo todas propiedades do array
array[i] = await translate(array[i], { from: "pt", to: language }).then(v => v.text);

    }

return array

}



async function co(message, valor, s){

//pulling firebase datbase
const db = require('firebase').database();

//pulling language from server 
var language = await db.ref(`servidores/${message.guild.id}/configurações/language`).once('value').then(v => v.val());

//declaring embed colors and emojis
var cor = config.red;
var emoji = config.not;

//If it has a 3rd parameter, it changes as color and type variables
if (s) { cor = config.green; emoji = config.yes }

if (language) valor = await translate(valor, { from: "pt", to: language }).then(v => v.text);

//creating end embed 
var embed = new Discord.MessageEmbed()
.setColor(cor).setDescription(`${emoji}・${valor}`)

//declaring sending message
var msg = await message.channel.send({embeds: [embed]});

//returning message atributes 
return msg;


    }

//creating blacklist verification function
async function blackList(message){

if (message.author.id == config.owner && config.ignore == "true" ) return false

//pulling firebase database
const db = require('firebase').database();


let server = await db.ref(`BlackList/servidores/${message.guild.id}/situação`).once('value').then(v => v.val());

if ( server == true ){

    await co(message, "Este servidor esta em minha  \`BlackList\`.")
    return true 
}

let user =  await db.ref(`BlackList/usuarios/${message.author.id}/situação`).once('value').then(v => v.val());

if ( user == true ){

    await co(message, "Você esta em minha \`BlackList\`.")
    return true 
}

return false 


}



//creating 
async function badWords(message){

 if (message.author.id == config.owner && config.ignore == "true" ) return false

if (config.badWors.some(v => message.content.includes(v) )){

    await co(message, "Não use palavras de baixo escalão em  meus `comandos`!")
    return true 
}

return false

}


async function checkPermission(message, user, array, bot){

if (message.author.id == config.owner && config.ignore == "true" ) return false

//pulling client to index.js
var client = index.client;

//declaring new user 
user = message.guild.members.cache.get(user);

//verifying the permissions
array = array.filter(v => !user.permissions.has(v));

if (!array[0]) return { status:false }

//pulling discord flags
var flag = config.flags[array[0]];

//declaring warn message 
let msg = `Você não tem permissão para \`${flag}\`!`
if (bot) msg = `Eu não tenho permissão para \`${flag}\`!`

//sending message in channel
await co(message, msg)

return { status:true, array, flag }

}





module.exports = { ownerWarn, co, blackList, badWords, checkPermission, traslate }