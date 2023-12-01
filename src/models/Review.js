const { Schema, model } = require('mongoose');

const reviewsSchema = new Schema(
  {
    comment: {
      type: String,
      unique: false,
      required: true,
    },
    userId: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      unique: false
    }],
    productId: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: false,
      unique: false
    }]
  },
  {
    timestamps: false,
    versionKey: false
  }
);

module.exports = model("Review", reviewsSchema);