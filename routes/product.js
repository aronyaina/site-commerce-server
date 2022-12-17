const express = require("express");
// use storage image
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const router = express.Router();

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
});

// controler setup
const {
  saveProduct,
  deleteProduct,
  findProduct,
  findOneProduct,
  updateProduct,
} = require("../controllers/productController");

const requireAuth = require("../middleware/requireAuth");

// find all product
router.get("/", findProduct);

// find one product
router.get("/:id", findOneProduct);

// require Authentication
router.use(requireAuth);

// create the product
router.post("/", upload.single("productImage"), saveProduct);

// delete the product
router.delete("/:id", deleteProduct);

// update all product
router.patch("/:id", upload.single("productImage"), updateProduct);

module.exports = router;
