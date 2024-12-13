const request = require("supertest");
const app = require("../app");

describe("User API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ name: "John Doe", email: "john@example.com", password: "password" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully.");
  });
});
