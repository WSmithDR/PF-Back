const Product = require('../../models/Product');

const deleteProduct = async (id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found.");
    }

    await product.softDelete();
    await product.save();

    const message = "Product marked as deleted.";

    return { message };
  } catch (error) {
    console.error('Error deleting product:', error.message);
    throw new Error("Unable to delete product.");
  };
};

module.exports = deleteProduct;