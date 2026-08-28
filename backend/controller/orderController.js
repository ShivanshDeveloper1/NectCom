const Order = require('../models/Order');
const crypto = require('crypto');

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice, paymentResult } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    let isPaid = false;
    let paidAt = null;

    if (paymentMethod === 'Razorpay') {
      if (!paymentResult?.razorpay_order_id || !paymentResult?.id || !paymentResult?.razorpay_signature) {
        return res.status(400).json({ message: 'Missing Razorpay payment details' });
      }
      const sign = paymentResult.razorpay_order_id + '|' + paymentResult.id;
      const expectedSign = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(sign)
        .digest('hex');

      if (paymentResult.razorpay_signature !== expectedSign) {
        return res.status(400).json({ message: 'Invalid payment signature' });
      }
      isPaid = true;
      paidAt = Date.now();
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult: paymentResult || {},
      totalPrice,
      isPaid,
      paidAt
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};