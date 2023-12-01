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
      img: img ? img : 'https://img2.freepng.es/20180714/ro/kisspng-computer-icons-user-membership-vector-5b498fc76f2a07.4607730515315475914553.jpg'
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