const Review = require('../../models/Review');

const getProductReview = async (productId) => {
  try {
    const reviews = Review.find({productId});

    if (!reviews || reviews.length === 0) {
      throw new Error("Reviews not found.");
    };

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    throw new Error('Unable to fetch review.');
  }
};

module.exports = getProductReview;