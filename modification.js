class modification {
    constructor(name, author, description, version)
    {
        this.name = name;
        this.author = author;
        this.description = description;
        this.version = version;
    }

    load() {
        
    }

    unload(){

    }
    
    onRightClickServer(){

    }
    onRightClickUser(){
        
    }
    onGuildSelected(){

    }
    onFriendsTab(){

    }
    reload(){
         this.unload();
        delete require.cache[require.resolve(`./mods/${this.id}.mod.js`)];
        const newPlugin = require(`./mods/${this.id}.mod.js`);
        window.MC.modifs[this.id] = newPlugin;
        newPlugin.id = this.id;
        newPlugin.load(); 
    }
    
}

module.exports = modification;
