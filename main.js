"use strict";
class GlobalSettings{
    #arrayOfSettings
    get NonArrayFirstIndex(){
        return this.#arrayOfSettings[0];
    }
    constructor(newSettings){
        this.#arrayOfSettings = newSettings;
    }
}
let myGlobalSettings = new GlobalSettings([1]);
class Group {
    constructor(id, groupName) {
        this.id = id;
        this.groupName = groupName;
        this.tags = [];
        this.items = [];
    }
}

class IdGenerator {
    constructor() {
        this.id = 0;
        this.generate = function () {
            this.id += 1;
            return this.id;
        };
    }
}


class TagController {
    #lastBookIndex;
    #lastSwifted;
    get LastBookIndex(){
        return this.#lastBookIndex;
    }
    get LastSwifted(){
        return this.#lastSwifted;
    }
    constructor() {
        this.#lastBookIndex = myGlobalSettings.NonArrayFirstIndex;
        this.#lastSwifted = 0;
        this.tagBooks = new Map();
        this.tagsPage = new Map();
        this.tagBooks.set(this.#lastBookIndex, this.tagsPage);
    }
    #TagIdGenerate(){
        let newId = 1<<this.#lastSwifted;
        this.#lastSwifted +=1;
        if(this.#lastSwifted>=31){
            this.#lastSwifted = 0;
            this.#lastBookIndex +=1;
            this.tagsPage = new Map();
            this.tagBooks.set(this.#lastBookIndex,this.tagsPage);
        }
        return [this.LastBookIndex,newId];
    }
    
    Create(name) {
        let nextId = this.#TagIdGenerate();
        console.log(nextId);
        while (this.tagsPage.has(nextId)) {
            alert(`tagsMap has ${nextId}!`);
            // nextId = this.#TagIdGenerateTagIdGenerate();
        }
        this.tagsPage.set(nextId, name);
        return nextId;
    }
}

class ItemController{
    #currentItemId;
    #currentItemBookIndex;
    itemsBook;
    itemsPage;
    constructor(){
        // {itemid : itemname}
        this.itemsBook = new Map();
        this.itemsPage = new Map();
        this.#currentItemBookIndex = myGlobalSettings.NonArrayFirstIndex;
        this.itemsBook.set(this.#currentItemBookIndex,this.itemsPage);
        this.#currentItemId = myGlobalSettings.NonArrayFirstIndex;
    }
    #ItemIdGenerate(){
        let newId = this.#currentItemId+1;
        if(newId>Number.MAX_SAFE_INTEGER){
            this.#currentItemBookIndex +=1;
            this.#currentItemId = myGlobalSettings.NonArrayFirstIndex;
        }
    }
}

class GroupController {
    constructor() {
        this.groupsMap = new Map();
        this.groupIdGenerator = new IdGenerator();
    }
    generate(name) {
        let nextId = this.groupIdGenerator.generate();
        while (this.groupsMap.has(nextId)) {
            alert(`groupsMap has ${nextId}!`);
            nextId = this.groupIdGenerator.generate();
        }
        let tempgroup = new Group(nextId, name);
        this.groupsMap.set(nextId, tempgroup);
        return tempgroup;
    }
}
let tagControler = new TagController();
let fish = tagControler.Create("fish");
let pork = tagControler.Create("pork");
// console.log(tagControler.tagBooks);
// console.log(JSON.stringify(tagControler.tagBooks));

let groupControler = new GroupController();
let fg = groupControler.generate("fishGroup");
fg.tags.push(fish)
let pg = groupControler.generate("porkGroup");
pg.tags.push(pork)

// let md = new Tag(tidg.generate(), "maindish")
// let mdg = new Group(gidg.generate(), "mainDishGroup")
// mdg.tags.push(md)
// mdg.items.push(fg, pg)
//jsontest1
//var a = document.createElement("div");a.innerHTML = JSON.stringify(mdg);document.body.appendChild(a)