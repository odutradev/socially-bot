//requiring discord library
const Discord = require('discord.js');
//requiring firebase database
const db = require('firebase')
//requiring console color library
const { colors } = require('foguetecolors');
//requiring management time 
const ms = require('parse-ms');
//requiring node fecht library 
const  fetch = require("node-fetch");
//requiring google traslate api
const translate = require('@vitalets/google-translate-api');
//requiring management files and folders
const fs = require('fs');

//pulling files from './files/..'
const config = require('../files/config.json');
const roles = require('../files/roles.js');
const { chatBot } = require('../files/chatbot.js');


module.exports = {
    name: 'messageCreate',
    run: async (message, client) => {

var prefix;

//declaring general variable
var info = ['fetch', 'translate', 'colors', 'ms', 'fs', 'config', 'roles']
var all = { fetch, translate, colors,  ms, fs, config, roles,  info }

if (config.database != 'none'){

db = db.database()
info.push('db');
all = {...all, db}

//pulling prefix from database
let prefix = await db.ref(`servidores/${message.guild.id}/configurações/prefix`).once('value').then(v => v.val()) || config.prefix;

info.push('prefix');
all = { ...all, prefix}

} else prefix = config.prefix;


//creating ignore config 
let ignore = false;

if (config.ignore == "true" && config.owner == message.author.id ) ignore = true;
 
//pulling mentioned message
let mentionedMessage =  `Meu prefixo nesse servidor e \`${prefix}\`, Use \`${prefix}Help\` para obter ajuda.`; 

//checking if there is a message after the mention
if (config.chatbot == 'on' && message.content.trim().split(/ +/g)[1]) return chatBot(message, all);

//creanting mentined embed
mentionedMessage = new Discord.MessageEmbed()
.setColor(config.cor)
.setAuthor('Socially:', client.user.displayAvatarURL())
.setDescription(mentionedMessage)

//checking if the bot was mentioned
if (message.content.startsWith(`<@!${client.user.id}>` ) ||  message.content.startsWith(`<@${client.user.id}>`)) return message.channel.send({embeds: [mentionedMessage]})


//returns if you don't have a prefix
if (!message.content.toLowerCase().startsWith(prefix)) return;

//declaring arguments from message
var args = message.content.slice(prefix.length).trim().split(/ +/g);

//declaring command a being seached
var cmd = args.shift().toLowerCase();

//returns if there is nothing after the prefix
if (cmd.length === 0) return;

//pulling client commands 
var command = client.commands.get(cmd);
//pulling command aliases if there is no 'command'
if (!command) command = client.commands.get(client.aliases.get(cmd));

//returning if there is no 'command'
if (!command) return await roles.co(message, `Eu ainda não tenho esse comando, \`${cmd}\`!`)


//checking user status on blacklist
let blackList = await roles.blackList(message);
if (blackList == true ) return;

//checking was badwords in message
let badWords = await roles.badWords(message);
if (badWords == true ) return;

//cheking permissions to bot 
let botpermission = await roles.checkPermission(message, client.user.id , command.botperm, 's');
if (botpermission.status == true ) return;

//checking permissions to user 
let userpermission = await roles.checkPermission(message, message.author.id , command.memberperm);
if (userpermission.status == true ) return;

//cheking channel is nswf
if (command.nsfw == true && message.channel.nsfw == false && ignore == false) return await all.roles.co(message, "Esse comando pode ser executado apenas em canais \`NSFW\`!")

//cheking user is developer
if (command.devs == true &&config.equipe.some(v => message.author.id.includes(v)) != true && ignore == false) return await all.roles.co(message, "Apenas minha \`equipe\` pode usar esse \`comando\`!")


//iniciating command
try {
    
command.run(client, message, args, all);


} catch (e) {
    
console.log(colors.pink(`An error occurred starting the command ${cmd}: `), colors.red(e))
roles.ownerWarn(`Ouve um problema ao iniciar o comando ${cmd}`, `\`\`\`js\n\n${e}\`\`\`` )

}



    }}