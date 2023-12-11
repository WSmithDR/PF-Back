const Product = require('../../models/Product');
const User = require('../../models/User');

const postProduct = async ({ name, brand, sale, category, img, description, price, quantity, userId }) => {
  try {
    if (!name || !brand || !sale || !category  || !img  || !description  || !price  || !quantity ) {
      throw new Error("Missing data")
    };

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
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
      createdBy: userId
    });

    const productSaved = await product.save();

    if (productSaved) {
      const message = "Producto creado..";

      user.myCreated.push(productSaved._id);
      console.log(user.myCreated);

      user.save();

      return message;
    } else {
      throw new Error("No se pudo creat el producto.")
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = postProduct;