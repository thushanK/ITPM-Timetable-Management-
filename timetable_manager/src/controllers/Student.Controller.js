
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.Controller";

class Student {
    constructor() {
        // user related apis
        this.api = {
            addStudent: "/api/student/add",
            getAllStudent: "/api/student/get",
            updateStudent: "/api/student/update",
            deleteStudent: "/api/student/delete",
            getStudent: "/api/student/getOne",
        };
    }

    addStudent = async (data) => {
        console.log("frontend data",data);
        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addStudent}`,
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

    getOne = async (id) => {
        console.log(id);
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getStudent}/${id}`,)
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



    getAllStudent = async () => {
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.getAllStudent}`,
          
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

    updateStudent = async (data) => {
        console.log(data);
        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.updateStudent}`,
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
            `${Config.host}${Config.port}${this.api.deleteStudent}/${data.id}`,
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

