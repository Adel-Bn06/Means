const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  commande: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
