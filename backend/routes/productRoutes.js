const express = require('express');
const router = express.Router();
const { createProduct, 
  getProducts, 
  getProductBySlugOrId, 
  updateProduct, 
  deleteProduct } = require('../controller/productController');
const { upload,  processAndUploadImage } = require('../middleware/uploadAndCompress');



// POST /api/products

console.log('upload:', typeof upload);
console.log('processAndUploadImage:', typeof processAndUploadImage);  
console.log('createProduct:', typeof createProduct);


router.get('/', getProducts);
router.get('/:identifier', getProductBySlugOrId);
router.post('/', upload.single('imageFile'), processAndUploadImage, createProduct);
router.put('/:id', upload.single('imageFile'), processAndUploadImage, updateProduct);
router.delete('/:id', deleteProduct);







module.exports = router;




