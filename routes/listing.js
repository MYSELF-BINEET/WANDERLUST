const express=require("express");

const router=express.Router();
const Listing = require('../models/listing.js');
const review =require('../models/review.js')
const User=require("../models/user.js");
// const ejsLint = require('ejs-lint');


const wrapAsync= require("../utils/wrapAsyns.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const LocalStrategy=require("passport-local");
const passport = require("passport");
const {isLoggedIn, isOwner}=require("../middleware.js");
// const { default: isAuthenticated } = require("@nirangad/is-authenticated");

const listingControlller=require("../controllers/listings.js");

const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
// const { route } = require("./listing.js");
const upload = multer({storage});




const validateListing= (req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    // console.log(result);
    if(error){
      let errMsg= error.details.map((el)=>el.massage).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
}


router.get('/find', listingControlller.search);

router.get("/trending",listingControlller.trending);
router.get("/rooms",listingControlller.rooms);
router.get("/cities",listingControlller.cities);
router.get("/mountain",listingControlller.mountain);
router.get("/castles",listingControlller.castles);
router.get("/arctic",listingControlller.arctic);
router.get("/camping",listingControlller.camping);
router.get("/firms",listingControlller.firms);
router.get("/snow",listingControlller.snow);
router.get("/sea",listingControlller.sea);

//index route
router.get("/", wrapAsync(listingControlller.index) );

//new form of hotel add

  router.get("/new",isLoggedIn, listingControlller.renderNewFrom);

  //search 


  //new hotel add

  
  router.post("/", isLoggedIn , upload.single('listing[image]'), wrapAsync(listingControlller.postListing));
  // router.post("/", upload.single('listing[image]'),(req,res)=>{
  //   res.send(req.file);
  // });
  //show listing
  router.get("/:id", wrapAsync(listingControlller.renderShowFrom));

  //edit foem
  
  router.get("/:id/edit",isLoggedIn, wrapAsync(listingControlller.showEditPage));
  
  //uptade route
  router.put("/:id",isLoggedIn,isOwner,  upload.single('listing[image]'),wrapAsync(listingControlller.uptadeListing));
  
  
  
  //delete this listings
  
  


router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingControlller.destroyListing));

  module.exports=router;