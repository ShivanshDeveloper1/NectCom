const Razorpay = require('razorpay');

exports.createRazorpayOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: Math.round(req.body.amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).json({ message: 'Error creating Razorpay order' });
    res.json(order);
  } catch (error) {
    console.error('createRazorpayOrder error:', error);
    res.status(500).json({ error: error.message });
  }
};