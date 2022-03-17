import Group from './Group.js'

/*
 * Class: createGroup
 * Use: creates a new group with an id, title, description, and array of profile cards
 */

class createGroup {
    constructor() {
        this.group = null;
        this._groupForm = null;
        this._onSubmit = this._onSubmit.bind(this)
    }

    setup() {
        this._groupForm = document.querySelector("#form")
        this._groupForm.addEventListener("submit", this._onSubmit)
    }

    //creates new group and returns to home screen
    async _onSubmit(event){
        event.preventDefault()
        let body = {
            "id": this._groupForm.groupId.value,
            "title": this._groupForm.groupTitle.value,
            "description": this._groupForm.groupDescription.value,
            "profiles": []
        };
        
        this.group = await Group.createGroup(body);
        if(this.group){
            window.location.href="index.html"
        }
    }

}

let cg = new createGroup();
cg.setup();
