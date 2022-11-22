const express = require("express");

const router = express.Router();


// controler setup
const {
    saveProduct,
    deleteProduct,
    findProduct,
    findOneProduct,
    updateProduct
} = require("../controllers/productController")


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