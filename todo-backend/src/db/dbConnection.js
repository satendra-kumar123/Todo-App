import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Todo-App"
        })
        console.log("db connected ")
    } catch (error) {
        return error
    }
}

export default dbConnection