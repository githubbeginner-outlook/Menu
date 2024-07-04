"use strict";
class GlobalSettings {
    #arrayOfSettings;
    get NonArrayFirstIndex() {
        return this.#arrayOfSettings[0];
    }
    constructor(newSettings) {
        this.#arrayOfSettings = newSettings;
    }
}
let myGlobalSettings = new GlobalSettings([1]);

class TagController {
    #tagBooks
    #tagsPage
    #currentTagBookIndex;
    #currentTagSwifted;
    get CurrentBookIndex() {
        return this.#currentTagBookIndex;
    }
    get CurrentSwifted() {
        return this.#currentTagSwifted;
    }
    constructor() {
        this.#currentTagBookIndex = myGlobalSettings.NonArrayFirstIndex;
        this.#currentTagSwifted = 0;
        this.#tagBooks = new Map();
        this.#tagsPage = new Map();
        this.#tagBooks.set(this.#currentTagBookIndex, this.#tagsPage);
    }
    #TagIdGenerate() {
        let newId = 1 << this.#currentTagSwifted;
        this.#currentTagSwifted += 1;
        if (this.#currentTagSwifted >= 31) {
            this.#currentTagSwifted = 0;
            this.#currentTagBookIndex += 1;
            this.#tagsPage = new Map();
            this.#tagBooks.set(this.#currentTagBookIndex, this.#tagsPage);
        }
        return newId;
    }

    Create(name) {
        let nextId = this.#TagIdGenerate();
        console.log(nextId);
        while (this.#tagsPage.has(nextId)) {
            alert(`tagsMap has ${nextId}!`);
            nextId = this.#TagIdGenerate();
        }
        this.#tagsPage.set(nextId, name);
        return nextId;
    }
}

class ItemController {
    #currentItemId;
    #currentItemBookIndex;
    #itemsBook;
    #itemsPage;
    constructor() {
        // {itemid : itemname}
        this.#itemsBook = new Map();
        this.#itemsPage = new Map();
        this.#currentItemBookIndex = myGlobalSettings.NonArrayFirstIndex;
        this.#itemsBook.set(this.#currentItemBookIndex, this.#itemsPage);
        this.#currentItemId = myGlobalSettings.NonArrayFirstIndex - 1;
    }
    #ItemIdGenerate() {
        this.#currentItemId += 1;
        if (this.#currentItemId > Number.MAX_SAFE_INTEGER) {
            this.#currentItemBookIndex += 1;
            this.#itemsPage = new Map();
            this.#itemsBook.set(this.#currentItemBookIndex, this.#itemsPage);
            this.#currentItemId = myGlobalSettings.NonArrayFirstIndex;
        }
        return this.#currentItemId;
    }

    Create(name) {
        let nextId = this.#ItemIdGenerate();
        console.log(nextId);
        while (this.#itemsPage.has(nextId)) {
            alert(`itemsPage has ${nextId}!`);
            nextId = this.#ItemIdGenerate();
        }
        this.#itemsPage.set(nextId, name);
        return nextId;
    }
}

class ItemTagRelationController {
    #itemsTagsBook;
    #itemsTagsPage;
    #currentItemsTagsBookIndex;

    #itemController;
    #tagController;

    #LastCreatedTag;
    constructor(targetItemController, targetTagController) {
        // {itemid : tagId}
        this.#itemsTagsBook = new Map();
        this.#itemsTagsPage = new Map();
        this.#currentItemsTagsBookIndex = myGlobalSettings.NonArrayFirstIndex;
        this.#itemsTagsBook.set(this.#currentItemsTagsBookIndex, this.#itemsTagsPage);

        this.#itemController = targetItemController;
        this.#tagController = targetTagController;
    }
}


class SearchSelectsElement extends HTMLElement {

    constructor() {
        self = super();
    }
    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        const spanWrapper = document.createElement("span");
        // spanWrapper.setAttribute("class", "wrapper");
        // const labelInput = document.createElement("label");
        // labelInput.setAttribute("for","search");
        const inputText = document.createElement("input");
        inputText.setAttribute("type","text");
        inputText.setAttribute("title","searchbox")
        shadow.appendChild(spanWrapper);
        // spanWrapper.appendChild(labelInput);
        spanWrapper.appendChild(inputText);
    }
}

customElements.define("search-selects", SearchSelectsElement)
// let tagControler = new TagController();
// let fish = tagControler.Create("fish");
// let pork = tagControler.Create("pork");
// console.log(tagControler.tagBooks);
// console.log(JSON.stringify(tagControler.tagBooks));


//jsontest1
//var a = document.createElement("div");a.innerHTML = JSON.stringify(mdg);document.body.appendChild(a)