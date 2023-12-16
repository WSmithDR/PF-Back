const Review = require("../../models/Review");

const putReview = async ({ comment, userId, productId, reviewId }) => {
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
    
    const theReview = await Review.findById(reviewId);

    if (!theReview) {
      throw new Error("No existe una review con ese ID.");
    };

    if (theReview.userId.toString() !== userId) {
      throw new Error("No tienes permisos para editar esta review.");
    };

    theReview.comment = comment;
    const updatedReview = await theReview.save();

    return updatedReview;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = putReview;
