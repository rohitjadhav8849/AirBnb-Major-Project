let mongoose =require('mongoose');

//want review because after deletion of lists we want review also to be deleted
let review = require("./review.js");

let chatschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    
    // image: {//this is an object
    //     type: {
    //       url: {
    //         type: String,
    //         required: true,
    //         default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //       },
    //     },
    //     default: {
    //       url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    //     },
    // },
    image:{
        url:String,
        filename:String
    },

    price:{
        type:Number,
        default:1200,
        min:0
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    review:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

})

//as review is related to lists
//use pre,post 
chatschema.post("findOneAndDelete",async(listing)=>{
//    console.log(lists);//this will give the data after deletion
if(listing){
    await review.deleteMany({_id:{$in: listing.review}});
}
})



let lists = mongoose.model("lists",chatschema);
module.exports=lists;
