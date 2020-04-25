const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const EVENTS_API = "http://localhost:4005/events";

const app = express();
app.use(cors());

const posts = {};

app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.send(posts);
});

function handleEvent(type, data) {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.post("/events", async (req, res) => {
  console.log("Received Event", req.body);
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002 -querySVC");
  const res = await axios.get(EVENTS_API);
  for (let event of res.data) {
    console.log("Processing ", event.type);
    handleEvent(event.type, event.data);
  }
});
