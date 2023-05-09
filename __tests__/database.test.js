const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const { categoryData, commentData, reviewData, userData } = require("../db/data/development-data/index")

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));
afterAll(() => db.end());

describe("/api/categories", () => {
  describe("GET", () => {
    it("responds with correct length array of category objects", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((category) => {
          expect(category.body.length).toBe(7);
        });
      })
      it("response has correct column properties", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then((response) => {
            expect(typeof response.body[0].slug).toBe("string");
            expect(typeof response.body[0].description).toBe("string");
          });
      });
  });
});
