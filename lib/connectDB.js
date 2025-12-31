const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if(conn){
          console.log("MongoDB Connected SuccesFully");
       }else{
        console.log("MongoDB Not Connected");
       }
    }catch(err){
        console.log("MongoDB connection error:",error);
    }
};
module.exports = connectDB;