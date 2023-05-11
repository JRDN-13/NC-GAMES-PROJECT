const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/development-data/index");

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));
afterAll(() => db.end());

describe("/api/categories", () => {
  describe("GET", () => {
    it("GET - status 200: responds with array of category objects", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((category) => {
          expect(category.body.length).toBe(7);
        });
    });
    it("GET - status 200: response has correct column properties", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(7);
          body.forEach((category) => {
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
