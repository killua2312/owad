const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return res.sendStatus(401).json({ message: "Not authenticated" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
