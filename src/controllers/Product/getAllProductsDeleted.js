const Product = require('../../models/Product');

const getAllProductsDeleted = async () => {
  try {
    const deletedProducts = await Product.find({ deleted: true });

    return deletedProducts;
  } catch (error) {
    console.error('Error fetching deleted products:', error.message);
    throw new Error('Unable to fetch deleted products.');
  };
};

module.exports = getAllProductsDeleted;
