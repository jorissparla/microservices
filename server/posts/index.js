const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const EVENTS_API = "http://localhost:4005/events";

const app = express();
app.use(cors());

app.use(bodyParser.json());
const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post(EVENTS_API, {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body);
  res.send({});
});
app.listen(4000, () => {
  console.log("Listening on 4000 -PostSVC");
});
