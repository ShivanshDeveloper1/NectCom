const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { name, slug, category, price, originalPrice, description, isBestseller, ingredients } = req.body;

    const parsedIngredients = typeof ingredients === 'string' 
      ? JSON.parse(ingredients) 
      : ingredients;

    const newProduct = await Product.create({
      name,
      slug,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : 0,
      description,
      image: req.body.image, // URL populated by Cloudinary middleware
      isBestseller: isBestseller === 'true' || isBestseller === true,
      ingredients: parsedIngredients || [],
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



// 2. Get All Products
const getProducts = async (req, res) => {
  try {

    console.log('GET PRODUCTS REQUEST');

    const products = await Product.find().sort({ createdAt: -1 });

    console.log('PRODUCT COUNT:', products.length);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {

    console.error('GET PRODUCTS ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// 3. Get Single Product by Slug or Mongo ID
const getProductBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;
    const product = await Product.findOne({
      $or: [{ slug: identifier }, { _id: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null }]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





// 4. Update Product
const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.image) updateData.image = req.body.image; // Updated Cloudinary image URL if uploaded

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};




// 5. Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });

  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};









module.exports = {
  createProduct,
  getProducts,
  getProductBySlugOrId,
  updateProduct,
  deleteProduct,
};