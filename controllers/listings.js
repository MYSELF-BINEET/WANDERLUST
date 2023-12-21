const Listing=require("../models/listing.js");
// const ejsLint = require('ejs-lint');

// const mbxClient = require('@mapbox/mapbox-sdk');
// const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index=async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs", {allListings});
  };

  module.exports.renderNewFrom= async(req,res)=>{
    res.render("listings/new.ejs");
  };

  module.exports.postListing=async (req,res,next)=>{
  let response=  await geocodingClient.forwardGeocode({
      query:req.body.listing.location ,
      limit:1,
    }).send();

    // console.log();
    // res.send("done");
    
    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url,"    ",filename);
    // console.log(req.body.listing.selection);


    // res.send(req.body.listing);
    let newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    newlisting.geometry=response.body.features[0].geometry;
   let savelisting= await newlisting.save();
  //  console.log(savelisting);
    req.flash("success","New listing added!");
    res.redirect("/listings");
  };


  module.exports.renderShowFrom= async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    if(!listing){
      req.flash("error","Could not find that listing.");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing})
  };


  module.exports.showEditPage=async (req,res)=>{
    let{id}=req.params;
    
    const listing=await Listing.findById(id);
    if(!Listing){
      req.flash("error","Could not find that listing.");
      return res.redirect("/listings");
    }
    let originalurl=listing.image.url;
   originalurl= originalurl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs",{listing,originalurl});
  };

  module.exports.uptadeListing=async(req,res)=>{
    if(!req.body.listing){
      throw new ExpressError(400, "send a valid data for listings");
    }
    let{id}=req.params;
    let updatedlisting={...req.body.listing};
 
  let listing=  await Listing.findByIdAndUpdate(id,updatedlisting);
  if(typeof  req.file!= "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
  }
   
    req.flash("success","Listing  Updated!");
     res.redirect(`/listings/${id}`);
  };

  module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    
     await Listing.findByIdAndDelete(id);
     req.flash("success","Listing is deleted!");
    
    res.redirect('/listings');
  };

  module.exports.search=async(req,res)=>{
    // console.log("good");
    let search=req.query;
    const allListings= await Listing.find({location:search.searchbar});
    

    res.render("listings/index.ejs", {allListings});
    // req.flash("success","good");
  //   const sallListings= await Listing.find({});
  //   for(let listing of sallListings){
  //     if(listing.location!=search.searchbar){
  //       res.send("good");
  //       // req.flash("error","There is no hotel around this area");
  //       // res.redirect("/listings");
  //     }
  // }

};
  
  module.exports.trending=async(req,res)=>{
    const allListings= await Listing.find({selection:"TRENDING"});
    res.render("listings/index.ejs", {allListings});
  };  

  module.exports.rooms=async(req,res)=>{
    const allListings= await Listing.find({selection:"ROOMS"});
    res.render("listings/index.ejs", {allListings});
  };  

  module.exports.mountain=async(req,res)=>{
    const allListings= await Listing.find({selection:"MOUNTAIN"});
    res.render("listings/index.ejs", {allListings});
  };  

  module.exports.arctic=async(req,res)=>{
    const allListings= await Listing.find({selection:"ARCTIC"});
    res.render("listings/index.ejs", {allListings});
  };  
  module.exports.camping=async(req,res)=>{
    const allListings= await Listing.find({selection:"CAMPING"});
    res.render("listings/index.ejs", {allListings});
  };  

  module.exports.firms=async(req,res)=>{
    const allListings= await Listing.find({selection:"FIRMS"});
    res.render("listings/index.ejs", {allListings});
  };  

  module.exports.snow=async(req,res)=>{
    const allListings= await Listing.find({selection:"SNOW"});
    res.render("listings/index.ejs", {allListings});
  };  
  module.exports.sea=async(req,res)=>{
    const allListings= await Listing.find({selection:"SEA"});
    res.render("listings/index.ejs", {allListings});
  };  
  module.exports.cities=async(req,res)=>{
    const allListings= await Listing.find({selection:"CITIES"});
    res.render("listings/index.ejs", {allListings});
  };  

  module.exports.castles=async(req,res)=>{
    const allListings= await Listing.find({selection:"CASTLES"});
    res.render("listings/index.ejs", {allListings});
  };  






