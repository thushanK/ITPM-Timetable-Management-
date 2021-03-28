import axios from "axios";
import Config from "./Config.controller";

export const AddLocation = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}${Config.port}/api/locations/add`;
        try {
            let res = await axios.post(apiUrl, data);
            resolve(res);
        } catch (error) {
            reject(error)
        }
    })
} 

export const GetLocations = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}${Config.port}/api/locations/get`;
        try {
            let res = await axios.get(apiUrl);
            resolve(res);
        } catch (error) {
            reject(error)
        }
    })
}