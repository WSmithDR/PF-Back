const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provider!",
    });
  };

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    req.userId = decoded.id;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        auth: false,
        message: "Token expired",
      });
    } else {
      return res.status(401).json({
        auth: false,
        message: "Internal server error",
      });
    }
  }
};

module.exports = verifyToken;