const express=require("express");

const router=express.Router({mergeParams:true});

const Review= require('../models/review.js');


const wrapAsync= require("../utils/wrapAsyns.js");
const ExpressError=require("../utils/ExpressError.js");
const { ListingSchema,reviewSchema}=require("../schema.js");
const reviews=require("../routes/review.js");
const Listing = require('../models/listing.js');
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");

const listingController=require("../controllers/reviews.js");


const validateReview= (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    // console.log(result);
    if(error){
      let errMsg= error.details.map((el)=>el.massage).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
    }

//Reviews 
// post route

router.post("/",isLoggedIn, wrapAsync(listingController.postRoute));
  
  
  // DELETE REVIEW ROUTE
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(listingController.deleteReview));

  module.exports=router;