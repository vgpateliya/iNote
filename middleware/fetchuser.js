const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const fetchuser = (req, res, next) => {
  //Get the user from jwt token and add id to the req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please Authenticate Using Valid Token" });
  }
  const data = jwt.verify(token, JWT_SECRET);
  req.User = data.user;
  next();
};

module.exports = fetchuser;
