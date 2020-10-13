const modification = require('../modification')
var LastReadMessages = [];
var LastIndex = 0;
module.exports = new modification({
    name: 'LastRead',
    author: 'Yaekith & Saiy',
    description: 'Tells you when a user has last read your message.',
    version: '1.0a',
    load: new function(){

        setInterval(() => {
            if (window.location.href.includes('https://discordapp.com/channels/@me/'))
            {
                if (LastReadMessages.length > 0)
                {
                    for(var x = 0; x < LastReadMessages.length; x++)
                    {
                        var lastread = LastReadMessages[x];
                        RenderLastRead(lastread);
                        console.log(lastread);
                    }
                }

                //Found dm channel

                if (document.getElementsByClassName('typing-2GQL18').length > 0)
                {
                    var who = undefined;
                    for(var i = 0; i < document.getElementsByClassName('username-_4ZSMR').length; i++)
                    {
                       var userelem = document.getElementsByClassName('username-_4ZSMR')[i];

                       if (userelem.innerHTML != GetCurrentUsername())
                       {
                           who = userelem.innerHTML;
                       }
                    }
                    for(var j = 0; j < document.getElementsByClassName("messageCozy-2JPAPA message-1PNnaP").length; j++)
                    {
                        var msg = document.getElementsByClassName("messageCozy-2JPAPA message-1PNnaP")[j];
                        var usercheck = msg.getElementsByClassName('username-_4ZSMR')[0].innerHTML;
                        var lastRead = msg.getElementsByClassName('timestampCozy-2hLAPV')[0];

                        if (usercheck == GetCurrentUsername())
                        {
                            var d = new Date();
                            var n = d.getHours();
                            var z = d.getMinutes();
                            if (!lastRead.innerHTML.includes('Last Read @'))
                            {
                                lastRead.innerHTML = `${lastRead.innerHTML} || Last Read @ ${n}:${z} by ${who}`
                                LastIndex++;
                                LastReadMessages[LastIndex] = new LastRead(GetCurrentUsername(), `${n}:${z}`, 'Not needed', who);
                            }
                        }
                    }

                }
            }
        }, 500);
    }
})
function RenderLastRead(lastx)
{
    console.log(lastx);
    for(var j = 0; j < document.getElementsByClassName("contentCozy-3XX413 content-3dzVd8").length; j++)
                    {
                        var msg = document.getElementsByClassName("contentCozy-3XX413 content-3dzVd8")[j];
                        var usercheck = msg.getElementsByClassName('username-_4ZSMR')[0].innerHTML;
                        var lastRead = msg.getElementsByClassName('timestampCozy-2hLAPV')[0];

                        if (usercheck == GetCurrentUsername())
                        {

                            if (!lastRead.innerHTML.includes('Last Read @'))
                            {
                                lastRead.innerHTML = `${lastRead.innerHTML} || Last Read @ ${last.getLastRead()} by ${last.getWhoRead()}`
                            }
                        }
    }

}
function GetCurrentUsername(){
    return "test";
}

class LastRead {
    constructor (author, lastReadTime, msgText, WhoRead)
    {

        this.Author = author;
        this.LastReadTime = lastReadTime;
        this.msgText = msgText;
        this.WhoRead = WhoRead;
    }

    getLastRead(){
        return this.LastReadTime;
    }

    getWhoRead(){
        return this.WhoRead;
    }
}