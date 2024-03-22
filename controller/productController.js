const Product = require('../models/productModel')

const addProduct = async (req,res)=>{
    try{
        console.log(req.body)
        const product = await Product.create(req.body)
        
        res.json({product:product})
    }catch(e){
        console.log(e)
       res.status(400).json({
        message:'product already exist'
       })
    }
}

const getAllProducts= async(req,res)=>{
    const products = await Product.find();
    res.json(products);
    
}

module.exports={
    addProduct,getAllProducts
}