const express=require("express");
const { registerUser, loggedUser } = require("../controller/user.controller");
const router=express.Router();

router.post("/register-user",registerUser)

router.post("/login-user",loggedUser)
module.exports= router