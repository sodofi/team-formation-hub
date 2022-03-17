import Group from "./Group.js";

/***
 * Class: App
 * Use: Main file that loads group content and displays it to the screen
 */

class App {
    constructor() {
        this._groupid = localStorage.getItem('groupCur');
        this._group = null;

        this._loadGroup = this._loadGroup.bind(this);
        this._loadProfiles = this._loadProfiles.bind(this);
        this._onProfileDelete = this._onProfileDelete.bind(this);
    }

    setup() {
        this._loadGroup();
    }

    //displays group title and description
    async _loadGroup(){
        this._group = await Group.load(this._groupid);
        
        
        let groupContainer = document.querySelector(".groupContainer");
        let groupName = document.createElement("h1");
        groupName.textContent = this._group.title;
        let groupDescription = document.createElement("h2");
        groupDescription.textContent = this._group.description;
        groupContainer.append(groupName);
        groupContainer.append(groupDescription);

        this._loadProfiles();
    }

    //displays profile cards of group
    async _loadProfiles(){
        let cardContainer = document.querySelector('#cardContainer')
        for (let profile of this._group.profiles) {
            console.log(profile);
            var clone = document.querySelector(".template.card").cloneNode(true);
            clone.classList.remove("template");
            clone.querySelector(".pfp").src = profile.pfp;
            clone.querySelector(".name").textContent = profile.name;
            clone.querySelector(".major").textContent = profile.major;
            clone.querySelector(".join").textContent = profile.join;
            clone.querySelector(".bio").textContent = profile.bio;
            clone.querySelector(".contact").setAttribute('href', profile.contact);
            clone.querySelector(".delete").addEventListener("click", this._onProfileDelete);
            cardContainer.append(clone);
        }
    }

    //deletes card from the DOM
    async _onProfileDelete(event){
        console.log('card deleted')
        event.currentTarget.closest(".card").remove();
    }
}

let app = new App();
app.setup();


