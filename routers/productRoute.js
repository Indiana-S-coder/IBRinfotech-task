const router = require("express").Router();
const {createProduct, getProductByCategory} = require("../controllers/ProductController")
const { verifyUser } = require("../utils/verify")

router.post('/createProduct', createProduct)
router.get('/getProduct/:category/:subcategory',verifyUser, getProductByCategory)

module.exports = router