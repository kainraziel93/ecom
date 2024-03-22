const mongoose = require('mongoose')
/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const productScheme = mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },

description:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

category:{
type:String,
ref:"Category"
},

brand:{
type:String,
},

quantity:Number,


sold:{
    type:Number,
    default:0
},

images:{
type:Array
},

color:{
type:String,
},

ratings:{
star:Number,
postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},
},{timestamps:true})
module.exports=mongoose.model("Product",productScheme)