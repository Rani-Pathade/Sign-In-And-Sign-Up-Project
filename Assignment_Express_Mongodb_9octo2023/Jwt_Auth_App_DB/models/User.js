const mongoose = require ('mongoose');

//Creating mongodb schema for User model
const userSchema = new mongoose.Schema ({
    username : {type:String},
    password:{type:String}
})

//Creating User model from schema 
const User = mongoose.model("User",userSchema);

module.exports = User; 
