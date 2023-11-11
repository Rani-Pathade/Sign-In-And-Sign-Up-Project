const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secretKey = "asdfghjkl";
const DBConnection = require("./config/DBConnnection"); 
const User = require("./models/User");
const cors = require('cors');

DBConnection(); 


app.use(express.json());
app.options("/login",cors())
app.options("/profile",cors())


app.post("/login",cors(), async (req, res) => { 
  // request body object destructuring 
  let { username, password } = req.body;
  console.log(username, password);

  // finding user as per username from database
  const dbUser = await User.findOne({ username: username });
  console.log(dbUser);

  if (dbUser != null && dbUser.password === password) {
    // res.status(200).json({status: "Login Successfull",data:req.data})

    // creating token with payload expiry time
    jwt.sign({ dbUser }, secretKey, { expiresIn: "1000s" }, (err, token) => {
      res.json({
        jwtToken: token,
        message: "Login Successful!",
      });
    });
  } else {
    res.status(404).json({ message: "Login failure, please try again..." });
    //res.send("Login failure")
  }
});

// middleware to verify token
function verify(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader === "undefined") {
    res.status(403).json({
      errorMessage: "Token not received",
    });
  } else {
    const bearer = authHeader.split(" ");
    const tokenFromReq = bearer[1];
    console.log(tokenFromReq);
    jwt.verify(tokenFromReq, secretKey, (err, authData) => {
      if (err) {
        res.status(403).json({ errorMessage: "Invalid Token" });
      } else {
        req.data = authData;
        next();
      }
    });
  }
}

app.get("/profile",cors(), verify, (req, res) => {
  res.send(req.data);
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});  
