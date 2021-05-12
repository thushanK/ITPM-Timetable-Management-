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

export const getAllConSessions = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`${Config.host}${Config.port}/api/suitable/forConSession`)
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

export const addRoomsToTags = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/suitable/add`, data)
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

export const addNotAvailable = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/suitable/notavailable`, data)
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

export const addRoomsToLecs = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/suitable/forlec`, data)
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

export const addRoomsToGroups = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/suitable/forGroups`, data)
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

export const addRoomsToSubject = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/suitable/forSubjects`, data)
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


export const addRoomsToSession = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/suitable/forSessions`, data)
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

export const addRoomsToConSession = (data) => {
    return new Promise( (resolve,reject) => {
        return axios.post(`${Config.host}${Config.port}/api/suitable/forConSessions`, data)
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