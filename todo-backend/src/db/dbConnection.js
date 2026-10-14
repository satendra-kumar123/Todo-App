import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/Todo_DB`)
    } catch (error) {
        return error
    }
}

export default dbConnection