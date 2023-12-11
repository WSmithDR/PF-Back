const { Schema, model } = require('mongoose');

const purchasesSchema = new Schema(
  {
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
    timestamps: true,
    versionKey: false
  }
);
purchasesSchema.statics.updatePurchaseInfo = async function (purchaseId, userId, productId) {
    try {
      const purchase = await this.findByIdAndUpdate(purchaseId, { userId, productId }, { new: true });
      return purchase;
    } catch (error) {
      throw new Error('Failed to update purchase information.');
    }
  };
  
  module.exports = model("Purchases", purchasesSchema);