import request from "supertest";
import app from "../../src/app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const { status, body } = await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        email: "john.doe@example.com",
        password: "password123",
        avatar: "https://example.com/avatar.jpg",
      });

    expect(status).toBe(201);
    expect(body.data).toHaveProperty("token");
  }, 5000);
  it("should log in an existing user", async () => {
    const { status, body } = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "john.doe@example.com",
        password: "password123",
      });
    expect(status).toBe(200);
    expect(body.data).toHaveProperty("token");
  });
});
