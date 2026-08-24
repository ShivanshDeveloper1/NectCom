const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isBestseller: { type: Boolean, default: false },
    rating: { type: Number, default: 5 },
     concern: {
    type: String,
    default: ''
  },

    reviews: { type: Number, default: 0 },
    ingredients: [{ type: String }],
},
{ timestamps: true }
)

module.exports = mongoose.model('Product',productSchema)