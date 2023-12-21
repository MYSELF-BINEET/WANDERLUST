const express = require('express');
const app = express();
const port = 8080;
const path=require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

const wrapAsync= require("./utils/wrapAsyns.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema, reviewSchema}=require("./schema.js");
const session=require("express-session");
const flash=require("connect-flash");
// const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");



if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}
// console.log(process.env.SCERET);


const mongoose = require('mongoose');

const Listing = require('./models/listing.js');
const Review= require('./models/review.js');

const dbUrl=process.env.ATLASDB_URL;
// const mongoUrl='mongodb://127.0.0.1:27017/wanderlust';




main()
.then(()=>{
    console.log("connected to db");
})
.catch((err) => console.log(err));


// const mongoUrl='mongodb://127.0.0.1:27017/wanderlust';



async function main() {
  await mongoose.connect(dbUrl);
}



const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret: process.env.SCERET,
  },
  touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE",err);
})

const sessionOptions={
  store:store,
  secret:process.env.SCERET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
  }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());   
// app.use(Session(sessionOptions));
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
});
 
// app.use((req,res,next)=>{
//   res.locals.error=req.flash("error");
//   next();
// });

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


const ejsMate=require("ejs-mate");
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname,'/public')));
// let samplelisting=new Listing({
//     title:'my new villa',
//     description:'my the beach',
//     price:1200,
//     location:'calangute,goa',
//     country:'india',
// });

// samplelisting.save().then((res)=>{
//     console.log(res);
// })



// app.get("/listings/find",async(req,res)=>{
//   console.log("good");
//   let search=req.query;
//   for(listing of Listing){
//     if(search.searchbar=listing.title){
//        let id=listing._id;
//        const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
//        if(!listing){
//          req.flash("error","Could not find that listing.");
//          return res.redirect("/listings");
//        }
//        res.render("listings/show.ejs",{listing})
//     }
//   }

// })

  // for listing route

   app.use("/listings",listingsRouter);


// fot review  route
   app.use("/listings/:id/reviews", reviewsRouter);
   app.use("/",userRouter)

// app.use((session()));


// app.get('/', (req, res) => {
//   res.send('root is working');
// })

// app.get("/getdemouser",async(req,res)=>{
//   let fakeUser=new User({
//     email:"bineet@gmail.com",
//     username:"dislike123",
//   });
//   let registerUser=await User.register(fakeUser,"helloworld");
//   res.send(registerUser);
// })


app.all("*",(req,res , next)=>{
  next(new ExpressError(404, "page not found"));
})
app.use((err, req, res ,next)=>{
  let{statusCode=500, message="something went wrong"}=err;
  res.status(statusCode).render("error.ejs",{err});
  // res.status(statusCode).send(message);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})