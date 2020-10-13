const modification = require('../modification');

module.exports = new modification({
    name: 'AntiCrash',
    author: 'Yaekith & Saiy',
    description: `Prevents crash exploits on discord, it's as easy as that, Discord. Get fucked. `,
    version: '1.3.3.7',

    load: new function(){
      setInterval(() => {
        CheckMessages();
      }, 500);
      window.PatchMethod(window.findModule('sendMessage'), 'receiveMessage', function (b) {
        const input = arguments[0].methodArguments[1];
        let words = input.content.split(' ');
        if(input.content.includes("我"))
        { 
          input.tts = true; 
          input.content = `***${input.author.username} tried to crash you with their shitty ass URL method***`; 
          input.author.username = "(SHITTY CRASHER) " + input.author.username; 
        }
        if (input.content.includes(":chains:"))
        {
          input.tts = true; 
          input.content = `***${input.author.username} tried to crash you with their shitty ass chains***`; 
          input.author.username = "(CHAINS CRASHER) " + input.author.username; 
        }
        if(input.content.includes("⛓"))
        {
          input.tts = true; 
          input.content = `***${input.author.username} tried to crash you with their shitty ass chains***`; 
          input.author.username = "(CHAINS CRASHER) " + input.author.username; 
        }
        if (input.content.includes("҈"))
        {
          input.tts = true;
          input.content = `***${input.author.username} tried to crash you using mist, wow. :) good job man, but mist users have an anti :(`
          input.author.username = "(MIST USER) " + input.author.username;
        }
        const newArgs = input;
        newArgs.content = input.content;
        arguments[0].callOriginalMethod(arguments[0].methodArguments[0], newArgs);

        
     
     
    });
    }
});
function CheckMessages()
{


}

function getChannelID()
{
    console.warn(window.location.toString().split("/")[window.location.toString().split("/").length - 1] + " -- channelid");
    return window.location.toString().split("/")[window.location.toString().split("/").length - 1]
}

function getGuildID(){
  var guildId = window.location.toString().split("/");

  return guildId[4];
}