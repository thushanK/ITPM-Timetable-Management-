import axios from "axios";
import Config from "./Config.Controller";

export const addNotAvailableLec = (data) => {

    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/allocateLec/notavailable`, data)
        .then( result => {
            if(result.status == 200){
                resolve({...result , status : 200})
           }else{
            resolve({ status : result.status })
           }
        })
        .catch( err => {
            console.log(err)
            reject(err);
        })
    })
}

export const getAllLecs = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/lecturer/all`)
            .then( result => {
               if(result.status == 200){
                    resolve(result.data)
               }else{
                   
                resolve([])
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}
