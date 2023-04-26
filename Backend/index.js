const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const register=require("../Backend/routes/register")
const login=require("../Backend/routes/login")
const Products=require("../Backend/Products.js")
const productsApi =require("../Backend/routes/products.js")
const app=express();

require("dotenv").config()

app.use(express.json({limit: '50mb'}))
app.use(cors())


app.use("/api/register",register);

app.use("/api/login",login);
app.use("/api/products",productsApi);


app.get("/",(req,res)=>{

    res.send("welcome to our online shop API..");

})

app.get("/products",(req,res)=>{
    res.send(Products);

})

const port =process.env.PORT || 5000;
const url=process.env.DB_URL

app.listen(port,console.log(`server runnig on port ${port}`))



mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>    console.log("connection successfull with mongodb"))
.catch((err)=>console.log("connection failed",err.message))


