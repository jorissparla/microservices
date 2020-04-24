const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { randomBytes } = require("crypto");
const EVENTS_API = "http://localhost:4005/events";
const app = express();

app.use(cors());
app.use(bodyParser.json());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  await axios.post(EVENTS_API, {
    type: "CommentCreated",
    data: { postId: req.params.id, id: commentId, content },
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body);
  res.send({});
});
app.listen(4001, () => {
  console.log("Listening on 4001");
});
