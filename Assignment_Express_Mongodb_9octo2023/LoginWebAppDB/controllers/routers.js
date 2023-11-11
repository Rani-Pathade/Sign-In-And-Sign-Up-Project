const express = require("express");
const router = express.Router();
const User = require("../models/User.js"); // mongoose model 

// create routes
// root route using get method
router.get("/", (req, res) => {
  res.render("index", { pageTitle: "INDEX" }); // to render index.pug
});

// signin route using get method
router.get("/signin", (req, res) => {
  res.render("signin", { pageTitle: "SIGNIN" }); // to render signin.pug
});

// signup route using get method
router.get("/signup", (req, res) => {
  res.render("signup", { pageTitle: "SIGNUP" }); // to render signup.pug
});

// signup route using post method
// to accept user data form use middleware
router.post(
  "/signup", 
  express.urlencoded({ extended: false }),
  async (req, res) => {
    console.log(req.body);
    // destructuring req body object
    let { username, password, cpassword } = req.body;

    // create model object using req data
    let reqDataUser = new User({
      username: username, // req.body.username,
      password: password, // req.body.password
    });

    // check whether username exist in mongodb
    // if yes shows error else create user
    let dbUser = await User.findOne({
      username: { $eq: reqDataUser.username },
      password: { $eq: reqDataUser.password },
    });

    if (dbUser !== null) {
      // if user exist
      res.status(201).json({ errorMessage: "User already exists" });
    } else {
      // if user not exist
      // check passwd and cpasswd
      // if yes create user if not shows error

      if (reqDataUser.password == req.body.cpassword) {
        let savedUser = await reqDataUser.save();
        console.log("User registered in database!", savedUser);
        res.status(200).json({ succcessMessage: "Registered successfully!" });
      } else {
        res.status(201).json({ errorMessage: "Password should be same" });
      }
    }
  }
);

// // signin route using post method
// to accept user data form use middleware
router.post(
  "/signin",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    console.log(req.body);

    // destructuring req body object
    let { username, password, cpassword } = req.body;

    // create model object using req data
    let reqUser = new User({
      username: username, // req.body.username,
      password: password, // req.body.password
    });

    // check username and password
    let dbUser = await User.findOne({
      username: { $eq: reqUser.username }, 
    });

    // if user not exist shows error
    if (dbUser == null) {
      res
        .status(201)
        .json({ errorMessage: "User does not exists, Please signup" });
    } else {
      // if user exist check password
      if (dbUser.password != reqUser.password) {
        // if password does not matches shows error
        res.status(403).json({
          errorMessage: "Sorry, invalid login Password does not match",
        });
      } else {
        // if user does not exist in session then create new user property in session objrct
        if (!req.session.user) req.session.user = {};

        // if user property exist in session, storing request data in session
        req.session.user = reqUser;
        // if password matches shows success
        // res.status(201).json({ errorMessage: "Welcome to Great Grand Festival!",});
      }
      // if password matches shows success
      res.render("welcome", {
        session_user: req.session.user.username,
      });
    }
  }
);

router.get("/change_pwd", (req, res) => {
  res.render("password_change_form", {
    session_user: req.session.user.username,
  });
});




//access change_pwd route using post method 
router.post("/change_pwd",express.urlencoded({extended:false}),async(req,res)=>{
  console.log(req.body) 
let{username,old_password,new_password,confirm_new_pwd} = req.body
let dbPasswordObj = await User.findOne({username:{$eq:username}},{password:1,_id:0})
console.log(("DB Password",dbPasswordObj.password))
if(dbPasswordObj.password!=old_password){
  res.status(400).json({errorMessage:"Sorry! Old Password is not matched"})

}else{
  if(new_password!=confirm_new_pwd){
    res.status(400).json({errorMessage:"New Password is not confirmed"})
  }else { 
    
  await User.updateOne({username:{$eq:username}},{$set:{password:new_password}}) 

    res.status(200).json({succcessMessage:"Password Changed Succcessfully!"}) 
  }
}
})




//route change_pwd using put method 
router.put("/change_pwd",express.json(),async(req,res)=>{
  console.log(req.body)

  let {username,old_password,new_password,confirm_new_pwd}=req.body
  const dbUser = await User.findOne({username:{$eq:username}})

  if(dbUser!=null){
    if(dbUser.password==old_password){
      if(new_password==confirm_new_pwd){
        await User.updateOne({username:{$eq:username}},{$set:{password:new_password}})
        res.status(200).json({succcessMessage:"password reset successfully"})
      }else{
      res.status(400).json({errorMessage:"sry! new password is not confirmed"})
    }
        }else{
          res.status(400).json({errorMessage:"sorry! old password not match"})
        }
      }else{
        res.status(400).json({errorMessage:"sorry! user is not found"})
      }
    })

    


  
//route reeemove_user using delete method
router.delete("/remove_user",express.json(),async (req,res)=>{

console.log(req.body)
let{username,password} = req.body

const dbUser = await User.findOne({username:({$eq:username})})
if(dbUser!=null && dbUser.password==password){ 

  await User.deleteOne({username:{$eq}})
  res.status(200).json({succcessMessage:"User removed successfully!"})
}else{
  res.status(400).json({errorMessage:"Invalid Username Or  Password"}) 
}

})

// export router 
module.exports = router;
