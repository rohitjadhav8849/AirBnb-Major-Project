const { string } = require('joi');
let mongoose =require('mongoose');
let Schema =mongoose.Schema;

let reviewSchema =new Schema({
  content:{
    type:String,
  },
  rating:{
    type:Number,
    min:1,
    max:5
  },  
  createdat:{
    type:Date,
    default:Date.now(),
  },
  author:{
        type:Schema.Types.ObjectId,
        ref:"user"
  }
});

module.exports = mongoose.model("review",reviewSchema);