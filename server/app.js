const express = require("express")
const moongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()

dotenv.config({ path: './congif.env'});
// const db = "mongodb+srv://pranjalunoffical:Pranjal%40123@cluster0.wzdinfo.mongodb.net/Mern_stack?retryWrites=true&w=majority"

require('./db/conn');

// const user = require("./model/userSchema")
app.use(express.json())
app.use(require('./router/auth'));          // link router file
const PORT = process.env.PORT

const middleWare = (req , res , next) => {
    console.log("helo midleware")
    next();
}


app.get("/" , (req , res) => {
    res.send("Hello world")
})

app.get("/about" , middleWare , (req , res) => {
    res.send("Hello world1")
})
// app.get("/contact" , (req , res) => {
//     res.send("Hello world2")
// })
app.get("/signIn" , (req , res) => {
    res.send("Hello world2")
})
app.get("/signUp" , (req , res) => {
    res.send("Hello world2")
})
app.listen(PORT , () => {
    console.log("server is running")
})