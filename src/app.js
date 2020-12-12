const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");
const mongoose = require("mongoose");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
const isnullorUndefined = (val) => {
  return val === null || val === undefined;
};
app.get("/mario", async (req, res) => {
  const data = await marioModel.find();
  res.status(200).send(data);
});

app.get("/mario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await marioModel.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post("/mario", async (req, res) => {
  const name = req.body.name;
  const weight = req.body.weight;

  if (isnullorUndefined(name) || isnullorUndefined(weight)) {
    res.status(400).send({
      message: "either name or weight is missing",
    });
  } else {
    const newmarioDocument = new marioModel({
      name,
      weight,
    });

    await newmarioDocument.save();
    res.status(201).send(newmarioDocument);
  }
});

app.patch("/mario/:id", async (req, res) => {
  const id = req.params.id;
  const value = req.body;
  try {
    const currentValue = await marioModel.findById(id);
    if (isnullorUndefined(value.name) && isnullorUndefined(value.weight)) {
      res.status(400).send({ message: error.message });
    }
    if (!isnullorUndefined(value.name) && !isnullorUndefined(value.weight)) {
      currentValue.name = value.name;
      currentValue.weight = value.weight;
      res.send(currentValue);
    }

    if (!isnullorUndefined(value.name)) {
      currentValue.name = value.name;
      res.send(currentValue);
    }

    if (!isnullorUndefined(value.weight)) {
      currentValue.weight = value.weight;
      res.send(currentValue);
    }
    await currentValue.save();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.delete("/mario/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await marioModel.findById(id);
    await marioModel.deleteOne({ _id: id });
    res.status(200).send({ message: "character deleted" });
    data.save();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = app;
