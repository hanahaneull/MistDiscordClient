const modification = require('../modification')
const request = require('request');
module.exports = new modification ({
    name: 'Quicc Embed',
    author: 'Yaekith',
    description: "Gives you the power to send embeds at the press of a button, how cool is that?",
    version: '1.0b',
    load: new function(){
        setInterval(() => AddQuickEmbedButton(), 10);
        
    }
});

function AddQuickEmbedButton() 
{
    if (document.getElementsByClassName("buttons-3JBrkn").length > 0)
    {
        if (!document.getElementById('quickEmbed'))
        {
            var holster = document.getElementsByClassName("buttons-3JBrkn")[0];

            holster.appendChild(window.MistUtils.InjectHTML(`<div class="iconWrapper-2OrFZ1 clickable-3rdHwn" id="quickEmbed" style="top: 9.5px;"><svg class="icon-22AiRD" viewBox="0 0 24 24" version="1.1" width="24" height="24" aria-hidden="false"><path fill="#7F8186" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"></path></svg></div>`))
    
            var button = document.getElementById('quickEmbed');

            button.addEventListener("mouseover", () => {
                button.children[0].children[0].setAttribute("fill", "#ffffff");
            });

            button.addEventListener("mouseleave", () => {
                button.children[0].children[0].setAttribute("fill", "#7F8186");
            });

            button.addEventListener("click", () => {
                MakeQuickEmbed();
            });
        }
    }
}

function MakeQuickEmbed() 
{
    var Title;
    var Description;
    var Color = "blue";
    var Img;
    window.ShowBox("Quick Embed", "Time for some black magic", "Enter a title", () => {

        Title = window.TextValue;
        
        window.TextValue = ""; 

        window.ShowBox("Quick Embed", "Time for some black magic", "Enter a description", () => {
            Description = window.TextValue;
            window.TextValue = ""; 

            window.ShowBox("Quick Embed", "Time for some black magic", "Enter an imageURL (Leave blank for none)", () => {
               if (window.TextValue != "")
               {
                   Img = window.TextValue;

                   window.TextValue = "";
               }

               window.ShowBox("Quick Embed", "Time for some black magic", "Enter a color (Leave blank for default 'blue')", () => {
                if (window.TextValue != "")
                {
                    Color = window.TextValue;
 
                    window.TextValue = "";
                }

                 
                sendEmbed(Title, Description, Color, Img);
             });
            });
        });
    });
}
function sendEmbed(title, text, color, img) {
    var Color2 = parseColor(color);
	var channelID = window.location.pathname.split('/').pop();
	var embed = {
		type : "rich",
        description : text,
	};

	if (color) {
		embed.color = Color2;
	}

	if (title) {
		embed.title = title;
    }
    
    if (img != undefined)
    {
        embed.image = {
            'url' : img
        }
    }
	
	var data = JSON.stringify({embed : embed});
	
	request.post(`https://discordapp.com/api/channels/${channelID}/messages`, {
        headers: {
            'Authorization' : window.getUserToken(),
            'Content-Type' : 'application/json'
        },
        body: data
    }, (err, res, body) => { 

    });
}

function parseColor(Color)
{
    switch(makeLowerCase(Color))
    {
        default:
            return "1266338";
        case "blue":
            return "1266338";
        case "red":
            return "13632027";
        case "green":
            return "5880085";
        case "yellow":
            return "16312092";
        case "cyan":
           return "5301186";
        case "white":
            return "16777215";
        case "black":
            return "1";
    }
}

function makeLowerCase(value) {
    return value.toString().toLowerCase();
  }