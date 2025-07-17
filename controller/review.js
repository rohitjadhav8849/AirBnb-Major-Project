let lists= require("../models/lists");
let review = require("../models/review");


module.exports.addReview=async(req,res,next)=>{
  let {id}= req.params;
  let specificlist = await lists.findById(id);
  let newreview = new review(req.body.review);
  newreview.author= req.user._id;
  specificlist.review.push(newreview);
  await newreview.save();
  await specificlist.save();
  req.flash("success","Review added successfully!!");
  res.redirect(`/lists/${id}`);
}

module.exports.destropReview=async(req,res,next)=>{
    let {id,reviewid}= req.params;
    let oneRew= await review.findById(reviewid);
    if(String(oneRew.author._id) !== String(req.user._id)){ 
     req.flash("error","You are not the author of this review!");
     return res.redirect(`/lists/${id}`);
    }
    await review.findByIdAndDelete(reviewid);
    await lists.findByIdAndUpdate(id,{$pull:{review:reviewid}}); 
    req.flash("success","Review deleted!!");
    res.redirect(`/lists/${id}`);
 }