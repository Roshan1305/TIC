const mongoose = require("mongoose");
const clusterSchema = new mongoose.Schema({
  cluster_name: String,
  cluster_members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
});
module.exports = mongoose.model("Cluster", clusterSchema);
