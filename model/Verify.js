const mongoose = require("mongoose");
const verifySchema = new mongoose.Schema({
  email: String,
  otp: String,
});
module.exports = mongoose.model("Verify", verifySchema);
