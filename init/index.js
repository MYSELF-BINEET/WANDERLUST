const express = require('express');
const app = express();
const port = 8080;

const mongoose = require('mongoose');

const Listing = require('../models/listing.js');
const initData=require('./data.js')

main()
.then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:"657db5a3f4912acaf718c458"}));
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
};

initDB();