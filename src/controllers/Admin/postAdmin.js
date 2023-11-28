const Admin = require('../../models/Admin');

const postAdmin = async ({ idUser, store, description, contact }) => {
  try {
    if (!idUser || !store || !description || !contact) {
      throw new Error("Missing data")
    };

    const admin = new Admin({
      idUser,
      store,
      description,
      contact,
    });

    const adminSaved = await admin.save();

    if (adminSaved) {
      const message = "Admin created.";

      return message;
    } else {
      throw new Error("Admin couldn't be created.")
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = postAdmin;