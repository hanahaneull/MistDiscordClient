const modification = require('../modification');
const request = require('request');

module.exports = new modification({
    name: 'Gimme the fucking nitro perks pls',
    author: 'Saiy and Yaekith',
    description: 'Does some cool stuff!',
    version: '1.0a',

    load: new function(){
       
        
        setInterval(() => {
            if (findModule('getUser').getCurrentUser().premiumType != 2)
            {
                findModule('getUser').getCurrentUser().premiumType = 2;
                window.DrawingAPI.alert('Nitro Spoofer', 'Successfully Spoofed you to nitro!');
            }
        }, 500);
    }
});