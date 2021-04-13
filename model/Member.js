const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
  membername: String,
  photo: String,
  linkedIn: String,
  github: String,
  dept: String,
  year: String,
  batch: String,
  cluster: String,
});
module.exports = mongoose.model("Member", memberSchema);
const formatClusterSchema = new mongoose.Schema({
  year: String,
  teams: [
    {
      name: String,
      members: [memberSchema],
    },
  ],
});
module.exports = mongoose.model("FormatCluster", formatClusterSchema);
