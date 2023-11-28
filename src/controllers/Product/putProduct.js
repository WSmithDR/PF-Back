const Product = require('../../models/Product');

const putProduct = async (id, updateData) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found.");
    };

    for (const key in updateData) {
      if (updateData.hasOwnProperty[key]) {
        product[key] = updateData[key];
      };
    };

    const productSaved = await Product.save();

    if (productSaved) {
      const message = "Product updated.";

      return { message, updateData: productSaved };
    } else {
      throw new Error("Error updating the product.");    
    };
  } catch (error) {
    console.log(error.message);
    throw new Error("Unable to update the product.");
  }
};

module.exports = putProduct;