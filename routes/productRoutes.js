const express = require('express')
const productRoutes = express.Router()
const productServices = require('../controller/productController')
productRoutes.post('/product',productServices.addProduct)
productRoutes.get('/product',productServices.getAllProducts)
module.exports=productRoutes
