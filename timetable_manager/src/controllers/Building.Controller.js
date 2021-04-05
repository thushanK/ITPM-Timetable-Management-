
import Axios from "axios";

import Config from "./Config.Controller";

class Building {
    constructor() {
        this.api = {
            addBuilding: "/api/buildings/add",
            getAllBuildings: "/api/buildings/get",
            updateBuilding: "/api/buildings/update",
            deleteBuilding: "/api/buildings/delete",
            getBuilding: "/api/buildings/getOne",
        };
    }

    addBuilding = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addBuilding}`,
            data
        )
            .then(Response => {
                console.log(Response);

                resp = Response.status;
                userData = Response.data.userData
            })
            .catch(err => {
                console.log(err);
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



    getAllBuildings = () => {
 
        return Axios.get(
            `${Config.host}${Config.port}${this.api.getAllBuildings}`,
        )
        .then(Response => {
            console.log(Response);
            if(Response.status == 200 )
                return Response.data;
            else
                return []
        })
        .catch(err => {
            console.error(err);
            return [];    
        });

    }

    getOne = async (id) => {
        console.log(id);
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getBuilding}/${id}`,)
        
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


    editBuilding = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.post(
            `${Config.host}${Config.port}${this.api.updateBuilding}`,
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

    deleteBuilding = async (data) => {
        console.log(data);



        var resp = 600;
        var userData = {}
        await Axios.delete(
            `${Config.host}${Config.port}${this.api.deleteBuilding}/${data.id}`,
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
var UserObject = new Building();
export default UserObject;