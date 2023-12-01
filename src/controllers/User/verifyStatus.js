const User = require('../../models/User');

const verifyStatus = async (userId) => {
  try {

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    if (user.verify) {
      return 'User is already verified.';
    }

    user.verify = true;
    await user.save();

    return 'User verified successfully.';
  } catch (error) {
    console.error('Error verifying user:', error.message);
    throw new Error('Unable to verify user.');
  }
};

module.exports = verifyStatus;