import mongoose from "mongoose";

const connectToMongoDb = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/expense_app");
        console.log("Connected successfully");
    }catch(error){
        console.log("Error connecting to MongoDb",error.message);
    };
};

export default connectToMongoDb;