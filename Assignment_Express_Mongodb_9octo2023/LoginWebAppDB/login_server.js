const express = require("express"); 
const session = require("express-session"); 
const router = require("./controllers/routers.js"); 
const DBConnect = require("./dbconfig/DBConnection.js");  
DBConnect(); // connect to mongodb 

const app = express();  
app.use( 
  session({ 
    secret: "asdfghjklzxcvbnmqwertyuiop",  
    resave: true, 
    saveUninitialized: false, 
  })
);

// setting view engine
app.set("view engine", "pug");
app.set("views", "./views");
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Express server is started on port " + process.env.PORT);
}); 
