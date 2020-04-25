const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const EVENTS_API = "http://localhost:4005/events";
const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received Event", type);
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post(EVENTS_API, {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003 -ModerationSVC");
});
