const jwt = require("jsonwebtoken");

const refreshTokens = (req, res, next) => {
  const refreshToken = req.headers['x-refresh-token'];
  
  if (!refreshToken) {
    throw new Error("No Refresh token provider!");
  };

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const userId = decoded.id;

    const newAccessToken = jwt.sign({ id: userId }, process.env.ACCESS_SECRET, {
      expiresIn: process.env.ACCESS_EXPIRES,
    });

    const newRefreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_EXPIRES,
    });

    res.locals.newAccessToken = newAccessToken;
    res.locals.newRefreshToken = newRefreshToken;

    next();
  } catch (error) {
    console.log(error);

    throw new Error("Refresh token expired or invalid.", error.message);
  };
};

module.exports = refreshTokens;