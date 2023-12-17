const Review = require('../../models/Review');

const postReview = async ({ comment, userId, productId }) => {
  try {
    if (!comment) {
      throw new Error("El comentario es obligatorio.");
    }
    if (!userId) {
      throw new Error("El ID del usuario es obligatorio.");
    }
    if (!productId) {
      throw new Error("El ID del producto es obligatorio.");
    }

    const newReview = new Review({
      comment,
      userId,
      productId,
    });

    const reviewSaved = await newReview.save();

    return reviewSaved;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};

module.exports = postReview;