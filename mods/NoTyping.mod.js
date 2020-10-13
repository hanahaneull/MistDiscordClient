const modification = require('../modification');

module.exports = new modification({
    name: 'NoTyping',
    author: 'Yaekith',
    description: 'Does some cool stuff!',
    version: '1.0a',

    load: new function(){
	setTimeout(() => {
		        window.PatchMethod(window.findModule('startTyping'), 'startTyping', function () {
            
			console.warn('Blocked Typing.');
        });
	}, 5000);
    }
});