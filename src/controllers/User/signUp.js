const User = require('../../models/User');
const signTokens = require('../../middlewares/Tokens/signTokens');
const sendVerifyEmail = require('../../middlewares/Email/sendVerifyEmail');

const signUp = async ({ name, email, password, phoneNumber, address, img }) => {
  try {
    if (!name || !email || !password || !phoneNumber || !address) {
      throw new Error("Missing data")
    };

    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserEmail) {
      throw new Error('Email already exists.');
    };

    const user = new User({
      name,
      email,
      password,
      phoneNumber,
      address,
      img: img || 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
    });

    user.password = await user.encryptPassword(user.password);

    const userSaved = await user.save();

    if (userSaved) {
      const data = {
        name,
        img,
        message: 'Usuario creado con exito!.'
      };

      if (userSaved.verify === false) {
        await sendVerifyEmail(userSaved.email, userSaved._id)
      };

      const { accessToken, refreshToken } = signTokens(userSaved._id);

      return { access: true, accessToken, refreshToken, data };
    } else {
      throw new Error("User couldn't be created.")
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = signUp;