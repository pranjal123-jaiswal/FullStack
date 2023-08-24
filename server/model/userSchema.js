const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config({ path: '../congif.env'});
const secretkey = process.env.SECRETKEY
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,  
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,  
                required: true
            },
            message: {
                type: String,
                required: true
            }

        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// generating token

userSchema.methods.generateAuthToken = async function () {
    try{
        let generated_token = jwt.token({_id: this._id} , process.env.SECRETKEY)
        this.tokens = this.tokens.concat({token: generated_token})
        await this.save()
        return generated_token

    } catch(error){

    }
}

/// store message

userSchema.methods.addMessage = async function (name , email , phone , message) {
    try{
        this.messages = this.messages.concat({name , email , phone , message})
        await this.save()
        return this.messages
    } catch(error){
        console.log(error)
    }
}


// Hashing the password
// when ever the save function is called anywhere in project where user is required then this function is called anf check is password is change or not

userSchema.pre('save' , async function (next){
    console.log("hi from inside")
    if(this.isModified('password')) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12)  // the line bcrypt.hash(this.password, 12) takes the current password value from the user object and hashes it using bcrypt's hashing algorithm with 12 rounds of computation. 
            this.password = hashedPassword
            this.cpassword = hashedPassword  // Assuming you want to hash cpassword as well
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }
    next()
})

const user = mongoose.model("USER" , userSchema );

module.exports = user;