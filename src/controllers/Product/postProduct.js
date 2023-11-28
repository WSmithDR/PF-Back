const Product = require('../../models/Product');

const postProduct = async ({ name, brand, sale, category, img, description, price, quantity }) => {
  try {
    if (!name || !brand || !sale || !category  || !img  || !description  || !price  || !quantity ) {
      throw new Error("Missing data")
    };

    const product = new Product({
      name,
      brand,
      sale,
      category,
      img,
      description,
      price,
      quantity,
    });

    const productSaved = await product.save();

    if (productSaved) {
      const message = "Product created.";

      return message;
    } else {
      throw new Error("Product couldn't be created.")
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = postProduct;

//AGREGAR LA LOGICA PARA VINCULAR PRODUCTO CON ADMIN