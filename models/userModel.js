const { default: mongoose } = require('mongoose')
const db = require('mongoose')
const bcrypt = require('bcrypt')
/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const userScheme = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        unique:false
    },
    role:{
        type:String,
        unique:false,
        default:"user"
    }
})
userScheme.methods.isPasswordMatches= async (entereedPassword,cryptedPassword)=>{
return await bcrypt.compare(entereedPassword,cryptedPassword)
}
   

module.exports=mongoose.model('User',userScheme)