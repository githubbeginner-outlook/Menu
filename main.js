class Tag {
    constructor(id, tagName) {
        this.id = id;
        this.tagName = tagName;
    }
}

class Group {
    constructor(id, groupName) {
        this.id = id;
        this.groupName = groupName;
        this.tags = [];
        this.items = [];
    }
}

class IdGenerator {
    constructor(lastId) {
        this.id = lastId;
        this.generate = function () {
            lastId += 1;
            return lastId;
        };
    }
}

class TagGenerator{
    constructor(lastId) {
    this.tagsMap = new Map();
    this.tagIdGenerator = new IdGenerator(lastId);
    }
    generate(name){
        let nextId = this.tagIdGenerator.generate();
        while(this.tagsMap.has(nextId)){
            alert(`tagsMap has ${nextId}!`);
            nextId = this.tagIdGenerator.generate();
        }
        let tempTag = new Tag(nextId,name);
        this.tagsMap.set(nextId,tempTag);
        return tempTag;
    }
}

var tidg = new IdGenerator(0)
var fish = new Tag(tidg.generate(), "fish")
var pork = new Tag(tidg.generate(), "pork")
var gidg = new IdGenerator(0)
var fg = new Group(gidg.generate(), "fishGroup")
fg.tags.push(fish)
var pg = new Group(gidg.generate(), "porkGroup")
pg.tags.push(pork)

var md = new Tag(tidg.generate(), "maindish")
var mdg = new Group(gidg.generate(), "mainDishGroup")
mdg.tags.push(md)
mdg.items.push(fg, pg)
//jsontest1
//var a = document.createElement("div");a.innerHTML = JSON.stringify(mdg);document.body.appendChild(a)


