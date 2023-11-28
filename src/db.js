const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
    });
    console.log("DB connected to", mongoose.connection.name);
  } catch (error) {
    console.log(error);
  }
})();