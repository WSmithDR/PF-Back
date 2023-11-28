const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      require: true
    },
    phoneNumber: {
      type: Number,
      unique: true,
      require: true
    },
    email: {
      type: String,
      unique: true,
      require: true
    },
    password: {
      type: String,
      unique: false,
      require: true
    },
    address: {
      type: String,
      unique: false,
      require: true
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    versionKey: false
  }
);


userSchema.methods.softDelete = function() {
  this.deleted = true;
  return this.save();
};

userSchema.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(this.password, salt);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
};

module.exports = model("User", userSchema);