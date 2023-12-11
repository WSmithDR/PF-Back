const User = require('../../models/User');

const deleteUser = async (id) => {
  try {
    console.log(`estoy borrando al usuario${id}`)
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    await user.softDelete();
    await user.save();

    const message = "User is banned.";

    return { message };
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw new Error("Unable to delete user.");
  };
};

module.exports = deleteUser;