const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 4001;

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });

  commentByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});