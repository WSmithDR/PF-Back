const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true
    },
    number: {
      type: Number,
      unique: false
    },
    phoneNumber: {
      type: Number,
      default: function () {
        return Math.floor(1000000000 + Math.random() * 9000000000);
      }
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: false,
      required: false
    },
    address: {
      type: String,
      unique: false,
      required: false
    },
    deleted: {
      type: Boolean,
      default: false
    },
    verify: {
      type: Boolean,
      default: false
    },
    img: {
      type: String
    },
    Admin: {
      type: Boolean,
      default: false
    },
    myCreated: [{
      type: Schema.ObjectId,
      ref: 'Product'
    }],
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

userSchema.methods.restore = function() {
  this.deleted = false;
  return this.save();
}
userSchema.methods.adminUser = function() {
  this.Admin = true;
  return this.save()
}
userSchema.methods.adminStop = function() {
  this.Admin = false;
  return this.save()
}

module.exports = model("User", userSchema);