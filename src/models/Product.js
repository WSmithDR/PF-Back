const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  sale: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  createdBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    unique: false
  }],
},
{
  timestamps: true,
});

productSchema.methods.softDelete = function() {
  this.deleted = true;
  return this.save();
};

productSchema.methods.restore = function() {
  this.deleted = false;
  return this.save();
}

module.exports = model("Product", productSchema);