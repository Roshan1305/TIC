const mongoose = require("mongoose");
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
