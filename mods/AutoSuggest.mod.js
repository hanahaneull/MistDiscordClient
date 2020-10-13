const modification = require('../modification');

module.exports = new modification({
    name: 'Autosuggest',
    author: 'Yaekith',
    description: 'Auto-suggests mist commands to you for easier usage',
    version: '1.0a',

    load: new function(){
       //do stuff on load
       setInterval(() => {
        if (document.getElementsByClassName('autocomplete-1vrmpx autocomplete-Z9HwQh').length > 0)
        {
            
            addCommand("help", "Get a list of commands for Mist!");
            addCommand("shibe", "Send a cute picture of a shibe");
            addCommand("fake", "Fakes a message sent by a user");
            addCommand("disable", "Disable a user (INACTIVE)");
        }
        }, 500);
    }
});

function addCommand(Name, Description)
{
    var element = document.getElementsByClassName("autocompleteInner-zh20B_")[0];

    if (document.getElementById(Name) == undefined)
    {
        var injection = window.MistUtils.InjectHTML(`<div tabindex="0" class="autocompleteRowVertical-q1K4ky autocompleteRow-2OthDa" role="button"><div onmouseover="this.className = 'selectorSelected-1_M1WV selector-2IcQBU selectable-3dP3y-';" onmouseleave=" this.className = 'selector-2IcQBU selectable-3dP3y-';"; "class="selector-2IcQBU selectable-3dP3y-" id='Selector-${Name}'><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 content-Qb0rXO" style="flex: 1 1 auto;"><svg class="icon-3ZzoN7" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fill-rule="evenodd"><rect width="16" height="16"></rect><polygon class="iconForeground-1w5n7R" fill="currentColor" points="12 2.32 10.513 2 4 13.68 5.487 14"></polygon></g></svg><div class="marginLeft4-3VaXdt" style="flex: 1 1 auto;" id="${Name}">${Name}</div><div class="description-11DmNu">${Description}</div></div></div></div>`)

        var element2 = document.getElementById(Name);


        element.appendChild(injection);

        element2.addEventListener("click", () => {
            
        });
    }
}