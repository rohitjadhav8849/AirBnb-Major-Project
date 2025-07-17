let lists= require("./models/lists.js");
let ExpressError=require("./extra/ExpressError.js");
let {MainValidationSchema,reviewValidation} = require("./models/validationMain.js");

module.exports.LoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.originalPath=req.originalUrl;
        req.flash("error","You have to login first");
         return res.redirect("/lists/login");
    }
    next();
}

module.exports.savepath=(req,res,next)=>{
    if(req.session.originalPath){
        res.locals.originalPath=req.session.originalPath;
    }
    next();
}

module.exports.isowner= async (req,res,next)=>{
    //to check owner is editing or other
    let {id}=req.params;
    let current =await lists.findById(id);
    if(String(current.owner._id) !== String(res.locals.currentuser._id)){
        req.flash("error","You don't have permission");
        return res.redirect(`/lists/${id}`);
    }
    next();
}
module.exports.ValidationSchema = (req,res,next)=>{
    if (req.file) {
        req.body.data.image = {
            url: req.file.path,  // Cloudinary/Multer file URL
            filename: req.file.filename
        };
    }
    let {error} = MainValidationSchema.validate(req.body);
    console.log(req.body);
    if(error){
        let errmsg = error.details.map((el) =>el.message).join(",");
        throw  new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}
module.exports.reviewValidationMiddle = (req,res,next)=>{
    let {error} = reviewValidation.validate(req.body);
    if(error){
        let errmsg = error.details.map((el) =>el.message).join(",");
        throw  new ExpressError(400,errmsg);
    }
    else{next();}
}
