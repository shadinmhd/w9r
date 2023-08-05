const express = require("express")
const productModel = require("../models/productModel")
const router = express.Router()

router.get("/products",async (req, res) => {
    try{
        const products = await productModel.find()
        res.send({
            success : true,
            products
        })
    }catch(err){
        console.log(err)
        res.send({
            success : false,
            message : "some thing went wrong while fetching products"
        })
    }
})

module.exports = router