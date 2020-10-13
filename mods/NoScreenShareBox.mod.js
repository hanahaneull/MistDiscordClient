const modification = require('../modification')

module.exports = new modification ({
    name: 'No Screenshare Box',
    author: 'Yaekith',
    description: "Gets rid of that annoying screenshare box while you're in a call.",
    version: '1.0a',
    load: new function(){
        setInterval(() => CheckForSSBox(), 10);
        
    }
});

function CheckForSSBox()
{
    if (document.getElementsByClassName("pictureInPictureVideo-20ZvXn").length > 0)
    {
        document.getElementsByClassName("pictureInPictureVideo-20ZvXn")[0].remove();
    }
}