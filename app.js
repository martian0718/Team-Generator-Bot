const Discord = require("discord.js");

const client = new Discord.Client();

const {
    token
} = require("./token.json");

function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max));
}

var namesArray = [];
var team1 = {people: []};
var team2 = {people: []};

function displayTeam(team){
    var teamString = "";
    for(var i = 0; i < team.people.length; i++)
        teamString += team.people[i] + "  ";
    return teamString;
}

function makeTeam(team1, team2, namesArray){
    let size = namesArray.length;
    let teamsSplit;
    if(size < 2) {
        teamSplit = false;
    } else if(size % 2 === 0){ //if there are an even amount of people
        teamsSplit = true;
        do {
            //clear team1 && team2 when redoing teams 
            team1.people = [];
            team2.people = [];
            let index1 = 0;
            let index2 = 0; 
            //keep rearranging teams
            for(let i = 0; i < namesArray.length; i++){
                if(getRandomInt(2) === 0)
                    team1.people[index1++] = namesArray[i];
                else
                    team2.people[index2++] = namesArray[i];
            }
        } while (team1.people.length != size/2 || team2.people.length != size/2);
           
    } else { //if there are an odd amount of people 
        teamsSplit = true;
        do {
            //clear team1 && team2 when redoing teams 
            team1.people = [];
            team2.people = [];
            let index1 = 0;
            let index2 = 0; 
            //keep rearranging teams 
            for(let i = 0; i < namesArray.length; i++){
                if(getRandomInt(2) === 0)
                    team1.people[index1++] = namesArray[i];
                else 
                    team2.people[index2++] = namesArray[i];
            }
        } while (!(team1.people.length === Math.floor(size/2) || team2.people.length === Math.floor(size/2)));
            
    }
    return teamsSplit;
}


const stringArray = ["ready", "reconnecting", "disconnect", "message"];

//==========================Status=========================
client.on(stringArray[0], () => {
    console.log(`logged in as ${client.user.tag}`);
    client.user.setActivity("with Holden");
});

client.on(stringArray[1], () => {
    console.log(`This bot is reconnecting: ${client.user.tag}`);
});

client.on(stringArray[2], () => {
    console.log(`This bot is now disconnected: ${client.user.tag}`);
});
//=====================End of Status===========================



client.on(stringArray[3], msg => {
    var toLower = msg.content.toLowerCase();

    if(toLower === "-hello")
        msg.reply("Howdy!");
    else if(toLower === "-bye")
        msg.reply("You will never get rid of me. 😈");
    else if(toLower === "-help"){
        msg.reply("hello, bye, and split are the current commands. Include a '-' before every command.\n"
                + "hello:   Responds by saying hi back\n"
                + "bye:     Responds by saying it won't leave 😱\n"
                + "split:   Splits up a group of people randomly that you list into two different teams.After you type in the command put a space between each person's name when listing them.");
    } else if(toLower.includes("-split")){
        msg.react('💪');
        toLower = toLower.substring(7);
        namesArray = toLower.split(" ");
        if(makeTeam(team1,team2,namesArray)){
            msg.reply("\nTeam One:  " + displayTeam(team1));
            msg.reply("\nTeam Two:  " + displayTeam(team2));
        } else {
            msg.reply("😑You don't need me to split up teams.");
        }
      
    } else if(toLower === "-reshuffle") {
        if(team1.people.length==0 || team2.people.length==0)
            msg.reply("Nothing to shuffle...");
        else {
            if(makeTeam(team1,team2,namesArray)){
                msg.react('✊');
                msg.reply("\nTeam One:  " + displayTeam(team1));
                msg.reply("\nTeam Two:  " + displayTeam(team2));
            } else {
                msg.reply("😑You don't need me to split up teams.");
            }
        }    
    } else if((toLower.includes("who") || toLower.includes("what") || toLower.includes("why")) && toLower.includes("holden")) {
        msg.react('😂');
        msg.reply("Holden deez nuts! Gottem! Team Generator: 1" + "   " + msg.author.username + ": 0");
        
    }
});


client.login(token);
