const mongoose = require('mongoose');
const connectDB = async () =>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MONGO DB connected');
    }catch(error){
        console.error("MONGO DB CONNECTION FAILED");
        process.exit(1);
    }
    
};
module.exports = connectDB;