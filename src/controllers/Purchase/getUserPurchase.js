const User = require('../../models/User');
const Purchase = require('../../models/Purchases');
const Product = require('../../models/Product');

const getUserPurchase = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('El usuario no existe');
    }

    const userPurchases = await Purchase.find({ userId });

    if (!userPurchases || userPurchases.length === 0) {
      throw new Error('No se encontraron compras del usuario');
    }

    const groupedPurchases = userPurchases.reduce((acc, purchase) => {
      const purchaseDate = purchase.createdAt.toISOString().split('T')[0];
      if (!acc[purchaseDate]) {
        acc[purchaseDate] = [];
      }
      acc[purchaseDate].push(purchase);
      return acc;
    }, {});

    const result = Object.keys(groupedPurchases).map(async (purchaseDate) => {
      const purchases = groupedPurchases[purchaseDate];
      const productIds = purchases.flatMap((purchase) => purchase.productId);
      const products = await Promise.all(
        productIds.map(async (productId) => {
          const product = await Product.findById(productId);
          if (product) {
            // Agregar o reemplazar la propiedad createdAt del purchase en el producto
            const createdAt = purchases.find((purchase) => purchase.productId.toString() === productId.toString())?.createdAt;
            if (createdAt) {
              product.createdAt = createdAt;
            }
          }
          return product;
        })
      );
      return { purchaseDate, products };
    });

    return Promise.all(result);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = getUserPurchase;
