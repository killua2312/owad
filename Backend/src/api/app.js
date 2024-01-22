const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["Content-Length", "Authorization"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  maxAge: 86400,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

// Routes
app.use("/api/media", require("./routes/mediaRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/checkAuth", require("./routes/checkAuthenticaion"));

// Static Files
app.use("/public", express.static(path.join(__dirname, "../../public")));

module.exports = app;
