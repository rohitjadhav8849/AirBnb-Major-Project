const express =require('express');
const app= express();
app.listen(8080,()=>{
    console.log("we are listening no port 8080");
})

let mongoose = require('mongoose');
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/picnic");
}
main()
.then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})


let path=require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));//for post method to read the coming data
app.use(express.static(path.join(__dirname,"public")));

let methodoverride =require('method-override');
app.use(methodoverride("_method"));

let ejsmate=require('ejs-mate');
app.engine('ejs',ejsmate);

//custom Error handling class
let ExpressError= require("./extra/ExpressError.js");

//Authentication
let passport= require("passport");
let Localstratergy= require("passport-local");
let user= require("./models/user.js");


let session=require("express-session");
app.use(session({
    secret:"thisIsSecretForWebsite",
    resave:false,
    saveUninitialized:false,
    cookie:{
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true //saving from XSS attacks ,from stealing cookie
    }
}));
let flash=require("connect-flash");
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());//to keep updated about the session time that request received is in session or not
passport.use(new Localstratergy(user.authenticate()));//passport using passport-local stratergy
passport.serializeUser(user.serializeUser());//User into the session
passport.deserializeUser(user.deserializeUser());//User out of the session

//flash messsage
app.use((req,res,next)=>{
    res.locals.currentuser= req.user || null;
    res.locals.successMsg= req.flash("success")[0] || null ;//null done to not show after refresh 
    res.locals.deleteMsg= req.flash("Deletion")[0] || null ;//null done to not show after refresh 
    res.locals.error= req.flash("error")[0] || null ;//null done to not show after refresh 
    next();
})


app.get("/",(req,res)=>{
    res.send("Home route");
})


//user routes
const userRoute =require("./routes/user.js");
app.use("/lists",userRoute);

//whole lists routes
const showLists= require("./routes/lists.js");
app.use("/lists",showLists);

//whole review route
const showreview= require("./routes/review.js");
app.use("/lists",showreview);

// app.all("*",(req,res,next)=>{
//     next( new ExpressError(404,"page not found"));
// })
// app.use((err,req,res,next)=>{
//     let {status=500,message="something went wrong"}=err;
//     // res.status(status).send(message);
//     res.status(status).send(res.render("./error.ejs",{message}));
// })