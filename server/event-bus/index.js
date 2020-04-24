// @ts-nocheck
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log(event);
  try {
    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);
  } catch (error) {
    console.log("Error");
  }

  res.send({ status: "Ok" });
});
app.listen(4005, () => {
  console.log("Listening on 4005");
});
