const { response } = require('express')

module.exports = function () {
    const dao = require('./dao')
    const useDao = new dao()
    const utils = require('../utils/utils')
    const useUtils = new utils()  
    const fs = require('fs')  
    const path = require("path");
    var file = require('../public/CountryCodes.json')
    var contryPath = require('../public/gistfile1.json')

    this.saveDetails = async (data, callback) => {
        var response = {}
        try {
            var checkDetail = await useDao.checkDetailDao(data)
            if(!checkDetail.error) {
                if(checkDetail.data > 0 ){
                    response.error = true
                    response.statuCode = 200  
                    response.message = `Email Id already registered`
                } else {
                    var input = {
                        firstName : data.fname, 
                        lastName : data.lname,
                        middleName : data.mname,
                        address : data.address,
                        country: data.country,
                        state: data.state,
                        zipcode: data.zipcode,  
                        email: data.email, 
                        phoneNumber: data.phoneNumber, 
                        height: data.height, 
                        weight: data.weight,
                        password: data.password
                    }   
                    var result = await useDao.saveDetails(input)
                    if(!result.error) {
                        response.error = false
                        response.statuCode = 200  
                        response.message = "Successfully New User Added"
                    }        
                }
            }
            if(response.error == undefined) {
                response.error = true
                response.statuCode = 400  
                response.message = "something want to be wrong"
            }
           
        } catch (e) {
            response.error = true
            response.statuCode = 500  
            response.message = "Server error..."
        }
        callback(response)
    }

    this.userLogin = async (data, callback) => {
        try {
            var response = {}
            var result = await useDao.userLogin(data)

            if(result.error) {
                response.error = true
                response.statuCode = 400  
                response.message = "something want to be wrong"
            } else {
                if(result.data.length > 0) {
                    var token = await useUtils.generateToken(result.data[0].email)
                    var data = {
                        email: result.data[0].email,
                        token: token
                    }
                    response.error = false
                    response.statuCode = 200  
                    response.message = "login success!!"
                    response.data = data
                } else {
                    response.error = true
                    response.statuCode = 400  
                    response.message = "Login details not found"
                }
                
            }
        } catch (e) {
            console.log(e)
            response.error = true
            response.statuCode = 500  
            response.message = "Server error..."
        }
        callback(response)
    }

    this.deleteUser = async (data, callback) => {
        try {
            var response = {}
            var result = await useDao.deleteUser(data)
            if(result.error) {
                response.error = true
                response.statuCode = 400  
                response.message = "something want to be wrong"
            } else {
                response.error = false
                response.statuCode = 200  
                response.message = "User Account Removed Successfully"
            }
        } catch (e) {
            response.error = true
            response.statuCode = 500  
            response.message = "Server error..."
        }
        callback(response)
    }

    this.allUserDetails = async (data, callback) => {
        try {
            var response = {}
            var result = await useDao.allUserDetails(data)
            if(result.error) {
                response.error = true
                response.statuCode = 400  
                response.message = "something want to be wrong"
            } else {
                response.error = false
                response.statuCode = 200  
                response.data = result.data
            }
        } catch (e) {
            response.error = true
            response.statuCode = 500  
            response.message = "Server error..."
        }
        callback(response)
    }

    this.getCountryList = async (data, callback) => {
        try {
            var response = {}
            var result = await useDao.getCountryList(data)
            if(result.error) {
                response.error = true
                response.statuCode = 400  
                response.message = "something want to be wrong"
            } else {
                response.error = false
                response.statuCode = 200  
                response.data = result.data
            }
        } catch (e) {
            response.error = true
            response.statuCode = 500  
            response.message = "Server error..."
        }
        callback(response)
    }

    this.getStateList = async (data, callback) => {
        try {
            var response = {}
            var result = await useDao.getStateList(data)
            if(result.error) {
                response.error = true
                response.statuCode = 400  
                response.message = "something want to be wrong"
            } else {
                response.error = false
                response.statuCode = 200  
                response.data = result.data.length > 0 ? result.data[0].statesList : []
            }
        } catch (e) {
            console.log(e)
            response.error = true
            response.statuCode = 500  
            response.message = "Server error..."
        }
        callback(response)
    }

    this.getUserDeails = async (data, callback) => {
        var response = {}
        try{
            var token = await useUtils.tokenVerification(data.token)
            if(!token.error) {
                var userDetails = await useDao.getUserDeails(token.data)
                if(!userDetails.error) {
                    if(userDetails.data > 0)
                    {
                        response.error = true
                        response.statuCode = 200
                        response.message = "User Detail not found"
                        response.data = userDetails.data[0]
                    } else {
                        response.error = false
                        response.statuCode = 200
                        response.message = "Success"
                        response.data = userDetails.data[0]
                    }
                }
            }

            if(response.error == undefined) {
                response.error = true
                response.statuCode = 400
                response.message = "something to be wrong"
            }
        } catch (e) {
            response.error = true
            response.statuCode = 500  
            response.message = "Server error..."
        }
        callback(response)
    }

    this.loadJson = async (data, callback) => {
        console.log(contryPath)
        contryPath.countries.forEach(async (item , index) => {
            var data = {}
            data.country = item.country
            data.statesList = []
            item.states.map((state) => {
                var data1 = {}
                data1.states = state
                data.statesList.push(data1)
            })
            console.log(data)
            var result = await useDao.loadJson(data)
            if(index === contryPath.countries.length - 1){
                callback(contryPath)
            }
        })
    } 

    this.loadCountryCode = async (data, callback) => {
        var response = {}
        response.error = false
        response.statuCode = 200
        response.message = "Success"
        response.data = file
        callback(response)
    }
}