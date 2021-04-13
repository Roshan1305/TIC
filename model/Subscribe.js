const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema({
  subscribe_email: String,
});
module.exports = new mongoose.model("Subscribe", subscribeSchema);
