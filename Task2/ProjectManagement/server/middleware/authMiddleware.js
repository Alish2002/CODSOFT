const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

// authenicating user
const authMiddleware = {
  authenticate: async (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) res.status(401).send({ message: "Access Denied" });
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decoded.id);

      if (!user) res.status(401).send({ message: "User not found" });

      next();
    } catch (err) {
      res.status(500).send({ message: "Error authenticating the user" });
    }
  },
  // authorizing user
  authorize: async (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        res.status(403).send({ message: "Access Denied" });
      }
      next();
    };
  },
};
module.exports = authMiddleware;
