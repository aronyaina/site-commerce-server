const express = require("express");




// controler setup
const {
    saveProduct,
    deleteProduct,
    findProduct,
    findOneProduct,
    updateProduct
} = require("../controllers/productController")

const requireAuth = require("../middleware/requireAuth")
const router = express.Router();

// require Authentication
router.use(requireAuth) 


// create the product 
router.post('/', saveProduct);

// delete the product
router.delete('/:id', deleteProduct);

// find one product
router.get('/:id', findOneProduct);

// find all product
router.get('/', findProduct);

// update all product
router.patch('/:id', updateProduct);

module.exports = router