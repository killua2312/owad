const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  amount: { type: Number, required: true },
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
