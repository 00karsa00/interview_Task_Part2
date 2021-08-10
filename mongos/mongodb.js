// Mongoose Connection
var mongoose = require('mongoose')
var uri = "mongodb+srv://demoTest:test1234@cluster0.rmfww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('mongo db Connected')
})

module.exports = mongoose