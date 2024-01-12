const User = require("../models/user");
const Wallet = require("../models/wallet");

const walletController = {
  async createWallet(id) {
    try {
      const wallet = new Wallet({
        userId: id,
        amount: 0,
      });
      await wallet.save();
    } catch (error) {
      console.error(error);
    }
  },

  async getWallet(req, res) {
    try {
      const wallet = await Wallet.findOne({ userId: req.user.userId });
      if (!wallet) {
        return res.status(401).json({ message: "Invalid userId" });
      }
      res.send(wallet);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async updateWallet(req, res) {
    try {
      const wallet = await Wallet.findOneAndUpdate(
        { userId: req.user.userId },
        { amount: req.body.amount },
        { new: true }
      );
      if (!wallet) {
        return res.status(404).send();
      }
      res.send(wallet);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async deleteWallet(id) {
    try {
      await Wallet.deleteOne({ userId: id });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = walletController;
