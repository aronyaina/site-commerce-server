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

  let emptyField = [];
  if (!orderItems) {
    emptyField.push("les commandes.");
  }
  if (!paymentMethod) {
    emptyField.push("la methode de payement.");
  }
  if (!itemsPrice) {
    emptyField.push("le prix des items.");
  }
  if (!shippingAddress) {
    emptyField.push("l'addresse de livraison.");
  }
  if (!shippingAddress.fullName) {
    emptyField.push("votre nom.");
  }
  if (!shippingAddress.address) {
    emptyField.push("votre addresse.");
  }
  if (!shippingAddress.city) {
    emptyField.push("votre code postal.");
  }
  if (!shippingAddress.country) {
    emptyField.push("votre pays.");
  }
  if (!shippingPrice) {
    emptyField.push("le prix de livraison.");
  }
  if (!taxPrice) {
    emptyField.push("le taxe.");
  }
  if (!totalPrice) {
    emptyField.push("la total.");
  }

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
    res.status(200).json("Commande prise en compte");
  } catch (error) {
    if (emptyField.length > 0) {
      return res.status(400).json({
        error: `Veuiller completer ${emptyField}`,
      });
    } else {
      res.status(400).json({
        error: error.message,
      });
    }
  }
};
module.exports = { saveOrder };
