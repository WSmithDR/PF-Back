const Review = require('../../models/Review');

const postReview = async ({ comment, userId, productId }) => {
  try {
    if (!comment || !userId || !productId ) {
      throw new Error("Missing data")
    };

    const review = new Review({
      comment,
      userId,
      productId,
    });

    const reviewSaved = await review.save();

    if (reviewSaved) {
      const message = "Review created.";

      return message;
    } else {
      throw new Error("Review couldn't be created.")
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = postReview;