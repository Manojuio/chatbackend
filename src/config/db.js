const mongoose = require('mongoose');
const connectDB = async () =>{
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected');
    }catch(error){
        console.error("MONGO CONNECTION FAILED");
        process.exit(1);
    }
    
};
module.exports = connectDB;