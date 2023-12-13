const User = require('../../models/User');

const toggleAdmin = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    if (user.Admin === undefined) {
      user.Admin = false;
    } else if (user.Admin === true) {
      user.Admin = false;
    } else if (user.Admin === false) {
      user.Admin = true;
    };

    await user.save();

    return user;
  } catch (error) {
    console.log('Error en toggleAdmin:', error.message);

    throw new Error("No se pudo cambiar el estado de admin del usuario.");
  }
};

module.exports =  toggleAdmin
