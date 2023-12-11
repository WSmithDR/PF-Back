const User = require('../../models/User');
const Product = require('../../models/Product');

const getAdminCreateProducts = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error("Usuario no encontrado");
    };

    const myCreated = await Product.find({ _id: { $in: user.myCreated } }).lean();

    if (!myCreated) {
      throw new Error("No se encontraron productos creados por el usuario");
    };

    return myCreated;

  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = getAdminCreateProducts;