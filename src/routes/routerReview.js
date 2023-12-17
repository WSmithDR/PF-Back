const { Router } = require("express");
const router = Router();

//Middlewares
const verifyTokens = require("../middlewares/Tokens/verifyTokens");

//Controllers
const postReview = require('../controllers/Review/postReview');
const getProductReview = require('../controllers/Review/getProductReviews')
const putReview = require('../controllers/Review/putReview');
const deleteReview = require('../controllers/Review/deleteReview');

//GET
router.get("/:id", async(req, res) => {
  const {id} = req.params;
  
  try {
    const reviews = await getProductReview(id);
    return res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({error: error.mesasge});
  }
})

//POST
router.post("/", async (req, res) => {
  try {
    const { comment, productId, userId } = req.body;

    const newReview = await postReview({ comment, userId, productId });

    return res.status(200).json(newReview);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  };
});


//PUT
router.put("/", async (req, res) => {
  try {
    const { comment, userId, productId, reviewId } = req.body;

    const updatedReview = await putReview({ comment, userId, productId, reviewId });

    return res.status(200).json(updatedReview);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  };
});


//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { userId } = req.body;

    const deletedReview = await deleteReview({ userId, reviewId: id });

    return res.status(200).json(deletedReview);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  };
});


module.exports = router;