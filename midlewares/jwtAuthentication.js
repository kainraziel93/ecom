const JWT = require('jsonwebtoken');
const { options } = require('../routes/registerRoute');
const SECRET = process.env.SECRET;

const generateToken=(payload)=>{
 return JWT.sign({payload},SECRET,{expiresIn:'3d'})
}

const verifyToken=(payload)=>{
    return JWT.verify(payload,SECRET)
  
}
const decodeToken=(payload)=>{
    return JWT.decode(payload);
}

module.exports ={generateToken,verifyToken,decodeToken}