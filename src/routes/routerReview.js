const { Router } = require("express");
const router = Router();

//Middlewares
const verify = require("../middlewares/Tokens/verifyTokens");

//Controllers
const postReview = require('../controllers/Review/postReview');
const getProductReview = require('../controllers/Review/getProductReviews')

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

module.exports = router;