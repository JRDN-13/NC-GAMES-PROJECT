const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controller");
const { getApiData } = require("./controllers/api.controller");
const {
  getReviewById,
  getReviews,
  getCommentsByReviewId,
  postComment,
} = require("./controllers/reviews.controllers");

app.get("/api/categories", getCategories);

app.get("/api", getApiData);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

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
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = {app};
