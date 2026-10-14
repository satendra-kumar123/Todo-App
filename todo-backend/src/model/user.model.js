import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profilePic: {
        url: {
            type: String,
            default: ""
        },
        publicId: {
            type: String,
            default: ""
        }
    },
    mob: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            mob : this.mob,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)