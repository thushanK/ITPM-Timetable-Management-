
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.controller";

class Sessions {
    constructor() {
        // user related apis
        this.api = {
            getDetails: "/api/session/get/allinfo",
            addSessions: "/api/session/add",
            get_all_session_api: "/api/session/all",
            get_filterd_sessions_api: "/api/session/search",
            delete_sessions_api: "/api/session/delete",
        };
    }



    get_all_details =  () => {
        return  Axios.get(
            `${Config.host}${Config.port}${this.api.getDetails}`)
            .then(Response => {
                if (Response.status == 200)
                    return Response.data
                else
                    return [];
            })
            .catch(err => {
                console.error(err);
                return [];
            });
    }


    add_sessions =  (data) => {
         
        return  Axios.post(
            `${Config.host}${Config.port}${this.api.addSessions}`,
            data
        )
            .then(Response => {
                console.log(Response);
                if (Response.status === 201)
                    return 201;
                else 
                return 400;
               
            })
            .catch(err => {
                console.error(err);
                return 400;
            });
    }

    get_all_seesion = () => {
        return Axios.get(
            `${Config.host}${Config.port}${this.api.get_all_session_api}`)
            .then(Response => {
                if (Response.status == 200)
                    return Response.data.result
                else
                    return [];
            })
            .catch(err => {
                console.error(err);
                return [];
            });
        }
    get_filterd_seesion = (data) => {
        return Axios.post(
            `${Config.host}${Config.port}${this.api.get_filterd_sessions_api}`, data)
            .then(Response => {
                if (Response.status == 200)
                    return Response.data.result
                else
                    return [];
            })
            .catch(err => {
                console.error(err);
                return [];
            });
        }

        delete_session = async(data) =>{
            var resp = 600;
            var userData = {}
            var req = {
                id : data
            }
            console.log(req);
            console.log(data);
            await Axios.post(
                `${Config.host}${Config.port}${this.api.delete_sessions_api}`,
                req
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
    
            // if (resp === 200) {
            //     return resp;
            // }
            return resp;
        }
}
var UserObject = new Sessions();
export default UserObject;