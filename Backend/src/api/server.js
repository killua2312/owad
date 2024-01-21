const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_STRING);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running");
});
