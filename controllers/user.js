const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const User=require("../models/user.js");

module.exports.login=(req,res)=>{
    res.render("users/login.ejs");
    // res.send("good");
};




module.exports.postLogin=async(req,res)=>{
    // console.log(User);
    req.flash("success","welcome to wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};



module.exports.signup=(req,res)=>{
    res.render("users/signup.ejs");
    // res.send("good");
};


module.exports.postSignup=async(req,res)=>{
    try{
        let{username, email,password}=req.body;
    const newUser= new User({email, username});
    let registeruser=await User.register(newUser,password);
    // console.log(registeruser);
    req.login(registeruser,(err)=>{
        if (err) {
            return next(err);
        }
        req.flash("success","welcome back to wanderlust");
        res.redirect("/listings");

    })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("./signup");
    }
    
};

module.exports.logout=async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
};