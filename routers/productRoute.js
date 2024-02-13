const router = require("express").Router();
const {createProduct, getProductByCategory} = require("../controllers/ProductController")

router.post('/createProduct', createProduct)
router.get('/getProduct/:category/:subcategory', getProductByCategory)

module.exports = router