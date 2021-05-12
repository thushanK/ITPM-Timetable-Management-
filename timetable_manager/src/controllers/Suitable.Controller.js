import axios from "axios";
import Config from "./Config.Controller";


export const getAllRooms = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/rooms/get`)
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

export const getAllTags = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/tag/get`)
            .then( result => {
               if(result.status == 200){
                    resolve(result.data.data)
               }else{
                   
                resolve([])
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}

export const getAllLectures  = () => {
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

export const getAllGroups = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/student/get`)
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

export const getAllSubjects = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/subject/all`)
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

export const getAllSessions = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/suitable/getAllSessions`)
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