const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");
const signTokens = require('../../middlewares/Tokens/signTokens');

const googleClientId = process.env.CLIENT_ID;
const googleClient = new OAuth2Client(googleClientId);

const authenticateWithGoogle = async (token) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name});
      await user.save();
    }

    const { accessToken, refreshToken } = signTokens(user._id);

    return { access: true, accessToken, refreshToken };
  } catch (error) {
    console.error("Error authenticating with Google:", error);
    throw { access: false, error: "Invalid Google token" };
  };
};

module.exports = authenticateWithGoogle;