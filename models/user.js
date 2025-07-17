const { required, number } = require("joi");
let mongoose= require("mongoose");
let Schema=mongoose.Schema;

let passportLocalMongoose= require("passport-local-mongoose");

let userschema= new Schema({
   email:{
    type:String,
    required:true,
   },
   age:{
    type:Number,
    required:true
   }
   //no need of username and password
})
userschema.plugin(passportLocalMongoose);

module.exports=mongoose.model("user",userschema);