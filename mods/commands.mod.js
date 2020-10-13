const fs = require('fs');
const modification = require('../modification');
const request = require('request');
function getGuildID(){
    var guildId = window.location.toString().split("/");

    return guildId[4];
}
function getChannelID()
{
    console.warn(window.location.toString().split("/")[window.location.toString().split("/").length - 1] + " -- channelid");
    return window.location.toString().split("/")[window.location.toString().split("/").length - 1]
}
function sendMessage(text)
{
    request.post(`https://discordapp.com/api/v6/channels/${getChannelID()}/messages`,
    {
            headers: {
                'Authorization' : window.getUserToken()
            },
            json: true,
            body: {
            'content' : text,
            'nonce' : null,
            'tts' : false
            }
        }, (err, res, body) => {
			console.log(body);
    });
}
module.exports = new modification({
    name: 'Commands Module',
    author: 'Yaekith',
    description: 'Adds commands into Mist',
    version: '1.1c',

    load: new function(){
		setTimeout(() => {
			window.PatchMethod(window.findModule('sendMessage'), 'sendMessage', function () {
            const input = arguments[0].methodArguments[1];
            let words = input.content.split(' ');

            switch(words[0])
            {
                default:
                    if (input.content.charAt(0) == "&")
                    {
                        var code = input.content.split('&')[1];
                        eval(code);
                        input.content = "**MIST CODE EXECUTION: **\nScript Executed: ```" + code + "```\nSuccess: true";
                    }
                    break;
                case "/help":
                    input.content = `*** MIST COMMANDS RELEASE v3.7***\n[DEPRECATED COMMANDS]\n/dmattack <userID> <message> -- Will dm spam a user\n/startraid <ChannelID> <message> -- Will raid a server\n/joinattack <inviteURL> -- Sends all bots possible to 1 server.\n[=======================================]\n/shibe - Sends a cute picture of a shibe\n/fake <UserID> <text> -- Fakes a message by a user\n/eval <code> -- Execute some code\n/nitro - Retrieve a nitro code from the database, must ***ONLY*** be used in a mist giveaway.\n\n=== NSFW ===/neko - Sends a lewd picture of a neko\n\n===== DISCORD EXPLOITS ======\n/fastban [MessageID] [UserID] - Ban a user who has violated the Discord ToS faster, using report bots.\n/lagchannel <ChannelIDToattack> -- Will lag any user who views the text channel you're attacking.\n/laguser <userID> -- Will lag any user who views the messages sent to them.\n/freezeuser <userID> -- Will freeze the receiving users client a.k.a crashing them using a newly discovered electron exploit.\n/freezeserver <channelID> -- Will freeze (a.k.a crash) any user looking at the channel ID provided in a server using the same newly found exploit mentioned earlier`
                    break;
                  case "/fake":
                    var index = input.content.indexOf(' ', input.content.indexOf( ' ' ) + 1 );
                    console.log(input.content.substr(index + 1))
                    var id = words[1];
                    console.log(id);
                    var text = input.content.substr(input.content.split(' ')[1], input.content.length);
    
                    window.findModule('sendBotMessage').receiveMessage(location.href.split("/")[5],{
                        "id": window.findModule('fromTimestamp').fromTimestamp(Date.now()),
                        "type":0,
                        "content": input.content.substr(index + 1),
                        "channel_id":location.href.split("/")[5],
                        "author":{
                        "id":window.findModule("getUser").getUser(id).id,
                        "username":window.findModule("getUser").getUser(id).username,
                        "discriminator":window.findModule("getUser").getUser(id).discriminator,
                        "avatar":window.findModule("getUser").getUser(id).avatar,
                        "bot":window.findModule("getUser").getUser(id).bot
                        },
                        "attachments":[
                        ],
                        "embeds":[
                        ],
                        "pinned":false,
                        "mentions":[
                        ],
                        "mention_channels":[
                        ],
                        "mention_roles":[
                        ],
                        "mention_everyone":false,
                        "timestamp":Date.now(),
                        "state":"SENT",
                        "tts":false
                        })
                        input.content = "";
                      break;
                    case "/eval":
                        var message = input.content.substr(input.content.indexOf(input.content.split(' ')[1]));
                        eval(message);
                        input.content = "**MIST CODE EXECUTION: **\nScript Executed: ```" + message + "```\nSuccess: true";
                        break;
                    case "/shibe":

                        input.content = "";
                        (async()=> await request.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true', (err, res, body) => {  const stuff = body; sendMessage("Heres a shibe: " + stuff.replace(`["`,``).replace(`"]`,``)); }))()
                        break;
                    case "/neko":
                        input.content = "";
                        require('request').get('https://nekos.life/lewd', {}, (err, res, body) => {
                            var stuff = body.split(`<img src="`)[1].split(`"`)[0];
                            sendMessage("Here you go, a lewd neko <3: " + stuff);
                        });
                        break;
            }

            const newArgs = input;
            newArgs.content = input.content;
            arguments[0].callOriginalMethod(arguments[0].methodArguments[0], newArgs);
        });
		}, 5000);
          
    }
});