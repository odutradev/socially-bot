//requiring discord library
const Discord = require('discord.js');
//requiring firebase database
//const db = require('firebase').database();
//requiring console color library
const { colors } = require('foguetecolors');
//requiring management time 
const ms = require('parse-ms');

//pulling files from './files/..'
const config = require('./config.json');
const roles = require('./roles.js')


async function status(client){





//declaring reserve status 
let reserveStats = config.status;

//declaring status type
let statusType = 'WATCHING';

//declaring status time 
let statusTime = 15;

//declaring values to status 
let valor = 0;
let i = 0;


//starting mudance 
setInterval(() => {
    

//changing bot status
client.user.setActivity(`${reserveStats[i++ % reserveStats.length]}`, { type:  statusType })}
    

    , statusTime*1000	)






}





module.exports ={ status }