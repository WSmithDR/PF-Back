const User = require('../../models/User');
const signTokens = require('../../middlewares/Tokens/signTokens');

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Datos incompletos");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const validPassword = await user.validatePassword(password);

    if (!validPassword) {
      throw new Error("Contraseña incorrecta");
    };

    if (!user.password) {
      throw new Error("Necesitas una contraseña");
    };

    const { accessToken, refreshToken } = signTokens(user._id);

    const data = {
      name: user.name,
      img: user.img,
    };

    return ({ access: true, accessToken, refreshToken, data });

  } catch (error) {
    console.error('Error en login:', error.message);
    throw new Error(error.message);
  }
};

module.exports = login;