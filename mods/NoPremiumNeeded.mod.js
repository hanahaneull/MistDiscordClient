const modification = require('../modification');

module.exports = new modification({
    name: 'NoPremiumNeeded',
    author: 'Yaekith',
    description: 'Does some cool stuff!',
    version: '1.0a',

    load: new function(){
       setInterval(() => {
		   if (window.findModule('getActiveSocketAndDevice') != undefined)
		   {
			   if (!window.findModule('getActiveSocketAndDevice').getActiveSocketAndDevice().socket.isPremium)
			   {
				   window.findModule('getActiveSocketAndDevice').getActiveSocketAndDevice().socket.isPremium = true;
				   console.log('Patched Spotify Premium')
			   }
		   }
        
       }, 500);
    }
});