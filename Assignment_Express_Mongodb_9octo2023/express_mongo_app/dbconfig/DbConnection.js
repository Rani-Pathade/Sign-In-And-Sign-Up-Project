const mongoose = require('mongoose')
const dotenv = require('dotenv') 

function DBConnect() {  

    //read environment variable from .env file
    dotenv.config()  

    //This is the Main Code to Establish connection with MongoDB Database 
    mongoose.connect(process.env.DB_URL) 
    .then(()=> { 
        console.log("Connection with Mongodb Database established ")  
    } )
    .catch((error)=> {    
        console.error(error)   
    })  
} 

//export DBConnect :- 
module.exports = DBConnect  