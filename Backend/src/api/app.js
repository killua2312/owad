const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

// Routes
app.use("/api/media", require("./routes/mediaRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));

// Static Files
app.use("/public", express.static(path.join(__dirname, "public")));

module.exports = app;
