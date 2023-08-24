const express = require("express")
const router = express.Router( )
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Authenticate = require("../MiddleWare/Authtenticate")


require('../db/conn')
const user = require('../model/userSchema')

router.get("/" , (req , res) => {
    res.send("Hello world")
})

// using promises ////////////

// router.post("/register" , (req , res) => {
//     const {name , email ,phone ,work , password , cpassword} = req.body
//     if(!name || !email || !phone  ||!work || !password || !cpassword){
//         return res.status(422).json({ error: "plz filled the field"})
//     }

//     // check unique data

//     user.findOne({email:email}).then((userExist) => {
//         if(userExist){
//             return res.status(422).json({ error: "plz filled the field"}) 
//         }
//         const user_data = new user({name: name , email: email ,phone: phone ,work: work , password: password , cpassword : cpassword})  // store data in DATABASE
       
//         user_data.save().then(() => {
//             res.status(201).json({message: "register suceesful"})
//         }).catch((e) => {
//             return res.status(500).json({ error: "Failed to register"}) 
//         })
//     }).catch((e) => {
//         console.log(e)
//     })


// using Async await ////////////////

    router.post("/register" , async(req , res) => {

        try{

        const {name , email ,phone ,work , password , cpassword} = req.body

        if(!name || !email || !phone  ||!work || !password || !cpassword){
            return res.status(422).json({ error: "plz filled the field"})
        }
    
        // check unique data
        const userExist =   await user.findOne({email:email})
        if(userExist){
            return res.status(422).json({ error: "plz filled the field"}) 
        } else if (password !== cpassword){
            return res.status(422).json({ error: "plz filled the field"}) 
        }else {

        const user_data = new user({name: name , email: email ,phone: phone ,work: work , password: password , cpassword : cpassword})  // store data in DATABASE
        
        const user_register = await user_data.save()

        if (user_register){
            res.status(201).json({message: "register suceesful"})
        }
        else{
            return res.status(500).json({ error: "Failed to register"})  
        }

        }}catch(e) {        
        console.log(e)

        }
        
})

// Login Route //////////

router.post("/signin" , async(req , res) => {
    try{
        let token;
        const {email , password} = res.body
        if (!email || !password) {
            return res.status(422).json({ error: "plz filled the field"}) 
        }
        const userExist =   await user.findOne({email:email})
        const isMatch = await bcrypt.compare(password , userExist.password )

        token = await userExist.generateAuthToken()
        res.cookie("jwtoken" , token , {
            expires: new Date(Date.now() + 25892000000) ,  // expires in 30 days
            httpOnly: true
        })  // token name and token value

        if(!userExist){
            return res.status(500).json({ error: "Failed to login"})  
        } else if(!isMatch){
            return res.status(500).json({ error: "Failed to login"})  
        }
        else{
            console.log("user login")
            res.json({message: "loginb successful"})
        }

       

    }
    catch(e) {

    }
})

/// About Page

router.get("/About" , Authenticate ,async(req , res) => {
    console.log()
    res.send(req.rootUser)
})

// Contact page

router.get("/getData" , Authenticate ,async(req , res) => {
    console.log()
    res.send(req.rootUser)
})

router.post("/contact" , Authenticate ,async(req , res) => {
    try{
        const {name , email , phone , message} = req.body
        if(!name || !email || !phone || !message){
            console.log("error message")
            return res.json({error: "Plz filled the data"})
        }
        const userContact = user.findOne({_id: req.userID})
        if (userContact) {
            const userMessage = await userContact.addMessage(name , email , phone , message)
            await userMessage.save()
            res.status(201).json({message: "user data save"})

        }
    }
    catch(error){

    }
})

// Logout

router.get("/logout" , Authenticate ,async(req , res) => {
    console.log()
    res.clearCookie('jwttoken' , {path:"/"})
    res.send(req.rootUser)
})



module.exports = router