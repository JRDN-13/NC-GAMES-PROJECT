const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

exports.fetchReviewById = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review not found!" });
      }
      return result.rows[0];
    });
};

exports.fetchReviews = () => {
  return db
    .query(
      `SELECT owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY created_at DESC;`
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchCommentsByReviewId = (review_id) => {
  return checkExists(review_id)
    .then(() => {
      return db.query(`SELECT * FROM comments WHERE review_id = $1 GROUP BY comment_id ORDER BY created_at DESC;`,
      [review_id]);
    })
    .then((result) => {
      return result.rows;
    });
};
