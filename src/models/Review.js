const { Schema, model } = require('mongoose');

const reviewsSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    replies: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        replyComment: {
          type: String,
          required: true,
        },
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model("Review", reviewsSchema);
