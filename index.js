const express = require('express')
const app = express()
const dbConnection = require('./config/dbConnect')
const env = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT
const registerUserRoute = require('./routes/registerRoute')
const bodyParser = require('body-parser')
const productRoutes = require('./routes/productRoutes')

dbConnection()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.get("/api/",(req,res)=>{
   return   res.json("hello")
})
app.use(cors())
app.use('/api/',registerUserRoute)
app.use('/api/',productRoutes)
app.listen(port,()=>{
    console.log(`server is listening in port ${port}`)
})