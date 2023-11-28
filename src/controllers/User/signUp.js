const User = require('../../models/User');

const signUp = async ({ name, email, password, phoneNumber, address }) => {
  try {
    if (!name || !email || !password || !phoneNumber || !address) {
      throw new Error("Missing data")
    };

    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserEmail) {
      throw new Error('Email already exists.');
    };

    const existingUserName = await User.findOne({ name: name });
    if (existingUserName) {
      throw new Error('Username already exists.');
    };

    const user = new User({
      name,
      email,
      password,
      phoneNumber,
      address,
    });

    user.password = await user.encryptPassword(user.password);

    const userSaved = await user.save();

    if (userSaved) {
      const message = "User created.";

      return message;
    } else {
      throw new Error("User couldn't be created.")
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = signUp;