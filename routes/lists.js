let express = require("express");
let router = express.Router();


let lists = require("../models/lists.js");
let review =require("../models/review.js");

let multer= require("multer");
require('dotenv').config(); 
let {storage}= require("../cloudconfig.js");
let upload=multer({storage});//multer sends file to cloudinary

//asyncwrap
let asyncwrap =require("../extra/asyncwrap.js");



//Validation of main Schema Middleware
//chacking login info and isowner checks that owner itself is editing or any other
let {LoggedIn,isowner,ValidationSchema}=require("../middleware.js");

//home
router.get("/",asyncwrap(async (request,result,next)=>{
    let data = await lists.find();
    result.render("./lists/home.ejs",{data});
}));

let Listingcontroller= require("../controller/lists.js");

//keeping /new above /:id
router.get("/new",LoggedIn,(req,res)=>{
    res.render("./lists/form.ejs");
})
router.post("/",upload.single("image[url]"),ValidationSchema,LoggedIn,asyncwrap( Listingcontroller.createListing));

//edit route
router.get("/:id/edit",LoggedIn,isowner, asyncwrap( Listingcontroller.editlistsGet));
router.put("/:id", LoggedIn, isowner,upload.single("data[image]"),ValidationSchema,asyncwrap(  Listingcontroller.editlistsPost));

//read route
router.get("/:id",asyncwrap(Listingcontroller.readLists));

//delete
router.delete("/:id",LoggedIn,isowner,asyncwrap ( ));

module.exports = router;