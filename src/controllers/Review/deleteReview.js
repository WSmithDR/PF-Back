const Review = require("../../models/Review");

const deleteReview = async ({ userId, reviewId }) => {
  try {
    if (!userId) {
      throw new Error("El ID del usuario es obligatorio.");
    };

    if (!reviewId) {
      throw new Error("El ID de la review es obligatorio.");
    };

    const theReview = await Review.findById(reviewId);

    if (!theReview) {
      throw new Error("No existe una review con ese ID.");
    };

    if (theReview.userId.toString() !== userId) {
      throw new Error("No tienes permisos para eliminar esta review.");
    };

    await Review.deleteOne({ _id: reviewId });

    return theReview;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  };
};

module.exports = deleteReview;