const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: "String",
      required: [true, "Name is required"],
    },
    description: "String",
    price: {
      type: "Number",
      required: [true, "Price is required"],
    },
    quantity: {
      type: "Number",
      required: [true, "Quantity is required"],
    },
    image: {
      type: "String",
    },
    user_id: {
      type: "String",
      required: [true, "id is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Save product function
productSchema.statics.saveProduct = async function (
  name,
  description,
  price,
  quantity,
  image,
  user_id
) {
  const nameExist = await this.findOne({
    name,
  });

  if (nameExist) {
    throw Error("Le produit existe deja");
  }
  if (price <= 0) {
    throw Error("Le prix ne peux pas etre inferieur a 0");
  }

  const products = await this.create({
    name,
    description,
    price,
    quantity,
    image,
    user_id,
  });
  return products;
};

// Delete product function
productSchema.statics.deleteProduct = async function (id) {
  const deletedObject = await this.findOneAndDelete({
    _id: id,
  });

  return deletedObject;
};

// Find product function
productSchema.statics.findProduct = async function (id) {
  const products = await this.find(id);
  return products;
};

// Find one product function
productSchema.statics.findOneProduct = async function (id) {
  const products = await this.findById({
    _id: id,
  });
  return products;
};

// Find one product function
productSchema.statics.updateProduct = async function (
  id,
  name,
  description,
  price,
  quantity,
  image
) {
  const products = await this.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      image: image,
    }
  );
  return products;
};

// exports shema
module.exports = mongoose.model("products", productSchema);
