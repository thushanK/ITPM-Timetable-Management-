

import Axios from "axios";


import Config from "./Config.Controller";

class ConSessions {
    constructor() {
        
        this.api = {
            addConSessions: "/api/consession/add",
            getAllConSessions: "/api/consession/get",
            getOne : "/api/consession/getOne",
            deleteGenerate:  "/api/consession/delete",
           
        };
    }

    addConSessions = async (data) => {
    
        return await Axios.post( `${Config.host}${Config.port}${this.api.addConSessions}`, data )
            .then(Response => {
                console.log(Response);
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    getAllConSessions = async () => {
        return await Axios.get( `${Config.host}${Config.port}${this.api.getAllConSessions}` )
            .then(Response => {
               
                return { data : Response.data.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400  , data : []}
            });
    }

    deleteGenerate = (data) => {
       
        return Axios.delete( `${Config.host}${Config.port}${this.api.deleteGenerate}/${data}` )
        .then(Response => {
            console.log(Response.status == 200 )
            if(Response.status == 200 ){
                return { status : 200 }
            }else{
                return { status : 400 } 
            }
        })
        .catch(err => {
            return { status : 400 , ...err } 
        });

    }


    
   

    getOne = async (id) => {
        console.log(id);
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOne}/${id}`,)
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

  



}
var UserObject = new ConSessions();
export default UserObject;