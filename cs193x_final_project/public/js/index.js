import Group from './Group.js'

class App {
    constructor() {
        this.group = null;

        this._groupForm = null;

        this._listGroups = document.querySelector(".listGroups")

        this._onListGroups = this._onListGroups.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    setup() {
        console.log(this);
        this._groupForm = document.querySelector("#groupForm")
        this._groupForm.addEventListener("submit", this._onSubmit)

        console.log(this._groupForm)
        console.log(this._listGroups)
        this._listGroups.addEventListener("click", this._onListGroups)
    }

    async _onSubmit(event) {
        event.preventDefault();
        this.group = await Group.load(this._groupForm.userid.value)
        if(this.group){
            window.location.href="main.html"
        }
    }

   async _onListGroups() {
        let groups = await Group.listGroups();
        let groupsStr = groups.join("\n");
        alert(`List of users:\n\n${groupsStr}`);
    }
}

let app = new App();
app.setup();


