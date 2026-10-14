import { comparePassword, hashingPassword } from '../auth/hashFun.js'
import { User } from '../model/user.model.js'
import { deleteFromCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js'
import { Todos } from '../model/todos.model.js'

async function generateAccessAndRefreshToken(userId) {
    const user = await User.findOne(userId)
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})
    return {accessToken, refreshToken}

}

async function signup(req, res) {
    const {username, mob, password } = req.body
    if(username == '' || mob == '' || password == ''){
        return res.status(400).json({
            message: 'all fields all required',
        })
    }
    const localfilePath = req.file?.path
    let url = ""
    let publicId = ""
    if(localfilePath) {
        const respond = await uploadOnCloudinary(localfilePath)
        if(respond){
            url = respond?.secure_url
            publicId = respond?.public_id
        }
    }
    
    const hashedPassword = await hashingPassword(password)

    const user = await User.create({
        username,
        mob,
        password: hashedPassword,
        profilePic:{
            url,
            publicId
        },
    })
    if(!user) {
        return res.status(401).json({
            message: 'user not created'
        })
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    
    const userRef = user.toObject()
    delete userRef.password
    delete userRef.refreshToken
    delete userRef.profilePic.publicId

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(201)
    .cookie('accessToken', accessToken, {...options, maxAge: 24*60*60*1000})
    .cookie('refreshToken', refreshToken, {...options, maxAge: 7*24*60*60*1000})
    .json({
        user: userRef,
        message: 'user succussfully registered',
    })
}

async function login(req, res) {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message: 'user or password is wrong'
            })
        }

        const hashedPassword = user.password
        const result = await comparePassword(password, hashedPassword)
    
        if(!result){
            return res.status(400).json({
                message: 'your password is wrong'
            })
        }
        
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


        if(!loggedInUser) {
            return res.status(400).json({
                message: "user not logged in here"
            })
        }
        const options = {
            httpOnly: true,
            secure: true,
        }
        return res
        .status(201)
        .cookie('accessToken', accessToken, {...options, maxAge: 24*60*60*1000})
        .cookie('refreshToken', refreshToken, {...options, maxAge: 7*24*60*60*1000})
        .json({
            user: loggedInUser,
            message: 'user succussfully login'
        })
    } catch (error) {
        res.status(400).json({message: error})
    }
}

async function updateProfile(req, res) {
    try {
        const {username, mobile:mob} = req.body

        if(username == "" || mob == "") {
            return res.status(400).json({
                message: "empty field not allowed"
            })
        }

        const user = await User.findById({_id: req.user?._id})

        user.username = username
        user.mob = mob

        const updatedUser = await user.save()

        if(!updatedUser) {
            return res.status(400).json({
                message: "user not updated"
            })
        }

        return res.status(201).json({
            message: "update field",
            username: updatedUser.username,
            mob: updatedUser.mob
        })
    } catch (error) {
        return res.status(400).json({message: error})
    }
}

async function updatePassword(req, res) {
    try {
        const {currentPassword, newPassword, conformPassword} = req.body
        const user = await User.findById({_id: req.user?._id})
        const hashedPassword = user.password

        const result = await comparePassword(currentPassword, hashedPassword)
        console.log(result)
        if(!result){
            return res.status(400).json({
                message: "password not matched"
            })
        }

        if(newPassword !== conformPassword) {
            return res.status(500).json({
                message: "password not same"
            })
        }

        const password = await hashingPassword(newPassword)
        user.password = password
        const updatedPassword = await user.save({validateBeforeSave: false})
        if(!updatedPassword) {
            return res.status(400).json({
                message: "password not saved"
            })
        }

        return res.status(201).json({
            message: "password updated"
        })

    } catch (error) {
       return res.status(400).json({message: error})
    }
}

async function logout(req, res) {
    const id = req.user?._id
    await User.findByIdAndUpdate(
        id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie('accessToken', {...options, maxAge: 24*60*60*1000})
    .clearCookie('refreshToken', {...options, maxAge: 7*24*60*60*1000})
    .json({
        message: 'user logged out successfully'
    })
}

async function me(req, res) {
    const user = req.user
    const todos = await Todos.find({createdBy: user._id})
    return res.status(200).json({
        message: "you are authenticated",
        user,
        todos
    })
}

async function updateProfilePic(req, res) {
    try {
        const profileImg = req.file
        if(!profileImg) {
            return res.status(400).json({
                message: 'select img'
            })
        }

        const user = await User.findOne({_id: req.user?._id})
        if(!user) {
            return
        }

        let url
        let publicId

        const profilePicPublicId = user.profilePic?.publicId
        if(profilePicPublicId) {
            const response = await deleteFromCloudinary(profilePicPublicId)
            if(!response) {
                return res.status(400).json({
                    message: "old pic not deleted"
                })
            } else {
                user.profilePic = {
                    url : "",
                    publicId : ""
                }
                user.save({validateBeforeSave: false})
            }
        }

        const localfilePath = profileImg?.path

        const respond = await uploadOnCloudinary(localfilePath)

        

        if(!respond) {
            return res.status(400).json({
                    message: "pic not uploaded on cloudinary"
            })
        }

        url = respond.url
        publicId = respond.public_id

        user.profilePic = {
            url,
            publicId
        }

        const createdUser = await user.save({validateBeforeSave: false})
        if(!createdUser) {
            return res.status(400).json({
                    message: "user not created"
            })
        }

        return res.status(200).json({
            message: "pic is updated",
            url
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

export { signup, login, updateProfile, updatePassword, updateProfilePic, logout, me}