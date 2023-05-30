const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controller");
const { getApiData } = require("./controllers/api.controller");
const {
  getReviewById,
  getReviews,
  getCommentsByReviewId,
  postComment,
  patchVotes,
} = require("./controllers/reviews.controllers");
const { deleteComment } = require("./controllers/comments.controllers");
const { getUsers } = require("./controllers/users.controller");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api", getApiData);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.post("/api/reviews/:review_id/comments", postComment);

app.patch("/api/reviews/:review_id", patchVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad Request!" });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = { app };
