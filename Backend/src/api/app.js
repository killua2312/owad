const express = require("express");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
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

const createRateLimiter = (windowMs, max) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: "Too many requests, please try again later." },
  });
};

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: 1000,
});

// Routes
app.use(
  "/media",
  createRateLimiter(15 * 60 * 1000, 50),
  speedLimiter,
  require("./routes/mediaRoutes"),
);
app.use(
  "/",
  createRateLimiter(15 * 60 * 1000, 50),
  speedLimiter,
  require("./routes/userRoutes"),
);
app.use(
  "/wallet",
  createRateLimiter(15 * 60 * 1000, 50),
  speedLimiter,
  require("./routes/walletRoutes"),
);
app.use(
  "/checkAuth",
  createRateLimiter(15 * 60 * 1000, 50),
  speedLimiter,
  require("./routes/checkAuthenticaion"),
);

// Static Files
app.use("/public", express.static(path.join(__dirname, "../../public")));

module.exports = app;
