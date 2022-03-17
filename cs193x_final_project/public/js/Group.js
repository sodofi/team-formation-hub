import apiRequest, { HTTPError } from "./api.js";

/***
 * Class: Group
 * Use: Creates an instance of a Group
 */
export default class Group {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.profiles = data.profiles;
    }


    /* Returns an Object containing only the public instances variables (i.e. the ones sent to the API). */
    toJSON() {
        let body = {
        "id": this.id,
        "title": this.title,
        "description": this.description,
        "profiles": this.profiles
        };
        return body;
    }


    /* Returns a Group object */
    static async load(id) {
        let group = null;
            try {
                let getGroup = await apiRequest("GET", "/groups/" + id);
                group = new Group(getGroup);
                let groupObj = group.toJSON();
                localStorage.setItem('groupCur', groupObj.id);
            }
            catch (error) {
                if (error.status !== 404){
                    throw error
                }
                alert(`Group with ID ${id} does not exist. Click 'List Groups' to see existing groups or 'Create Groups' to create a new group!`);
            }
        return group;
    }

    /* Returns an array of group IDs */
    static async listGroups() {
        let data = await apiRequest("GET", "/groups");
        return data.groups;
    }


    /* Creates a new group */
    static async createGroup(data) {
        let returnMsg = null;
        try {
            returnMsg = await apiRequest("POST", "/groups", data);
        }
        catch (error) {
            if (error.status !== 404){
                throw error
            }
            alert(`Group with ID ${data.id} already exists`);
        }
        return returnMsg;
    }

    /* Updates group profiles */
    async updateGroupProfiles(data){
        let res = await apiRequest("PATCH", "/groups/" + this.id , data);
            if (res.status === 404) {
                throw new HTTPError(404, res.status);
        }
        return res;
    }
}


