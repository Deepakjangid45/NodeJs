import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`server is running at port  : ${process.env.PORT}`)
        });
    })
    .catch((err) => {
        console.log("mongodb connection failed", err)
    })
/**
 * 
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log(`Error ${error}`);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listning at port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
})()
 * 
*/