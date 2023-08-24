const jwt = require("jsonwebtoken")
const user = require("../model/userSchema");

const Authentication = async(req, res, next) => {
    try{
        const token = req.cookies.jwttoken;
        const verifytoken = jwt.verify(token , process.env.SECRETKEY)
        const rootUser = await user.findOne({ _id: verifytoken._id , "tokens.token":token});

        if(!rootUser) {
            throw new Error('user not found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id

        next();
    }
    catch(error){
        res.status(401).send('Unautorized')
        console.log(err)
    }

}

module.exports = Authentication