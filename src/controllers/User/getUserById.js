const User = require('../../models/User');

const getUserById = async (id) => {
  try {
    const user = User.findById(id);

    if (!user) {
      throw new Error("User not found.");
    };

    return user;
  } catch (error) {
    console.error('Error fetching product:', error.message);
    throw new Error('Unable to fetch user.');
  }
};

module.exports = getUserById;