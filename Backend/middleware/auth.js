const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("You are not a admin");
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, jwtSecretKey);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid auth token...");
  }
};


const isUser = (req, res, next) => {

  auth(req, res, () => {
    if (req.user._id === req.params._id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not a admin");
    }
  });
};


const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Sorry..You are not a admin.");
    }
  });
};

module.exports = { auth, isUser, isAdmin };