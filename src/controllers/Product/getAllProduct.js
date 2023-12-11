const Product = require("../../models/Product");

const getAllProducts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const startIndex = (page - 1) * limit;
  const results = {};

  const { brand, sale, price, category, quantity } = req.query;
  const whereConditions = {};

  if (category) {
    whereConditions.category = new RegExp(category, 'i');
  }

  whereConditions.deleted = false;

  if (sale === "1") {
    console.log("Filtrando por sale con descuento");
    whereConditions.sales = {
      $gt: 0,
    };
  } else if (sale === "0") {
    console.log("Filtrando por sale sin descuento");
    whereConditions.sales = 0;
  }

  try {
    const sort = {};
    if (price === "highest") {
      sort.price = -1;
    } else if (price === "lowest") {
      sort.price = 1;
    }

    const count = await Product.countDocuments(whereConditions);
    results.info = {
      page: page,
      limit: limit,
      total: count,
    };

    const products = await Product.find(whereConditions)
      .sort(sort)
      .limit(limit)
      .skip(startIndex)

    results.results = products;
    res.paginatedResults = results;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = getAllProducts;