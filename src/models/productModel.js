const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  prodId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  availabilityStatus: { type: Boolean, default: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
