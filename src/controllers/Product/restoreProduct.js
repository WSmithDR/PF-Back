const Product = require('../../models/Product');

const restoreProduct = async (id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found.");
    }

    await product.restore();
    await product.save();

    const message = "Product marked as not deleted.";

    return { message };
  } catch (error) {
    console.error('Error restoring product:', error.message);
    throw new Error("Unable to restore product.");
  };
};

module.exports = restoreProduct;