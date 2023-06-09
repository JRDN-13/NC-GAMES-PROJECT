const {
  fetchReviewById,
  fetchReviews,
  fetchCommentsByReviewId,
  insertComment,
  updateVotes,
} = require("../models/reviews.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  fetchReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { username, body } = req.body;
  insertComment(body, review_id, username)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateVotes(inc_votes, review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};
