const Product = require("../models/products");

const createProduct = async(req, res) => {
    try {
        const { id, price, prod_name, category, subcategory } = req.body;

        if(!id || !price || !prod_name || !category || !subcategory ) throw "Fill all the details!";

        const product = new Product({
            id,
            prod_name,
            category,
            price,
            subcategory
        })

        const product_data = await Product.findOne({id});

        if(product_data){
            res.status(200).send("Product with same name exists!")
        }
        await product.save();
        console.log("Product created successfully!");
        res.status(200).send({success:true, msg:product})
      

    }catch(error){
        if (error.code === 11000) {
            console.error('Duplicate key error. Document already exists!');
            // Handle the duplicate key error here (e.g., retry with different data)
          } else {
            console.error('An error occurred:', error.message);
          }
    }
}

// const getProduct = async(req, res) => {
//     try {

//         const product = await Product.find();

//         if(!product){
//             res.status(200).send("Product does not exist!")
//         }


//     }catch(error){
//         console.log(error);
//         res.status(400).send(error.message);
//     }
// }

const getProductByCategory = async(req, res) => {
    try{

        const { category, subcategory } = req.params;

        const products = await Product.find({category, subcategory});
        const sum = products.reduce((total, product) => total + product.price, 0);
        res.json({products, sum});

    }catch(error){
        console.log(error);
        res.status(400).send(error.message);
    }
}
module.exports = {
    createProduct,
    getProductByCategory
}