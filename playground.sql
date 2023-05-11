\c nc_games_test

\dt

\d comments

\d reviews

SELECT * FROM reviews;

SELECT * FROM comments;

SELECT owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY created_at DESC;
