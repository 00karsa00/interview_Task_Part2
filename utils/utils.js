module.exports = function() {
    const jwt = require('jsonwebtoken')
    var jwtRes = 'sO6ymZ]{:`Bg3vS'

    this.generateToken = function (data) {
        return new Promise(function (resolve) {
          jwt.sign(data, jwtRes, (err, token) => {
            if (err) {
              resolve(err)
            } else {
              resolve(token)
            }
          })
        })
    }

    this.tokenVerification = async (token) => {
      var data = {}
      return new Promise(function (resolve) {
        jwt.verify(token, jwtRes, (err, payload) => {
          if (err) {
            data.error = true
            data.data = null
            resolve(data)
          } else {
            data.error = false
            data.data = payload
            resolve(data)
          }
        })
    
      })
    }
}