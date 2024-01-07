const Media = require("../models/media");

const mediaController = {
  async createMedia(req, res) {
    try {
      const newMedia = await Media.create(req.body);
      await newMedia.save();
      res.status(201).json(newMedia);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllMedia(req, res) {
    try {
      const allMedia = await Media.find({});
      res.send(allMedia);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getOneMedia(req, res) {
    try {
      const oneMedia = await Media.findById(req.params.id);
      if (!oneMedia) {
        return res.status(404).send();
      }
      res.send(oneMedia);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async updateMedia(req, res) {
    try {
      const media = await Media.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!media) {
        return res.status(404).send();
      }
      res.send(media);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async deleteMedia(req, res) {
    try {
      const media = await Media.findByIdAndDelete(req.params.id);
      if (!media) {
        return res.status(404).send();
      }
      res.send(media);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = mediaController;
