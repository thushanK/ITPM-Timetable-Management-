
 
import Axios from "axios";


import Config from "./Config.controller";

class User {
    constructor() {
       
        this.api = {
            addLecturer: "/api/lecturer/add",
            getAllLecturer: "/api/lecturer/all",
            getSpecificLecturer: "/api/lecturer",
            getSpecificLecturerbyid: "/api/lecturer/byid",
            filter: "/api/lecturer/filter",
            delete: "/api/lecturer/delete",
            edit: "/api/lecturer/edit",


        };
    }

    addLecturer = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addLecturer}`,
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



    get_all = async (data) => {
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.getAllLecturer}`,
          
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

    get_specific = async (id) => {
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.getSpecificLecturer}/${id}`,
          
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
    get_specificById = async (id) => {
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.getSpecificLecturerbyid}/${id}`,
          
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

    delete_lecturer = async(data) =>{
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

    edit_lecturer = async(data) =>{
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
var UserObject = new User();
export default UserObject;