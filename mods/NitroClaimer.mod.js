const modification = require('../modification');
var InvalidLinks = [];

module.exports = new modification({
    name: 'Nitro Claimer',
    author: 'Yaekith & Saiy',
    description: 'Auto claims Nitro Gift Links',
    version: '1.3.3.7',

    load: new function(){
        let repeated = [];
		setTimeout(() => {
		window.PatchMethod(window.findModule('sendMessage'), 'receiveMessage', function (b) {
            let code;
            const message = arguments[0].methodArguments[1];
            if (message.content.startsWith("discord.gift")) {
                console.error('Found Nitro Code! Redeeming');
                code = message.content.split("discord.gift/").pop();
                code = code.replace(/\s+/g," ");
                code = code.split(' ')[0];
                if (repeated.includes(code)) {
                    console.warn(`${code} - Already attempted`);
                }
                else {
                    window.findModule('openNativeGiftCodeModal').redeemGiftCode(code);
                    repeated.push(code);
                }
            }
            else if (message.content.startsWith("discordapp.com/gift/")) {
                console.error('Found Nitro Code! Redeeming');
                code = message.content.split("discordapp.com/gift/").pop();
                code = code.replace(/\s+/g," ");
                code = code.split(' ')[0];
                if (repeated.includes(code)) {
                    console.warn(`${code} - Already attempted`);
                }
                else {
                    window.findModule('openNativeGiftCodeModal').redeemGiftCode(code);
                    repeated.push(code);
                }
            }

            const newArgs = message;
            newArgs.content = message.content;
            arguments[0].callOriginalMethod(arguments[0].methodArguments[0], newArgs); 
        });
		}, 5000);
        
    }
}); 

function isInArray(array, search)
{
    return array.indexOf(search) >= 0;
}