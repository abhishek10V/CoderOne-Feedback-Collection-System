var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(express.static("."));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  satisfaction: { type: Number, required: true },
  recommend: { type: Number, required: true },
  rate: { type: Number, required: true },
  expectation: { type: Number, required: true },
  service: { type: Number, required: true },
  navigation: { type: Number, required: true },
  features: { type: Number, required: true },
  value: { type: Number, required: true },
  processing: { type: Number, required: true },
  deliver: { type: Number, required: true },
  responsive: { type: Number, required: true },
  ease_of_use: { type: Number, required: true },
  effectiveness: { type: Number, required: true },
  packaging: { type: Number, required: true },
  availability: { type: Number, required: true },
  overall: { type: Number, required: true },
});
const User = mongoose.model("feedback", userSchema);
mongoose.connect("mongodb://localhost:27017/coderone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Connected to Database"));
app
  .get("/", (req, res) => {
    res.set({
      "Allow-Control-Allow-Origin": "*",
    });
    return res.redirect("./feedback.html");
  })
  .listen(5000);
app.post("/feedback", (req, res) => {
  var satisfaction = req.body.satisfaction;
  var recommend = req.body.recommend;
  var rate = req.body.rate;
  var expectation = req.body.expectation;
  var service = req.body.service;
  var navigation = req.body.navigation;
  var features = req.body.features;
  var value = req.body.value;
  var processing = req.body.processing;
  var deliver = req.body.deliver;
  var responsive = req.body.responsive;
  var ease_of_use = req.body.ease_of_use;
  var effectiveness = req.body.effectiveness;
  var packaging = req.body.packaging;
  var availability = req.body.availability;
  var overall = req.body.overall;

  var data = {
    satisfaction: satisfaction,
    recommend: recommend,
    rate: rate,
    expectation: expectation,
    service: service,
    navigation: navigation,
    features: features,
    value: value,
    processing: processing,
    deliver: deliver,
    responsive: responsive,
    ease_of_use: ease_of_use,
    effectiveness: effectiveness,
    packaging: packaging,
    availability: availability,
    overall: overall,
  };

  db.collection("feedback").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log(
      JSON.stringify(
        db.collection("feedback").find({}, function (result) {
          console.log(result);
        })
      )
    );
    console.log("Record Inserted Successfully");
  });
  return res.redirect("./feedback.html");
});
app.post("/sign_up", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var repeat_password = req.body.repeat_password;
  var emailid = req.body.email;

  var data = {
    username: username,
    password: password,
    repeat_password: repeat_password,
    emailid: emailid,
  };
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log(
      JSON.stringify(
        db.collection("users").find({}, function (result) {
          console.log(result);
        })
      )
    );
    console.log("Record Inserted Successfully");
  });
  return res.redirect("./mainform.html");
});
app.post("/login", async (req, res) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });
    if (user) {
      const result = req.body.password === user.password;
      if (result) {
        res.redirect("./mainform.html");
      } else {
        res.redirect("./feedback.html?pass");
      }
    } else {
      res.redirect("./feedback.html?uname");
    }
  } catch {
    res.send("wrong details");
  }
});
