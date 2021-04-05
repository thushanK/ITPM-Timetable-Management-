import axios from "axios";
import Config from "./Config.Controller";

export const insertTimeslot = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/timeslots/add` , data)
            .then( result => {
                if(result.status == 200){
                    resolve({...result.data , status : 200})
               }else{
                resolve({ status : result.status })
               }
            })
            .catch( err => {
                reject(err);
            })
    })
}

export const getTimeslots = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/timeslots/get`)
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

export const getTimeslotSingle = id => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/timeslots/get/${id}`)
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

export const deleteTimeslot = id => {
    return new Promise( (resolve,reject) => {
        return axios.delete(`${Config.host}${Config.port}/api/timeslots/delete` , {data : {id : id }})
            .then( result => {
                if(result.status == 200){
                    resolve({...result.data , status : 200})
               }else{
                resolve({ status : result.status })
               }
            })
            .catch( err => {
                reject(err);
            })
    })
}

export const updateTimeslot = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/timeslots/update` , data)
            .then( result => {
                if(result.status == 200){
                    resolve({...result.data , status : 200})
               }else{
                resolve({ status : result.status })
               }
            })
            .catch( err => {
                reject(err);
            })
    })
}