const uuid = require('uuid');
const Product = require('../models/productModel');


const sendSuccessResponse = (res, data) => {
  res.json({
    status: 'success',
    data: data,
  });
};

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: 'error',
    message: message,
  });
};


const getAllProducts = async (req, res) => {
  try {
    let filter = {};  

    if (req.query.name) {
      filter.productName = { $regex: new RegExp(req.query.name, 'i') };
    }

    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = { $gte: parseFloat(req.query.minPrice), $lte: parseFloat(req.query.maxPrice) };
    }

    const products = await Product.find(filter);
    sendSuccessResponse(res, products);
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ prodId: req.params.productId });
    if (!product) {
      return sendErrorResponse(res, 404, 'Product not found');
    }
    sendSuccessResponse(res, product);
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      prodId: uuid.v4(),
      ...req.body,
    });
    await newProduct.save();
    sendSuccessResponse(res, newProduct , 'Product created successfully');
  } catch (error) {
    sendErrorResponse(res, 400, 'Bad Request');
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { prodId: req.params.productId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return sendErrorResponse(res, 404, 'Product not found');
    }
    sendSuccessResponse(res, updatedProduct , 'Product updated successfully');
  } catch (error) {
    sendErrorResponse(res, 400, 'Bad Request');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ prodId: req.params.productId });
    if (!deletedProduct) {
      return sendErrorResponse(res, 404, 'Product not found');
    }
    sendSuccessResponse(res, deletedProduct , 'Product deleted successfully');
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
