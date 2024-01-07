const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  release: { type: String, required: true },
  rating: {
    type: String,
    required: true,
    enum: ["U", "U/A", "A", "G", "PG", "PG-13", "R", "NC-17", "TV-PG"],
  },
  genre: { type: [String], required: true },
  summary: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
