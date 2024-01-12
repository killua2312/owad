const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const walletController = require("./walletController");
require("dotenv").config();

const userController = {
  async createUser(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
      });
      const savedUser = await user.save();

      // creating wallet when user is created
      walletController.createWallet(savedUser._id);

      res.status(201).json({ userId: savedUser._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }

      // deleting Wallet and transactions when user deleted
      walletController.deleteWallet(user._id);

      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;
