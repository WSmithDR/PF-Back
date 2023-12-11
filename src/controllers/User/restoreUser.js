const User = require('../../models/User');

const restoreUser = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    await user.restore();
    await user.save();

    const message = "User marked as not deleted.";

    return { message };
  } catch (error) {
    console.error('Error restoring user:', error.message);
    throw new Error("Unable to restore user.");
  };
};

module.exports = restoreUser;