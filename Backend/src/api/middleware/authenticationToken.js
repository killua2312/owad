const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401).json({ message: "Not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    const userFound = await User.findById(user.userId);
    if (!userFound) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
