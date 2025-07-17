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


let initdata =require("./data.js");


let lists = require("../models/lists.js");//look here used ..

let start = async ()=>{
   await lists.deleteMany({});
   initdata.data = initdata.data.map(obj => ({
    ...obj, 
    owner: "67ace0aa65d64e70e1a422dd"
}));
   await lists.insertMany(initdata.data);
   console.log("done");
}

start();


