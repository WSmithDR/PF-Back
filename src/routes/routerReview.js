const { Router } = require("express");
const router = Router();

const postReview = require('../controllers/Review/postReview');
const getProductReview = require('../controllers/Review/getProductReviews')


router.get("/:id", async(req, res) => {
  const {id} = req.params;
  console.log("voy en la ruta a buscar el review")
  try {
    const reviews = await getProductReview(id);
    return res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({error: error.mesasge});
  }
})

router.post("/", async (req, res) => {
  try {
    const { comment, userId, productId } = req.body;

    const newReview = await postReview({ comment, userId, productId });

    return res.status(200).json(newReview);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ error: error.message });
  };
});

module.exports = router;