const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const endpoints = require("../endpoints.json");
const utils = require("../db/seeds/utils");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data/index");

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));
afterAll(() => db.end());

describe("/api/categories", () => {
  describe("GET", () => {
    it("GET - status 200: responds with array of category objects", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body.categories.length).toBe(4);
        });
    });
    it("GET - status 200: response has correct column properties", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body.categories.length).toBe(4);
          body.categories.forEach((category) => {
            expect(typeof category.slug).toBe("string");
            expect(typeof category.description).toBe("string");
          });
        });
    });
    it("GET - status 404: responds with error when passed an invalid url", () => {
      return request(app).get("/api/nonsense").expect(404);
    });
  });
});

describe("/api", () => {
  describe("GET", () => {
    it("GET - status 200: repsonds with JSON describing all available end points on the api", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).toEqual(endpoints);
        });
    });
  });
});

describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    it("GET - status 200: responds with an object of review data by ID with correct values", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.review.review_id).toBe(1);
          expect(body.review.title).toBe("Agricola");
          expect(body.review.category).toBe("euro game");
          expect(body.review.designer).toBe("Uwe Rosenberg");
          expect(body.review.owner).toBe("mallionaire");
          expect(body.review.review_body).toBe("Farmyard fun!");
          expect(body.review.review_img_url).toBe(
            "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700"
          );
          expect(body.review.created_at).toBe("2021-01-18T10:00:20.514Z");
          expect(body.review.votes).toBe(1);
        });
    });
    it("GET - status 404: responds with error message if resource not found", () => {
      return request(app)
        .get("/api/reviews/100")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Review not found!");
        });
    });
    it("GET - status 400: responds with error message if invalid ID provided", () => {
      return request(app)
        .get("/api/reviews/hello")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
  });
});

describe("/api/reviews", () => {
  describe("GET", () => {
    it("GET - status 200: responds with an array of review objects of correct length", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews.length).toBe(13);
        });
    });
    it("GET - status 200: responds with a review object with the correct properties", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews[0].comment_count).toBe("0");
          body.reviews.forEach((review) => {
            expect(typeof review.owner).toBe("string");
            expect(typeof review.title).toBe("string");
            expect(typeof review.review_id).toBe("number");
            expect(typeof review.category).toBe("string");
            expect(typeof review.review_img_url).toBe("string");
            expect(typeof review.created_at).toBe("string");
            expect(typeof review.votes).toBe("number");
            expect(typeof review.designer).toBe("string");
            expect(typeof review.comment_count).toBe("string");
          });
        });
    });
    it("GET - status 404: responds with error when passed an invalid url", () => {
      return request(app).get("/api/nonsense").expect(404);
    });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  describe("GET", () => {
    it("GET - status 200: responds with an array of comments for the given review_id with correct proeprties", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments.length).toBe(3);
          body.comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.created_at).toBe("string");
            expect(typeof comment.author).toBe("string");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.review_id).toBe("number");
          });
        });
    });
    it("GET - status 200: reponds with empty array if valid ID but no review", () => {
      return request(app)
        .get("/api/reviews/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toEqual([]);
        });
    });
    it("GET - status 400: responds with error message if invalid ID provided", () => {
      return request(app)
        .get("/api/reviews/hello/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request!");
        });
    });
    it("GET - status 404: responds with error message if resource not found", () => {
      return request(app)
        .get("/api/reviews/100/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Review not found!");
        });
    });
  });
});


