import { User } from "../model/user.model.js"
import jwt from 'jsonwebtoken'

async function verifyJwt(req, res, next) {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!accessToken) {
            return res.status(401).json({msg:"token not available"})
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if(!decodedToken){
            return res.status(401).json({
                message: "user not registered"
            })
        }

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user) {
            return res.status(401).json({msg: "user not available"})
        }
        req.user = user
        return next();
    } catch (error) {
        next(error)
    }
    
}

export { verifyJwt }