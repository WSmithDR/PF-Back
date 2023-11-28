const { Router } = require("express");
const router = Router();

const postReview = require('../controllers/Review/postReview');

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