const { Router } = require("express");
const router = Router();

// Middlewares
const signTokens = require("../middlewares/Tokens/signTokens");
const refreshTokens = require("../middlewares/Tokens/refreshTokens");
const verifyToken = require("../middlewares/Tokens/verifyTokens");

//Controllers
const signUp = require('../controllers/User/signUp');
const authenticateWithGoogle = require("../controllers/User/auth");

// REFRESH TOKENS
router.post("/refresh", refreshTokens, (req, res) => {
  try {
    const newAccessToken = req.locals.newAccessToken;
    const newRefreshToken = req.locals.newRefreshToken;
    
    if (!newAccessToken || !newRefreshToken) {
      throw new Error("Unable to renew access tokens.");
    }

    res.status(200).json({ auth: true, accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ auth: false, message: error.message });
  };
});


//POST
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    const newUser = await signUp({ name, email, password, phoneNumber, address });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);

    res.status(404).json({ error: error.message });
  };
});

router.post("/auth", async (req, res) => {
  const { token } = req.body;

  try {
    const response = await authenticateWithGoogle(token);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
});

module.exports = router;