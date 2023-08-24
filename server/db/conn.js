const moongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: './congif.env'});
const db = process.env.DATABASE

moongoose.connect(db , {
    useNewUrlParser: true,
    // useCreateIndex:true  , 
    // useUnifiedTopology: true , 
    // useFindAndModify: false
}).then(() => {
    console.log("db connected")
}).catch((e) => {
    console.log(e)
})