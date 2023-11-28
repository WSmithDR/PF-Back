const Product = require('../../models/Product');

const getProductById = async (id) => {
  try {
    const product = Product.findById(id);

    if (!product) {
      throw new Error("Product not found.");
    };

    return product;
  } catch (error) {
    console.error('Error fetching product:', error.message);
    throw new Error('Unable to fetch product.');
  }
};

module.exports = getProductById;