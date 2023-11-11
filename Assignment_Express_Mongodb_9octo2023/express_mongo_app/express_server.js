
const express = require('express')
const app = express()


//import DBConnect
const DBConnect = require('./dbconfig/DbConnection.js')
DBConnect()  //Connecting to MongoDb Database

//import Mongoose model - Person 
const personModel = require ('./models/PersonModel.js')
const personSchema = require('./schema/PersonSchema.js')

// create  object using models 
const person1 = new personModel({
    name:"Hemant Kumar",
    age:23,
    gender:"Male"
})

//save person1 object as document in MongoDB Database 
// person1.save()
// .then(()=>{
//     console.log("person1 is saved in database")
// }).catch((error)=>{
//     console.error(error) 
// }) 


/* personModel.insertMany([
{
    name:"Seema Khanna",
    gender:"Female"
},
{
    name:"Banti Patil",
    age:12,
    gender:"Male"
},
{
    name:"Zumberlal Raheja",
    age:56,
    gender:"Male" 
}

]).then (()=>{
    console.log("Objects are saved successfully into Database")
}).catch((error)=>{
    console.error(error) 
}) */


//Querying all the documents
/*
personModel.findOne()
.then((data)=>{
    console.log(data)
})
.catch((error)=>{
    console.error(error)
})
*/

//using query object
// personModel.find({age:{$gt:20}}) //Greater than 
/*
personModel.find({age:{$lt:20}})  //less than 
.then((data)=>{
    console.log(data)
})
.catch((error)=>{
    console.error(error) 
})
*/

//Query documents and projects certain fields only
/*personModel.find({age:{$gt:20}},{name:1,age:1,_id:0})  
.then((data)=>{
    console.log(data)
    for(let person of data){
        console.log("Name: "+ person.name + "\tAge: " + person.age)
    } 
})
.catch((error)=>{
    console.error(error) 
})*/

//$gt:20,$lt:30 condition 
/*personModel.find({age:{$gt:20,$lt:30}},{name:1,age:1,_id:0})  
.then((data)=>{
    console.log(data)
    for(let person of data){
        console.log("Name: "+ person.name + "\tAge: " + person.age)
    } 
})
.catch((error)=>{
    console.error(error) 
})*/

//Condition name:{$regex: /^S/i }},{name:1,age:1,_id:0
/*personModel.find({name:{$regex: /^S/i }},{name:1,age:1,_id:0})  
.then((data)=>{
    console.log(data)
    for(let person of data){
        console.log("Name: "+ person.name + "\tAge: " + person.age)
    } 
})
.catch((error)=>{
    console.error(error)  
})*/


//
/*personModel.find({name:{$regex: /a$/i }},{name:1,age:1,gender:1,_id:0})  
.then((data)=>{
    // console.log(data) 
    for(let person of data){
        console.log("Name: "+ person.name + "\tAge: " + person.age + "\tGender: " + person.gender)
    } 
})
.catch((error)=>{
    console.error(error)  
}) */


//Aggregation pipeline : $count
/*personModel.aggregate([{$count:"No of Persons"}]) 
.then((data)=>{
    console.log(data)
    console.log(data[0])
    let [personCount] = data  
    console.log(personCount)

    let count = personCount['No of Person'] 
    console.log()
})

.catch((error)=>{
    console.error(error)
}) */


/*personModel.aggregate([{$group:{_id:null, "Maximum Age":{ $max:"$age"}} } ]) 
.then((data)=>console.log(data))
.catch((err)=>console.error(err))*/


/*personModel.aggregate([{$group:{_id:null, "Maximum Age":{ $max:"$age"}} },{$project:{_id:0}} ]) 
.then((data)=>console.log(data))
.catch((err)=>console.error(err))*/


//sorting all person documents in ascending order of age

/*personModel.aggregate([{$sort:{age:1}}])
.then(person=>console.log(person))
.catch(error=>console.log(error))*/

//sorting in descending order of age and projecting name and age 
/*personModel.aggregate([
    {$sort:{age:1}},            //Ascending Order   
                                //{$sort:{age:-1}},          //Descending Order  
    {$project:{name:1,age:1,_id:0}}
   ])  
    
    .then(person=>{ 
     person.map(person=>console.log("Name:" + person.name + "\tAge:" + person.age))
    }) 
    .catch(error=>console.error(error)) */ 

//Updating mongodb document using express web app mongoose api 
 /* personModel.updateOne({name:"Seema Khanna"},{$set:{age:25}})
 .then(()=>console.log("Document Updated successfully!"))
 .catch(err=>console.log(error(err))) */


//Deleting mongodb document using mongoose api in express web app
personModel.deleteOne({name:"Banti Patil"})
.then(()=>console.log("Document deleted successfully!")) 
.catch(err=>console.log(error(err))) 


app.listen(process.env.PORT,()=>{
    console.log("Express Web App Server is started on : " + process.env.PORT)
}) 