const modification = require('../modification');
var Messages = [];

module.exports = new modification({
    name: 'Example Module',
    author: 'Author',
    description: 'Does some cool stuff!',
    version: '1.0a',

    load: new function(){
        window.PatchMethod(window.findModule('sendMessage'), 'receiveMessage', function (b) {
            const input = arguments[0].methodArguments[1];

          
            const newArgs = input;
            newArgs.content = input.content;
            arguments[0].callOriginalMethod(arguments[0].methodArguments[0], newArgs);
    
            
             
         
        });
    }
});