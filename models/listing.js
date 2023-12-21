const mongoose=require('mongoose');
// const review = require('./review');
// const  schema  = require('./review.js');
const review=require("./review.js");

const listingschema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is Required'],
    },
    description:String,
    image:{
        
        filename:{
            type:String,
            // default:"listingimage",
        },
        url:{
            type:String,
            // default:"https://media.istockphoto.com/id/543183018/photo/sunrise-on-mount-kanchenjugha-at-dawn-sikkim.jpg?s=1024x1024&w=is&k=20&c=kKQzY7u18ecG3uNaeIQhKlJnEijcVOWyli95XWLdvdk=",
            // set:(v)=>
            // v===' '
            // ? "https://media.istockphoto.com/id/543183018/photo/sunrise-on-mount-kanchenjugha-at-dawn-sikkim.jpg?s=1024x1024&w=is&k=20&c=kKQzY7u18ecG3uNaeIQhKlJnEijcVOWyli95XWLdvdk="
            // :v,
        },
    },
    price:Number,
    location:String,
    country:String,
    selection:{
        type:String,
    },

    reviews : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            },
    },
});

listingschema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}});
    }
})


let Listing=mongoose.model('Listing',listingschema);
module.exports=Listing;