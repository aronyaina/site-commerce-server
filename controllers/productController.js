const Product = require("../models/productModel");

// save product post
const saveProduct = async function (req, res) {
  const { name, description, price, quantity } = req.body;

  let emptyField = [];
  if (!name) {
    emptyField.push("name");
  }
  if (!price) {
    emptyField.push("price");
  }
  if (!quantity) {
    emptyField.push("quantity");
  }

  if (emptyField.length > 0) {
    return res.status(400).json({
      error: "Veuiller completer les parties manquantes",
      emptyField,
    });
  }
  const user_id = req.userId._id;
  try {
    const product = await Product.saveProduct(
      name,
      description,
      price,
      quantity,
      user_id
    );
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// delete product delete
const deleteProduct = async function (req, res) {
  const id = req.params.id;
  try {
    const product = await Product.deleteProduct(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// find product get
const findProduct = async function (req, res) {
  try {
    const user_id = req.userId._id;
    console.log("user_id :", user_id);
    const product = await Product.findProduct(user_id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// find one product get /:id
const findOneProduct = async function (req, res) {
  const id = req.params.id;
  try {
    const product = await Product.findOneProduct(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// update one product post /:id
const updateProduct = async function (req, res) {
  const id = req.params.id;
  const { name, description, price, quantity } = req.body;
  try {
    const product = await Product.updateProduct(
      id,
      name,
      description,
      price,
      quantity
    );
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
module.exports = {
  saveProduct,
  deleteProduct,
  findProduct,
  findOneProduct,
  updateProduct,
};
