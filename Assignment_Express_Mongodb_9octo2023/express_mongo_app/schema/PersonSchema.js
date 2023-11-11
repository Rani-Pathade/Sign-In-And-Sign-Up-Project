const {default:mongoose} = require ('mongoose')

const personSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number, default:0},
    gender:String
});

//export mongoose schema
module.exports = personSchema 