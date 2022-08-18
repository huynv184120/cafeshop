const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

ImageModel = mongoose.model("Image", imageSchema);
module.exports = ImageModel;
