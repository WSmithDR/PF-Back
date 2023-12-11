const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      require: true
    },
    email: {
      type: String,
      unique: false,
      required: false
    },
    message: {
      type: String,
      unique: false,
      required: true
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = model("Message", messageSchema);