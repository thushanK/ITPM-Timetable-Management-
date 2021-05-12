
// import Axios 
import Axios from "axios";

// import config
import Config from "./Config.Controller";

class parallel {
    constructor() {
        // user related apis
        this.api = {
            addparallel: "/api/parallel/add",
            getAllParallel: "/api/parallel/get",
            getOne: "/api/parallel/getOne",
            deleteGenerate : "/api/parallel/delete",
           
        };
    }

    addparallel = async (data) => {
    
        return await Axios.post( `${Config.host}${Config.port}${this.api.addparallel}`, data )
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

    getOne = async (id) => {
        console.log(id);
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOne}/${id}`,)
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
var UserObject = new parallel();
export default UserObject;