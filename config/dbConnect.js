const mongoose = require('mongoose')
const env = require('dotenv').config();
const dbConnect = ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("succefull login to db")
    }catch(e){
        console.log(`error login to db ${e}`)
    }
}
module.exports=dbConnect;
