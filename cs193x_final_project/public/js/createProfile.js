import Group from "./Group.js";

/*
 * Class: createProfile
 * Use: creates a new profile card and adds it to the current group
 */

class createProfile {
    constructor() {
        this._group = null;
        this._groupid = null;

        this._profileForm = null;

        this._join = null;
        this._recruit = null;

        this._save = null;
        this._onSubmit = this._onSubmit.bind(this)
    }

    setup() {
        this._profileForm = document.querySelector("#form")
        this._profileForm.addEventListener("submit", this._onSubmit)
        this._groupid = localStorage.getItem('groupCur');
    }

    async _onSubmit(event){
        event.preventDefault()
        this._group = await Group.load(this._groupid);
        this._join = document.querySelector("#join").checked;
        this._recruit = document.querySelector("#recruit").checked;
        console.log(this._profileForm)
        let pfp = null;
        if(!this._profileForm.pfp.value){
            pfp = "images/default.png"; 
        } else {
            pfp = this._profileForm.pfp.value
        }
        let check = null;
        if(!this._join && !this._recruit || this._join && this._recruit){
            alert('Please select to join or recruit');
        } else if (this._recruit){
            check = "Looking to recruit a new member";
        } else {
            check = "Looking to join a team";
        }
        if(check){
            let body = {
                "group": this._groupid,
                "name": this._profileForm.name.value,
                "major": this._profileForm.major.value,
                "bio": this._profileForm.bio.value,
                "contact": this._profileForm.contact.value,
                "pfp": pfp,
                "join": check,
            }
            console.log(body)
            let res = await this._group.updateGroupProfiles(body);
            if(res){
                window.location.href="main.html"
            }
        }
    }
}

let cp = new createProfile();
cp.setup();
