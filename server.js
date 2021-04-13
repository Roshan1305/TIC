const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(express.json());
// app.set("port", 3001);

app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (error) {
  console.error("Database connection error:", error);
});

mongoose.connection.once("open", function () {
  console.log("Database connected");
});
// mongoose.connect("mongodb://localhost:27017/IoTDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
//Yesss

// Set our backend port to be either an environment variable or port 5000
const port = 3001 || process.env.PORT;

//  This middleware informs the express application to serve our compiled React files
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
//Non api requests in production
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//     // Add production middleware such as redirecting to https

//     // Express will serve up production assets i.e. main.js
//     app.use(express.static(__dirname + '/client/build'));
//     // If Express doesn't recognize route serve index.html
//     const path = require('path');
//     app.get('*', (req, res) => {
//         res.sendFile(
//             path.resolve(__dirname, 'client', 'build', 'index.html')
//         );
//     });
// }
const finishedEventSchema = new mongoose.Schema({
  event_name: String,
  event_sponsors: String,
  event_desc: String,
  event_winners: String,
  event_date: String,
  no_of_participants: String,
  event_cluster: String,
  event_images: [],
});
const FinishedEvents = mongoose.model("FinishedEvents", finishedEventSchema);

const registerEvents = new mongoose.Schema({
  event_name: String,
  event_sponsors: String,
  event_desc: String,
  event_date: String,
  event_time: String,
  form: String,
  poster: String,
});
const RegisterEvents = mongoose.model("RegisterEvents", registerEvents);

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
const Member = mongoose.model("Member", memberSchema);

const clusterSchema = new mongoose.Schema({
  cluster_name: String,
  cluster_members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
});
const Cluster = mongoose.model("Cluster", clusterSchema);

const formatClusterSchema = new mongoose.Schema({
  year: String,
  teams: [
    {
      name: String,
      members: [memberSchema],
    },
  ],
});
const FormatCluster = mongoose.model("FormatCluster", formatClusterSchema);

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);

const verifySchema = new mongoose.Schema({
  email: String,
  otp: String,
});
const Verify = mongoose.model("Verify", verifySchema);

var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const subscribeSchema = new mongoose.Schema({
  subscribe_email: String,
});
const Subscribe = new mongoose.model("Subscribe", subscribeSchema);

const api = require("./routes/routes");
app.use("/api/v1/", api);
// Catch any bad requests
app.get("*", (req, res) => {
  res.status(200).json({
    msg: "Catch All",
  });
});

app.listen(process.env.PORT || 3001, function () {
  console.log("App started");
});
