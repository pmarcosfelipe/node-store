'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.create = async data => {
  var order = new Order(data);
  await order.save();
};

exports.get = async data => {
  var res = await Order.find({});
  return res;
};
