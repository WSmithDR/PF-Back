const { Router } = require("express");
const router = Router();

// Middlewares
const refreshTokens = require("../middlewares/Tokens/refreshTokens");
const verifyToken = require("../middlewares/Tokens/verifyTokens");
const upload = require('../middlewares/Multer/upload');
const uploadImage = require('../middlewares/Cloudinary/uploadImage');

//Controllers
const signUp = require('../controllers/User/signUp');
const authenticateWithGoogle = require("../controllers/User/auth");
const verifyStatus = require("../controllers/User/verifyStatus");
const login = require("../controllers/User/login");
const getUserById = require("../controllers/User/getUserById");
const getAllUsers = require("../controllers/User/getAllUsers");
const postMessage = require("../controllers/User/postMessage");
const putUser = require("../controllers/User/putUser");
const deleteUser = require("../controllers/User/deleteUser");
const restoreUser = require("../controllers/User/restoreUser");
const getAllUsersDeleted = require("../controllers/User/getAllUsersDeleted")
const getAdminCreateProducts = require("../controllers/User/getAdminCreateProducts");

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
    const { name, email, password, number, address, img, Admin } = req.body;

    console.log(req.body);

    const newUser = await signUp({ name, email, password, number, address, img, Admin });

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

router.post("/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;
console.log(req.body);
    const newMessage = await postMessage({ name, email, message });

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  };
});


//GET
router.get("/", getAllUsers, (req, res) => {
  
  return res.status(200).json(res.paginatedResults);
});

router.get("/deleted", getAllUsersDeleted, (req, res) => {
  
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

router.get("/mycreated/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getAdminCreateProducts(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});


//PUT
router.put("/:id", upload, verifyToken, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const admin = req.body.admin
  let img;

  console.log(admin);

  if (req.file && req.file.buffer) {
    try {
      const result = await uploadImage(req.file.buffer);
      img = result.secure_url;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error processing image' });
    }
  }

  try {
    const updatedUser = await putUser(id, updateData, img, admin);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.put("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await deleteUser(id);

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.put("/restore/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await restoreUser(id);

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});


module.exports = router;