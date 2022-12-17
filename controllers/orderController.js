const Order = require("../models/orderModel");
const saveOrder = async function (req, res) {
  const orderItems = req.body.orderItems.map((x) => ({
    ...x,
    product: x._id,
  }));

  const shippingAddress = req.body.shippingAddress;
  const {
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user,
  } = req.body;

  console.log(user);

  try {
    const order = await Order.saveOrder(
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user
    );
    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
module.exports = { saveOrder };
