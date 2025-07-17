let lists= require("../models/lists.js");

module.exports.createListing=async (request,result,next)=>{
    let {data}= request.body;
    let info= new lists(data);
    info.owner=request.user._id;
    let filename=request.file.filename;
    let url =request.file.path;
    info.image={url,filename};
    await info.save();
    request.flash("success","New stay added successfully!!!");
    result.redirect("/lists");
    console.log("saved");
}

module.exports.editlistsGet=async (request,result,next)=>{
    let {id}=request.params;
    let data=await lists.findById(id);
    if(!data){
        request.flash("error","stay that you want to update not found");
        result.redirect("/lists");
    }
    result.render("./lists/edit.ejs",{data});
}

module.exports.editlistsPost=async (request,result,next)=>{
    let {id}=request.params;
    let current =await lists.findByIdAndUpdate(id,{...request.body.lists});
    
    if(typeof request.file !== "undefined"){
        let filename=request.file.filename;
        let url =request.file.path;
        current.image={url,filename};
        await current.save();
    }
    request.flash("success","Stay updated successfully");
    result.redirect(`/lists/${id}`);
}

module.exports.readLists=async (request,result)=>{
    let {id}=request.params;
    let one= await lists.findById(id).populate({path:"review" ,populate:"author"}).populate("owner");
    if(!one){
        request.flash("error","stay not found");
        result.redirect("/lists");
    }
    result.render("./lists/detail.ejs",{one});
}

module.exports.destroyList=async (request,result)=>{
    let{id}=request.params;
    await lists.findByIdAndDelete(id);
    request.flash("success","Stay deleted!!");
    result.redirect("/lists");
}