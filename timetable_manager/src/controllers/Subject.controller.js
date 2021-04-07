// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.controller";

class Subject {
    constructor() {
        // user related apis
        this.api = {
            addSubject: "/api/subject/add",
            getAllSubject: "/api/subject/all",
            getSpecificSubject: "/api/subject",
            filter: "/api/subject/filter",
            delete: "/api/subject/delete",
            edit: "/api/subject/edit",



        };
    }

    addSubject = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addSubject}`,
            data
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data.userData
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return resp;
        }
        return resp;
    }



    get_all = async () => {
        



        return  Axios.get(
            `${Config.host}${Config.port}${this.api.getAllSubject}`,
          
        )
            .then(Response => {
                console.log(Response);

                if(Response.status == 200) 
                        return  Response.data
                else
                        return []
            })
            .catch(err => {
                console.error(err);
                return []
            });

      
    }

    get_specific = async (id) => {

        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.getSpecificSubject}/${id}`,
          
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return userData;
        }
        return resp;
    }


    get_filter = async(filter) =>{
        var resp = 600;
        var userData = {}
        console.log(filter);
        await Axios.post(
            `${Config.host}${Config.port}${this.api.filter}`,
            filter
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return userData;
        }
        return resp;
    }
    delete_subject = async(data) =>{
        var resp = 600;
        var userData = {}
        console.log(data);
        await Axios.post(
            `${Config.host}${Config.port}${this.api.delete}`,
            data
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return resp;
        }
        return resp;
    }
    edit_subject = async(data) =>{
        var resp = 600;
        var userData = {}
        console.log(data);
        await Axios.post(
            `${Config.host}${Config.port}${this.api.edit}`,
            data
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);
                    resp = 600;
                }
            });

        if (resp === 200) {
            return resp;
        }
        return resp;
    }
}
var UserObject = new Subject();
export default UserObject;