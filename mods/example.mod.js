const modification = require('../modification');
const request = require('request');

module.exports = new modification({
    name: 'Example Module',
    author: 'Author',
    description: 'Does some cool stuff!',
    version: '1.0a',

    load: new function(){
       //do stuff on load
    }
});