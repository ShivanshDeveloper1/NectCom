const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
      }
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true }, // 'Razorpay' | 'COD'
    paymentResult: {
      id: { type: String },
      status: { type: String },
      razorpay_order_id: { type: String },
      razorpay_signature: { type: String }
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    orderStatus: { type: String, default: 'Processing' } // 'Processing' | 'Shipped' | 'Delivered'
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);