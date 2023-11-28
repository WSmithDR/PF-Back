const { Schema, model } = require('mongoose');

const adminSchema = new Schema(
  {
    idUser: [{
      type: Schema.ObjectId,
      ref: 'User'
    }],
    store: {
      type: String,
      unique: true,
      require: true
    },
    description: {
      type: String,
      unique: false,
      require: true
    },
    contact: {
      type: String,
      unique: true,
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


adminSchema.methods.softDelete = function() {

  this.deleted = true;
  return this.save();
};

module.exports = model("Admin", adminSchema);