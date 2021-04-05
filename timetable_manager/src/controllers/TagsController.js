
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.Controller";

class Student {
    constructor() {
        // user related apis
        this.api = {
            addTag: "/api/tag/add",
            getAllTags: "/api/tag/get",
            updateTgas: "/api/tag/update",
            deleteTags: "/api/tag/delete",
            gettAG: "/api/tag/getOne",
        };
    }

    addTag = async (data) => {
        console.log(data);
        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addTag}`,
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


    
    getAllTags = async () => {
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.getAllTags}`,
          
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



    getOne = async (id) => {
        console.log(id);
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.gettAG}/${id}`,)
            // .then(response => {
            //     console.log(response);
            // }).catch(err => {
            //     console.log(err);
            // })
        
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

    updateTgas = async (data) => {
        console.log(data);
        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.updateTgas}`,
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

    deleteStudent = async (data) => {
        console.log(data);
        var resp = 600;
        var userData = {}
        await Axios.delete(
            `${Config.host}${Config.port}${this.api.deleteTags}/${data.id}`,
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

   



}
var UserObject = new Student();
export default UserObject;