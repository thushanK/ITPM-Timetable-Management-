import axios from "axios";
import Config from "./Config.controller";
//done
export const getWorkingDays = () => {
        return new Promise((resolve, reject) => {
            return axios.get(`${Config.host}${Config.port}/api/workingdays/get`)
                .then(result => {
                    if (result.status == 200) {
                        resolve(result.data)
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    //done
export const getWorkingDaysSingle = id => {
        return new Promise((resolve, reject) => {
            return axios.get(`${Config.host}${Config.port}/api/workingdays/get/${id}`)
                .then(result => {
                    if (result.status == 200) {
                        resolve(result.data)
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    //done
export const insertGroup = (data) => {
    return new Promise((resolve, reject) => {
        return axios.post(`${Config.host}${Config.port}/api/workingdays/add`, data)
            .then(result => {
                if (result.status == 200) {
                    resolve({...result.data, status: 200 })
                } else {
                    resolve({ status: result.status })
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const updateGroup = (data) => {
        return new Promise((resolve, reject) => {
            return axios.post(`${Config.host}${Config.port}/api/workingdays/update`, data)
                .then(result => {
                    if (result.status == 200) {
                        resolve({...result.data, status: 200 })
                    } else {
                        resolve({ status: result.status })
                    }
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
    //done
export const deleteGroup = id => {
    console.log(id)
    return new Promise((resolve, reject) => {
        return axios.delete(`${Config.host}${Config.port}/api/workingdays/delete`, { data: { id: id } })
            .then(result => {
                if (result.status == 200) {
                    resolve({...result.data, status: 200 })
                } else {
                    resolve({ status: result.status })
                }
            })
            .catch(err => {
                reject(err);
            })
    })
}