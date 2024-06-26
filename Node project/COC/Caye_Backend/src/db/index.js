import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connect !! DB Host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connect error", error)
        process.exit(1);
    }
}

export default connectDB;   