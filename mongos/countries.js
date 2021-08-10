require('./mongodb')
const mongoose = require('mongoose')

const countrieSchema = mongoose.Schema({
    country: { type: String },
    statesList: [{states:{type: String}}]
}, { versionKey: false })

countrieSchema.set('toJSON', { virtuals: true })
countrieSchema.set('toObject', { virtuals: true })

const CountrieModel = mongoose.model('CountrieList', countrieSchema)
module.exports = CountrieModel
