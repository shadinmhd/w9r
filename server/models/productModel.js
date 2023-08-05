const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true,
        unique : true
    }
})

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number
    },
    desc : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : imageSchema,
        required : true,
    }
})

module.exports = mongoose.model("product", productSchema)