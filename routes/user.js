let express = require("express");
let router = express.Router();

let User= require("../models/user.js");
let passport=require("passport");

//asyncwrap
let asyncwrap =require("../extra/asyncwrap.js");
//custom Error handling class
let ExpressError= require("../extra/ExpressError.js");

//checking login info and saving path
let {LoggedIn,savepath}=require("../middleware.js");

let usercontroller=require("../controller/user.js");

router.get("/signup",usercontroller.signupformGet);
router.post("/signup",asyncwrap(usercontroller.signupformPost));

router.get("/profile",LoggedIn, usercontroller.Profile);

router.get("/login",usercontroller.loginGet);
router.post("/login",savepath,passport.authenticate("local",{failureRedirect:"/lists/login",failureFlash:true}),usercontroller.loginPost)

router.get("/logout",usercontroller.Logout);

module.exports = router;