const checkAuth = function (req, res, next) {
    if(req.cookies?.accessToken){
        return next()
    } else {
        return res.status(400).send("not a user")
    }
}

export default checkAuth