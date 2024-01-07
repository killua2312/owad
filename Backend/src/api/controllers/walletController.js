const Wallet = require("../models/wallet");

const walletController = {
  async createWallet(req, res) {
    const userId = req.user.userId;

    try {
      const wallet = new Wallet({
        userId: userId,
        amount: 0,
      });
      const savedWallet = await wallet.save();
      res.status(201).json({ walletId: savedWallet._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
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
};

module.exports = walletController;
