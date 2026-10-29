import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.static('./public/temp'))
app.use(cookieParser())

//import controllers.
import { signup, login, updateProfile, logout, me, updatePassword, updateProfilePic } from './controller/user.controller.js';
import { addTodo, deleteTodo, updateTodo, isCompleteTodo } from './controller/todos.controller.js';
import { upload } from './middleware/multer.middleware.js';
import { verifyJwt } from './middleware/auth.middleware.js';

//routes declaration

//1. user routes
app.post('/user/signup', upload.single('profilePic'), signup)
app.post('/user/login', login)
app.post('/user/logout', verifyJwt, logout)
app.patch('/user/update-profile',verifyJwt, updateProfile)
app.post('/user/update-password', verifyJwt, updatePassword)
app.get('/user/me', verifyJwt , me)
app.post('/user/update-profilePic', verifyJwt, upload.single('profileImg'), updateProfilePic)

//2. todo routes
app.post('/todo/add-todo', verifyJwt, addTodo)
app.delete('/todo/delete-todo/:id', verifyJwt, deleteTodo)
app.patch('/todo/update', verifyJwt, updateTodo)
app.patch('/todo/isComplete/:id', verifyJwt, isCompleteTodo)

// error handling function
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: "error",
        err
    })
})

export { app }