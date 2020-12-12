const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const marioModel = require("./models/marioChar");
const mongoose = require("mongoose");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here

app.get("/mario", (req, res) => {
  res.send("Mario");
});
const marioModel = new mongoose.Schema({
  name: String,
  weight: Number,
});
app.post("/mario", async (req, res) => {
  const name = req.body.name;
  const weight = req.body.weight;
  const newdata = mongoose.model("testaroos", marioModel);

  const newitem = new newdata({
    name: name,
    weight: weight,
  });
  await newitem.save();
  res.status(201).send("successfully Saved Into the Database");
});

module.exports = app;
