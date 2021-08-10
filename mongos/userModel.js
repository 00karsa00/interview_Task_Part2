require('./mongodb')
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  firstName : { type: String }, 
  lastName : { type: String },
  middleName : { type: String },
  address : { type: String },
  country: { type: String },
  state: { type: String },
  zipcode: { type: String },  
  email: { type: String }, 
  phoneNumber: { type: String }, 
  email: { type: String }, 
  height: { type: String }, 
  weight: { type: String },
  password: { type: String },
  isDeleted: {type: Number,  default: 0 }
}, { versionKey: false })

userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })

const UserModel = mongoose.model('Users', userSchema)
module.exports = UserModel
