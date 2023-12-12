const User = require('../../models/User');

const putUser = async (id, updateData, img) => {
  try {
    const updatedUser = await User.findById(id);

    if (!updatedUser) {
      throw new Error('Usuario no encontrado');
    }

    if (updateData.number && updatedUser.number !== updateData.number && updateData.number !== undefined) {
      updatedUser.number = updateData.number;
    }

    if (updateData.email && updatedUser.email !== updateData.email) {
      const emailExists = await User.findOne({ email: updateData.email });
      if (!emailExists) {
        updatedUser.email = updateData.email;
      } else {
        throw new Error('Email already exists');
      }
    }

    if (updateData.name && updatedUser.name !== updateData.name) {
      updatedUser.name = updateData.name;
    }

    if (updateData.password && updatedUser.password !== updateData.password) {
      updatedUser.password = updateData.password;
    }

    if (updateData.address && updatedUser.address !== updateData.address) {
      updatedUser.address = updateData.address;
    }

    if (img && updatedUser.img !== img) {
      updatedUser.img = img;
    }

    if (updateData.password) {
      updatedUser.password = await updatedUser.encryptPassword(updateData.password);
    }

    updatedUser.save();

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = putUser;