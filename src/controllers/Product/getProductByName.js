const Product = require('../../models/Product');

const getProductByName = async (name) => {
  if (typeof name !== 'string') {
    throw new Error('Name must be a string');
  };
  
  try {
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });

    if (products.length === 0) {
      throw new Error(`No products found with the name: ${name}`);
    };

    return products;
  } catch (error) {
    console.log('Error fetchin products:', error.message);
    throw new Error('Unable to fetch products.');
  };
};

module.exports = getProductByName;