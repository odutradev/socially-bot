//requiring management files and folders
const fs = require('fs');
const readdirSync = fs.readdirSync;
//requiring console color library
const { colors } = require('foguetecolors');
//pulling data from config.json
const config = require('./config.json')
//pulling roles from roles.js
const roles = require('./roles.js')
//pulling random status bot 
const { status } = require('./status.js')
//requiring firebase database
const firebase = require('firebase')


//creating start function
async function start(client){

//declaring start to function
var startTime = Date.now();


//iniciating firebase database
try {

if (config.database != "none"){
console.log(colors.blue('Iniciating connection to firebase database'));

//declaring start to database
var databaseTime = Date.now();



//iniciating firebase app
firebase.initializeApp(config.firebase);

//redeclaring new variable of realtime database
firebase = firebase.database();

//adding end time
databaseTime = ((Date.now() - databaseTime) /60).toFixed(5);

console.log(colors.blue(`Database connection made with `) + colors.cyan(`${databaseTime}s.`))
} 
} catch (e){

console.log(colors.pink('Had an error in the database conection: '), colors.red(e))
roles.ownerWarn("Ouve um problema ao conectar com a database", `\`\`\`js\n\n${e}\`\`\`` )

}

//iniciating command handler
try {

console.log(colors.lightBlue('Iniciating conmmand handler'));

//declaring start to command handler
var cmdHandlerTime = Date.now();

//command handler not created by me 
readdirSync('././commands').forEach(dir => {
cmds = readdirSync(`././commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (var file of cmds) {
            pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
            } else {
                continue
            } 
            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    })

//adding end time
cmdHandlerTime = ((Date.now() - cmdHandlerTime) /60).toFixed(5);

console.log(colors.lightBlue(`Command Handler starting made with `) + colors.cyan(`${cmdHandlerTime}s.`))

} catch (e){

console.log(colors.pink('An error occurred starting the command handler: '), colors.red(e))
roles.ownerWarn("Ouve um problema ao iniciar a handler de comandos", `\`\`\`js\n\n${e}\`\`\`` )

}
 

//starting event handler 

try{


console.log(colors.blue('Iniciating event handler'));

//declaring start to database
var eventTime = Date.now();

//event handler not created by me 
readdirSync('././events').forEach(x => {

const events = require(`../events/${x}`);

 if(!events.name) { 

    console.log(colors.pink(`An error occurred loading the '${x}'.`), colors.red(e))

 } else {
    
const emitter = (typeof events.emitter === 'string' ? client[events.emitter] : events.emitter) || client; 
    


 try {
    

emitter['on'](events.name, ( ...args) => events.run(...args, client));

    
 } catch(e) { console.log(colors.pink(`An error occurred loading the '${x}'`), colors.red(e)) }
    
}   
})

//adding end time
eventTime = ((Date.now() - eventTime) /60).toFixed(5);

console.log(colors.blue(`Event handler starting made with `) + colors.cyan(`${eventTime}s.`))

} catch (e){

    console.log(colors.pink('An error occurred starting the event handler: '), colors.red(e))
    roles.ownerWarn("Ouve um problema ao iniciar a handler de eventos", `\`\`\`js\n\n${e}\`\`\`` )
       

}

    
//adding end time
startTime = ((Date.now() - startTime) /60).toFixed(5);


console.log(colors.green(`Bot engine completed with `) + colors.cyan(startTime));
console.log(colors.gray(`Logged in to  ${client.user.tag} / ${client.user.id}`))



//starting random status
require('./status.js').status(client);


}










module.exports = {start}