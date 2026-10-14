import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

export const Todos = mongoose.model("Todos", todoSchema)