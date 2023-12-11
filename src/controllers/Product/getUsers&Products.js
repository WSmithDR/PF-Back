const User = require('../../models/User');
const Product = require('../../models/Product');

const getUsersAndProducts = async () => {
  try {
    const users = await User.aggregate([{ $sample: { size: 5 } }]);
    const products = await Product.aggregate([{ $sample: { size: 5 } }]);

    if (users.length === 0 || products.length === 0) {
      throw new Error('NO se encontraron usuarios o productos');
    };

    if (users.length < 5) {
      throw new Error('NO se encontraron suficientes usuarios');
    }

    if (products.length < 5) {
      throw new Error('NO se encontraron suficientes productos');
    }

    const productDeleted = await Product.find({ deleted: true });
    const productDeletedCount = productDeleted.length;

    const productNotDeleted = await Product.find({ deleted: false });
    const productNotDeletedCount = productNotDeleted.length;

    const userAdmin = await User.find({ Admin: true });
    const userAdminCount = userAdmin.length;

    const userNotAdmin = await User.find({ Admin: { $in: [false, null] } });
    const userNotAdminCount = userNotAdmin.length;

    return ({ users, products, productDeletedCount, productNotDeletedCount, userAdminCount, userNotAdminCount });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = getUsersAndProducts;
