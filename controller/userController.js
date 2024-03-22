const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwtHelper = require('../midlewares/jwtAuthentication')
const UserDto = require('../dtos/userDto')
const cryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}
const registerUser = async(req,res)=>{
    let email = req.body.email
    const userFound = await userByEmail(email)
    if(!userFound){
        const user = req.body
        user.password = await  cryptPassword(user.password)
        const a = (await User.create(user)).save
        res.json(user)
    }
    else {
        res.status(400).json({
            msg:"user already exist",
            success:false
        })
    }
}
const login = async (req,res)=>{
    let {email,password} = req.body
    let userFound = await userByEmail(email)
    if(userFound){
        if( await isPasswordMatches(password,userFound.password)){
            let tkn =    jwtHelper.generateToken({
                id:userFound?.id,
                email:userFound.email,
                name:userFound.name,
                role:userFound.role
            })
            res.json({
                tkn:tkn,
                decodedToken:jwtHelper.verifyToken(tkn)
            })
        }
        else {
            res.status(400).json({message:"passwords does not match"})
        }
    }
    else {
        res.status(400).json({message:`no user with ${email} found`})
    }
}
isPasswordMatches = async (password,cryptedPassword)=>{
    return await bcrypt.compare(password,cryptedPassword)
}
const getUserByEmail =async (req,res)=>{
    const email = req.params.email
    const user= await userByEmail(email)
    return user ?res.json(user):res.status('400').json({message:`not user with the email ${email} found`})
}
const getAllUsers = async (req,res)=>{
    const result = await User.find()
    const userDto = result.map((x)=>UserDto.mapFromJson(x)) 
    return res.json(userDto);
}
const updateUser =async(req,res)=>{
    let userToUpdate =await  userByEmail(req.params.email)
    const updatedUser =await User.findByIdAndUpdate(userToUpdate,{
        name:req.body.name=== undefined?userToUpdate.name:req.body.name,
        mobile:req.body.mobile=== undefined?userToUpdate.mobile:req.body.mobile,
        name:req.body.password=== undefined?userToUpdate.password: await cryptPassword(req.body.password)
    },
    {new:true})
    console.log(updateUser);
    return res.json(updatedUser);
}
const userByEmail=async (email)=>{
    const userFound = await User.findOne({email:email})
    if(email.length !=0 && userFound){
        return userFound;
    }
    return null;  
}

module.exports={registerUser
    ,login
    ,getUserByEmail
    ,getAllUsers
    ,updateUser};