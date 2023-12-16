const Review = require('../../models/Review');
const User = require('../../models/User');

const getProductReview = async (productId) => {
  try {
    const reviews = await Review.find({ productId })
      .populate('userId')
      .exec();

    if (!reviews || reviews.length === 0) {
      throw new Error("Sin comentarios.");
    }

    return reviews;
  } catch (error) {
    console.error(error);

    throw new Error(error.message);
  }
};

module.exports = getProductReview;