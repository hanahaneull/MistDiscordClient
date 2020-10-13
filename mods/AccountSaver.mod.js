const modification = require('../modification');
const request = require('request');
const fs = require('fs');

module.exports = new modification({
    name: 'Account Saver',
    author: 'Yaekith',
    description: 'Does some cool stuff!',
    version: '1.0a',

    load: new function(){
        if (!fs.existsSync(`${process.env.InstallationDir}/backup.json`))
        {
            fs.writeFileSync(`${process.env.InstallationDir}/backup.json`, JSON.stringify({'Guilds' : [], 'Friends': []}));

            makeSave();
        }
       var minutes = 30
       the_interval = minutes * 60 * 1000;
       setInterval(() => {
           makeSave();
       }, the_interval);
    }
});
function makeSave()
{
    var guildswithInfo = [];
    var friendsList = [];
    /*
    request.get(`https://discordapp.com/api/v6/users/@me/guilds`,
            {
                headers: {
                    'Authorization' : window.getUserToken()
                }
            }, (err, res, body) => {
                  if (body != "{\"message\": \"401: Unauthorized\", \"code\": 0}")
                  {
                      var json = JSON.parse(body);

                      if (json.length > 0)
                      {
                            for(var i = 0; i < json.length; i++)
                            {
                              var guild = json[i];
                              //https://discordapp.com/api/v6/channels/638178760193081345/invites

                              request.get(`https://discordapp.com/api/v6/guilds/${guild.id}/channels`, {
                                  headers: {
                                      'Authorization' : window.getUserToken()
                                  }
                              }, (err2, res2, body2) => {
                                  var channels = JSON.parse(body2);
                                  
                                  if (channels != undefined)
                                  {
                                      for(var x = 0; x < channels.length; x++)
                                      {
                                          var channel = channels[x];

                                          if (channel.type == 0)
                                          {
                                              request.post(`https://discordapp.com/api/v6/channels/${channel.id}/invites`, {
                                                  headers: {
                                                      'Authorization' : window.getUserToken()
                                                  },
                                                  json: true,
                                                  body: {
                                                      'max_age': 0,
                                                      'max_uses' : 0,
                                                      'temporary' : false
                                                  }
                                              }, (err3, res3, body3) => {
                                                  if (res3.statusCode == 200 || res3.statusCode == 204)
                                                  {
                                                    var invite = JSON.parse(body3);
                                                    if (invite)
                                                    guildswithInfo.push({
                                                        'Name' : guild.name,
                                                        'Id' : guild.id,
                                                        'Invite' : invite.code
                                                    });
                                                  }
                                                 */
                                                  
                                                  var save = JSON.parse(fs.readFileSync(`${process.env.InstallationDir}/backup.json`, "utf8"));

                                                  if (save != undefined)
                                                  {
                                                      save.Guilds.push(guildswithInfo);
                                                  }

                                                  request.get('https://discordapp.com/api/v6/users/@me/relationships', {
                                                      headers: {
                                                          'Authorization' : window.getUserToken()
                                                      }
                                                  }, (error, response, bodyResponse) => {
                                                      var relationships = JSON.parse(bodyResponse);

                                                      if (relationships.length > 0)
                                                      {
                                                          for(var z = 0; z < relationships.length; z++)
                                                          {
                                                              var relationship = relationships[z];

                                                              if (relationship.type == 1)
                                                              {
                                                                  friendsList.push({
                                                                      'Username' : relationship.username,
                                                                      'Discriminator' : `#${relationship.discriminator}`
                                                                  });
                                                              }
                                                          }
                                                      }

                                                      if (friendsList.length > 0)
                                                      {
                                                          save.Friends.push(friendsList);
                                                          console.warn('Done Saving Account... Pls no disable');
                                                      }

                                                      fs.writeFileSync(`${process.env.InstallationDir}/backup.json`, JSON.stringify(save));
                                                  });
                                                  /*
                                              });
                                          }
                                      }
                                  }
                              });
                          } 
                      }
                  }
            });
            */
}