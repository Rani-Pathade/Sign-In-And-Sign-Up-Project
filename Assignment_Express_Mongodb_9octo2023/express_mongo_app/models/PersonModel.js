const mongoose = require('mongoose')
const personSchema = require('../schema/PersonSchema.js')

//Creating MongoDb Model using Schema
const personModel = mongoose.model("Person" , personSchema)

//export model
module.exports = personModel 