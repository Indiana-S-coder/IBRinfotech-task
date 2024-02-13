const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    
    id: {
        type:String,
        required: true,
        unique:true
    },
    prod_name: {
        type:String,
        required: true,
    },
    category: {
        type: String,
        required:true
    },
    subcategory: {
        type:String,
        required:true
    },
    price:{
        type: Number,
        required:true
    }
})

const product = mongoose.model("Product", productSchema)

module.exports = product;