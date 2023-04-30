require("dotenv").config()
const express=require("express");
const db=require("./db/connect")
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors())
db();
const axios=require("axios");
const pretty=require("pretty")
const cheerio=require("cheerio");
const products=require("./models/products.models");

const { Collection } = require("mongoose");






const flipkartUrl="https://www.flipkart.com/search?q=mobiles&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=off&as=off&as-pos=1&as-type=HISTORY";

const getAllProducts=async()=>{
    


    try{ 
        let response=await axios.get(flipkartUrl)

const $= cheerio.load( response.data)


let mobiles=$("._3pLy-c")

let allProductsDetails=[]
mobiles.map((item,index)=>{
    let image=$("._396cs4").attr("src")
let title=$(index).find("._4rR01T").text();
let rating=$(index).find("._3LWZlK").text()
let price=$(index).find("._3I9_wc ").text()
let finalPrice=$(index).find("._30jeq3 ,._3Ay6Sb > span ").text()
console.log(finalPrice)
allProductsDetails.push({image,title,rating,price,finalPrice})

})

    const createProdcuts=await products.create(allProductsDetails)
    console.log("products has been successfuly added")

    app.use("/products",(req,res)=>{
        res.status(200).send({message:"all products got",data:allProductsDetails})
    })
    
    }catch(er){
    console.log("error while adding products")
    }
}

getAllProducts();


const port=process.env.port||8000;

app.listen(port,()=>{
    console.log("port is running")
})


app.get(("/"),(req,res)=>{
res.status(200).send({message:"facebook scarping"})
});

app.get(("/products",(req,res)=>{

    
}))

setInterval(async()=>{

const remove=await products.collection.drop();

getAllProducts();

},20000)


