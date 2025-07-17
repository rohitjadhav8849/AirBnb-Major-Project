let express= require("express");
let router= express.Router({mergeParams:true});


let lists = require("../models/lists.js");
let review =require("../models/review.js");
//asyncwrap
let asyncwrap =require("../extra/asyncwrap.js");
//custom Error handling class
let ExpressError= require("../extra/ExpressError.js");


//Validation of review
let {reviewValidationMiddle,LoggedIn}= require("../middleware.js");
const Review = require("../models/review.js");

let ReviewController= require("../controller/review.js");

//concept== take out common part ,write in index.js
// /lists/:id/review
//review
router.post("/:id/review",reviewValidationMiddle,LoggedIn,asyncwrap (ReviewController.addReview));

//review delete
router.delete("/:id/review/:reviewid",LoggedIn,asyncwrap(ReviewController.destropReview));

module.exports=router;