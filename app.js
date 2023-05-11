const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categories.controller");
const { getApiData } = require("./controllers/api.controller");
const {
  getReviewById,
  getReviews,
} = require("./controllers/reviews.controllers");

app.get("/api/categories", getCategories);

app.get("/api", getApiData);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
