const Discord = require("discord.js");

const client = new Discord.Client();

const {
    token
} = require("./token.json");

function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max));
}

function displayTeam(team){
    var teamString = "";
    for(var i = 0; i < team.length; i++)
        teamString += team[i] + "  ";
    return teamString;
}


const stringArray = ["ready", "reconnecting", "disconnect", "message"];
var namesArray = [];
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
        var size = namesArray.length;
        var teamsSplit = false;
        if(size < 2) {
            msg.reply("😑You don't need me to split up teams.");
        } else if(size % 2 === 0){ //if there are an even amount of people
            teamsSplit = true;
            do {
                //clear team1 && team2 when redoing teams 
                var team1 = [];
                var team2 = [];
                var index1 = 0;
                var index2 = 0; 
                //keep rearranging teams
                for(var i = 0; i < namesArray.length; i++){
                    if(getRandomInt(2) === 0)
                        team1[index1++] = namesArray[i];
                    else
                        team2[index2++] = namesArray[i];
                }
            } while (team1.length != size/2 || team2.length != size/2);
           
        } else { //if there are an odd amount of people 
            teamsSplit = true;
            do {
                //clear team1 && team2 when redoing teams 
                var team1 = [];
                var team2 = [];
                var index1 = 0;
                var index2 = 0; 
                //keep rearranging teams 
                for(var i = 0; i < namesArray.length; i++){
                    if(getRandomInt(2) === 0)
                        team1[index1++] = namesArray[i];
                    else 
                        team2[index2++] = namesArray[i];
                }
            } while (!(team1.length === Math.floor(size/2) || team2.length === Math.floor(size/2)));
            
        }

        if(teamsSplit) {
            msg.reply("\nTeam One:  " + displayTeam(team1));
            msg.reply("\nTeam Two:  " + displayTeam(team2));
        }
        
      
    }
});
client.login(token);
