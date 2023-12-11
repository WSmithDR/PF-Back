const User = require("../../models/User");

const getAllUsersDeleted = async (req, res, next) => {
  try {
    console.log('estoy llevando los borrados')
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const startIndex = (page - 1) * limit;
    const whereConditions = { deleted: true };
    const count = await User.countDocuments(whereConditions);
    const results = {
      info: {
        page: page,
        limit: limit,
        total: count,
      },
    };
    const users = await User.find(whereConditions)
      .limit(limit)
      .skip(startIndex);
    results.results = users;
    res.paginatedResults = results;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = getAllUsersDeleted;