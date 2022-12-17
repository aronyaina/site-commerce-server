const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderItems: [
      {
        name: { type: String, required: [true, "Name of product is required"] },
        quantity: {
          type: String,
          required: [true, "Quantity of product is required"],
        },
        image: { type: String },
        price: {
          type: String,
          required: [true, "Price of product is required"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: [true, "full name is required"] },
      address: { type: String, required: [true, "address is required"] },
      city: { type: String, required: [true, "city is required"] },
      postalCode: { type: String, required: [true, "postalCode is required"] },
      country: { type: String, required: [true, "country is required"] },
    },
    paymentMethod: {
      type: String,
      required: [true, "paymentMethod is required"],
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: [true, "Price is required"] },
    shippingPrice: {
      type: Number,
      required: [true, "Shipping price is required"],
    },
    taxPrice: { type: Number, required: [true, "taxe is required"] },
    totalPrice: { type: Number, required: [true, "Total is required"] },
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "user",
      type: String,
      required: [true, "user is required"],
    },
    isPaid: { type: Boolean, default: false },
    deliveredAt: { type: Number },
  },
  {
    timestamps: true,
  }
);

orderSchema.statics.saveOrder = async function (
  orderItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  user
) {
  const order = await this.create({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user,
  });
  return order;
};

// exports shema
module.exports = mongoose.model("order", orderSchema);
