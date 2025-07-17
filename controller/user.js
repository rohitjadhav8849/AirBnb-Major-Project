let User= require("../models/user.js");
let passport=require("passport");

module.exports.signupformGet= (req,res)=>{
    res.render("./user/signup.ejs");
}

module.exports.signupformPost =async(req,res)=>{
    try{ 
    let {username,age,email,password} =req.body;
    // console.log(username,age,email,password);
    let newUser =new User({username,email,age});
    let registeredUser=await User.register(newUser,password);
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash("success",`${username} you registered successfully`);
        res.redirect("/lists");
    })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/lists/signup");
    }
}

module.exports.loginGet=(req,res)=>{
    res.render("./user/login.ejs");
}
module.exports.loginPost=(req,res)=>{
    req.flash("success",`Welcome back ${req.user.username}!`);
    if(res.locals.originalPath && res.locals.originalPath.includes("review")){ 
    res.redirect(res.locals.originalPath.split("/review")[0]);//direct login on server restart, path=undefined
    //loggedin not triggerd due to which savpath is empty and originalpath also 
    }
    else if(res.locals.originalPath){
      res.redirect(res.locals.originalPath);
    }
    else{
      res.redirect("/lists");
    }
  
}
module.exports.Logout=(req,res,next)=>{
    req.logout((err)=>{
         return next(err);
    })
    req.flash("success","You are Logged out!!");
    res.redirect("/lists");
}

module.exports.Profile=async(req,res,next)=>{
    try{
        let user= await User.findById(req.user._id);
        res.render("../views/user/info.ejs",{user});
    }
    catch(err){
        req.flash("error","Some error while fetching details");
        res.redirect("/lists");
    }

}