const { Router } = require("express");
const router = Router();

// Middlewares
const refreshTokens = require("../middlewares/Tokens/refreshTokens");
const verifyToken = require("../middlewares/Tokens/verifyTokens");

//Controllers
const signUp = require('../controllers/User/signUp');
const authenticateWithGoogle = require("../controllers/User/auth");
const verifyStatus = require("../controllers/User/verifyStatus");
const login = require("../controllers/User/login");
const getUserById = require("../controllers/User/getUserById")
const getAllUsers = require("../controllers/User/getAllUsers")

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
    const { name, email, password, phoneNumber, address,img } = req.body;

    const newUser = await signUp({ name, email, password, phoneNumber, address, img });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  };
});

router.post("/auth", async (req, res) => {
  const { token } = req.body;

  try {
    const response = await authenticateWithGoogle(token);

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await login(email, password);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  };
});


//GET

router.get("/", getAllUsers, (req, res) => {
  
  return res.status(200).json(res.paginatedResults);
});

router.get('/verify/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const response = await verifyStatus(userId);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

module.exports = router;