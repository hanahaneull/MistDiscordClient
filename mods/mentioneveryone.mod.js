const modification = require('../modification')
const request = require('request');

module.exports = new modification ({
    name: 'Mention Everyone',
    author: 'Yaekith',
    description: 'Mentions everyone in a discord despite the Guild having the feature itself, disabled.',
    version: '1.0a',
    load: new function(){
        
		 setInterval(() => {
             
            if (document.getElementsByClassName("buttons-3JBrkn").length > 0)
            {
                var element = document.getElementById('mentioneveryonelol');

                if (element == undefined)
                {
                    addMenuButton();
                }
            }
    }, 300);
    }
});


function addMenuButton(){
	
    var elems = document.getElementsByClassName('buttons-3JBrkn'); //Button holder
    
    var buttonDiv = document.createElement('div')
    buttonDiv.className = 'buttonContainer-21MN7J'; //Outside div for emoji
    buttonDiv.id = 'mentioneveryonelol';
    var buttonElem = document.createElement('button')
    buttonElem.className = 'buttonWrapper-1ZmCpA button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN'
    buttonElem.style = 'width:30px;height:50px;top:-2px'
    buttonDiv.appendChild(buttonElem);

    var secondLastDiv = document.createElement('div');
    secondLastDiv.className = 'contents-18-Yxp button-3AYNKb button-2vd_v_';
    secondLastDiv.style = 'position:absolute;left:-140px;'

    let svgLogo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgLogo.setAttribute("class", "icon-22AiRD");
    svgLogo.setAttribute("viewBox", "0 0 24 24");
    svgLogo.setAttribute("version", "1.1");
    svgLogo.setAttribute("width", "24");
    svgLogo.setAttribute("height", "24");
    svgLogo.setAttribute("aria-hidden", "false");

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "#7F8186");
    path.addEventListener("mouseover", function() {
        path.setAttribute("fill", "#ffffff");
    });
    path.addEventListener("mouseleave", function () {
        path.setAttribute("fill", "#7F8186");
    });
    path.addEventListener("click", function () {
        tryMentionEveryone();
    });
    path.setAttribute("d",
    "M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z");
    svgLogo.appendChild(path);

    buttonElem.appendChild(svgLogo);
    buttonDiv.appendChild(secondLastDiv);
    elems[0].appendChild(buttonDiv);
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
function MentionEveryone(){
    request.get(`https://discordapp.com/api/v6/guilds/${getGuildID()}/members?limit=1000`, 
    {
        headers: {
            'Authorization' : window.getUserToken()
        }
    }, (err, res, body) => {
        var json = JSON.parse(body);
        var mentionTexts = [];
        var index = 0;
        for(var i = 0; i < json.length; i++)
        {
            mentionTexts[index] += `<@${json[i].user["id"]}>`;
            var countOfMentions = mentionTexts[index].split('>');
            if (countOfMentions.length > 91)
            {
               index++;
               
            }

        }

         for(var j = 0; j < mentionTexts.length; j++)
         {
             var before = mentionTexts[j].split('undefined')[0];
             var after = mentionTexts[j].split('undefined')[1];

             mentionTexts[j] = before + after;
     
             sendMessage(mentionTexts[j]);
         }
    });
}

function sendMessage(text){
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
        console.error("Response Message: " + body);
    });
}

function tryMentionEveryone(){
    request.get(`https://discordapp.com/api/v6/channels/${getChannelID()}`,
    {
        headers: {
        'Authorization': window.getUserToken()
      }
    }, (err, res, body) => {
        var obj = JSON.parse(body);
        switch(obj.type)
        {
            case 0:
                MentionEveryone();
                break;
            case 1:
                window.DrawingAPI.alert('Mention Everyone', 'Why would you want to fucking mention in a dm channel xD')
            break;
            case 2:
               window.DrawingAPI.alert('Mention Everyone', 'How would you even send messages in a fucking voice channel xDDD')
            break;
            case 3:
                 MentionEveryone();
            break;
            case 4:
                window.DrawingAPI.alert('Mention Everyone', "You're a wizard harry, you learnt how to somehow type in category channels");
            break;
            case 5:
                window.DrawingAPI.alert('Mention Everyone', "If you truly do have access to a NEWS channel, you should be able @everyone");
            break;
            case 6:
                window.DrawingAPI.alert('Mention Everyone', 'How can you even fucking type in here?');
            break;
        }
    });
}