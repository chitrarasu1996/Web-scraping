
const userModel=require("../models/user.miodels")
const bcrypt=require("bcrypt")

exports.registerUser=async(req,res)=>{
try {
    const {name,email,password}=req.body;
 const oldUser=await userModel.findOne({email})
 
 if(oldUser){
   return res.status(200).send({message:"your already Registred"})
 }
 const saltingRound=12;

 const hashpass=await bcrypt.hash(password,saltingRound);

 const regieteredUser=await userModel({userName:name,email,password:hashpass}).save()
if(regieteredUser){
   return res.status(201).send({success:true,message:"user succesfuuly Registered"})
}else{
   return res.status(400).send({success:false,message:"error while registering user"})
    
}

} catch (error) {
 console.log(error)   
 res.status(500).send({message:"internal server error"})
}
}

exports.loggedUser=async(req,res)=>{
    try {
        const {email,password}=req.body
    
const foundUser=await userModel.findOne({email})
if(!foundUser)
{
    return res.status(200).send({success:false,message:"user not registered user"})
}

 const comparePass = await bcrypt.compare(password,foundUser.password)
  
if(!comparePass){
return res.status(200).send({success:false,message:"password doesn't not match"})
} 

 res.status(201).send({success:true,message:"user Logged Successfully",foundUser})
    } catch (error) {
        res.status(500).send({message:"internal server error"})
        console.log(error)
    }
}