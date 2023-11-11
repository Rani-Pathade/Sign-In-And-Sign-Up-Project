const mongoose = require('mongoose')
const dotenv= require ('dotenv');

module.exports = function DBConnection(){
    dotenv.config();
    mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("Database connection is established");

    })
    .catch((err)=>{
        console.error(err)
    }) 
}