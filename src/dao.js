module.exports = function() {
    const UserModel = require('../mongos/userModel') 
    const CountriesModel = require('../mongos/countries')

    this.saveDetails = (data) => {
        var response = {}
        return new Promise(async (resolve) => {    
            const batchModelData = new UserModel(data)
            batchModelData.save(function (error, result) {
                if (error) {
                    response.error = true
                } else {
                    response.error = false
                    response.data = result
                }
                resolve(response)
            })
        })
    }

    this.userLogin = (data) => {
        var response = {}
        return new Promise(async (resolve) => {    
            UserModel.find({email: data.userName, password: data.password, isDeleted: 0 }, {new: false}, (err, result) => {
                if (err) {
                  response.error = true
                } else {
                  response.error = false
                  response.data = result
                }
                resolve(response)
            })          
        })
    }

    this.deleteUser = (data) => {
        var response = {}
        return new Promise(async (resolve) => { 
            UserModel.findOneAndUpdate({_id: data.id}, {$set:{isDeleted:1 }}, {new: true}, (err, result) => {
                if (err) {
                    console.log(err)
                    response.error = true
                } else {
                    response.error = false
                    response.data = result
                }
                resolve(response)
            })
        })
    }

    this.getCountryList = (data) => {
        var response = {}
        return new Promise(async (resolve) => { 
            CountriesModel.find({}, {country: 1 }, (err, result) => {
                if (err) {
                    console.log(err)
                    response.error = true
                } else {
                    response.error = false
                    response.data = result
                }
                resolve(response)
            })
        })
    }

    this.getStateList = (data) => {
        var response = {}
        return new Promise(async (resolve) => { 
            CountriesModel.find({_id: data.country}, {statesList : 1 }, (err, result) => {
                if (err) {
                    console.log(err)
                    response.error = true
                } else {
                    response.error = false
                    response.data = result
                }
                resolve(response)
            })
        })
    }

    this.loadJson = (data) => {
        var response = {}
        return new Promise(async (resolve) => { 
            const batchModelData = new CountriesModel(data)
            batchModelData.save(function (error, result) {
                if (error) {
                    response.error = true
                } else {
                    response.error = false
                    response.data = result
                }
                resolve(response)
            })
        })
    }

    this.checkDetailDao = (data) => {
        var response = {}
        return new Promise(async (resolve) => { 
            UserModel.find({email: data.email, isDeleted: 0 }, {new: false}, (err, result) => {
                if (err) {
                  response.error = true
                } else {
                  response.error = false
                  response.data = result.length
                }
                resolve(response)
            })   
        })
    }

    this.getUserDeails = (email) => {
        var response = {}
        return new Promise(async (resolve) => { 
            UserModel.find({email: email,isDeleted: 0 }, {new: false}, (err, result) => {
                if (err) {
                  response.error = true
                } else {
                  response.error = false
                  response.data = result
                }
                resolve(response)
            })   
        })
    }
}