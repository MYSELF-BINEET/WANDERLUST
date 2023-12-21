const express=require("express");

const router=express.Router();
const User=require("../models/user.js");
const wrapAsync= require("../utils/wrapAsyns.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const listingController=require("../controllers/user.js")




router.get("/login",listingController.login);

router.post("/login",saveRedirectUrl, passport.authenticate("local",{failureRedirect:'/login' ,failureFlash:true}),wrapAsync(listingController.postLogin));


router.get("/signup",wrapAsync(listingController.signup))





router.post("/signup",listingController.postSignup);




router.get("/logout",wrapAsync(listingController.logout));


module.exports=router;