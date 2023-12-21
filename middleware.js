const Listing=require("./models/listing.js");
const Review=require("./models/review.js");

module.exports.isLoggedIn=(req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be login first");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let updatedlisting={...req.body.listing};
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error","you dont have permission to edit");
      return res.redirect(`/listings/${id}`);
    }
    next();
};



module.exports.isReviewAuthor=async(req,res,next)=>{
  let{id,reviewId}=req.params;
  // let updatedlisting={...req.body.listing};
  let review= await Review.findById(reviewId);
  // let listing= await Listing.findById(id);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","you dont have permission to delete");
    return res.redirect(`/listings/${id}`);
  }
  next();
};