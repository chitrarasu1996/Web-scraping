const mongoose=require("mongoose");

const productsSchema=mongoose.Schema({
   
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
rating:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true
},
finalPrice:{
    type:String,
    required:true
}

})
module.exports=mongoose.model("products",productsSchema)