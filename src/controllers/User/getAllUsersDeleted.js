const User = require("../../models/User");

const getAllUsersDeleted = async (req, res, next) => {
  try {
    const users = await User.find({ deleted: true });

    if (!users) {
      throw new Error("Usuarios no encontrados");
    };

    return users;
  } catch (error) {
    console.log(error);

    throw new Error("Error al obtener los usuarios");
  }
};

module.exports = getAllUsersDeleted;