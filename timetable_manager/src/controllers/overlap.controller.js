

import Axios from "axios";


import Config from "./Config.Controller";

class NotOverlap {
    constructor() {
        // user related apis
        this.api = {
            addOverlap: "/api/Not_overlap/add",
            getAllParallel: "/api/Not_overlap/get",
            // getOne: "/api/parallel/getOne",
            deleteGenerate : "/api/Not_overlap/delete",
           
        };
    }

    addOverlap = async (data) => {
    
        return await Axios.post( `${Config.host}${Config.port}${this.api.addOverlap}`, data )
            .then(Response => {
                console.log(Response);
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }



    getAllParallel = async () => {
        return await Axios.get( `${Config.host}${Config.port}${this.api.getAllParallel}` )
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


   

   

   



}
var UserObject = new NotOverlap();
export default UserObject;