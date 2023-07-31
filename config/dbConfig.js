
import mongoose from "mongoose";

export const connectToDb = async() => {
    mongoose.connect(process.env.MONGO_URI)
    .then((conn)=>{
    console.log(`Database is connected on ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(error.message);
        process.exit(1)
    })

}