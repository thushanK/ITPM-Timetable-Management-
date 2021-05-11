import Axios from "axios";

import Config from "./Config.controller";

class Stats {
    constructor() {

        this.api = {
            studentStats: "/api/stats/studentGroups",
            lecStats: "/api/stats/lecStats",
            subStats: "/api/stats/subStats",
        };
    }

    getStudentStats = async () => {
        
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.studentStats}`,
          
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

    getLecStats = async () => {
        
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.lecStats}`,
          
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

    getSubStats = async () => {
        
        var resp = 600;
        var userData = {}
        await Axios.get(
            `${Config.host}${Config.port}${this.api.subStats}`,
          
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

}
var UserObject = new Stats();
export default UserObject;