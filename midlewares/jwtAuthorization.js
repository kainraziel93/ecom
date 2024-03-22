const {verifyToken,decodeToken} = require('./jwtAuthentication')

const isAuthenticated=(req,res,next)=>{
    const header = req.headers.authorization;
    if(header){
        const token = header.split(' ')[1];
        console.log(token)
        if(token){
        const verifiedToken =  verifyToken(token)
        if(verifiedToken){
            req.role=verifiedToken.payload.role
            next()
        }    
        }
        else{
            return res.status(400).json({
               message:"authetication error" 
            })
    }
    }
    else {
        return res.status(400).json({
            message:"no authorization header found"
        })
    } 
}
const isAdmin = (req,res,next)=>{
    if(req.role==="admin"){
        next()
    }
    else{
        res.status(400).json({
            message:'you are not authorized to access this ressource'
        })
    }
}

module.exports={isAuthenticated,isAdmin}

