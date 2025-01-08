import request from "supertest";
import app from "../../src/app";
import config from "../../src/app/config";

describe("Bus API", () => {
  let token: string;
  let busId: string;

  beforeAll(async () => {
    await request(app).post("/seedAdmin").send();

    const { body } = await request(app).post("/api/v1/auth/login").send({
      email: config.admin_email,
      password: config.admin_pass,
    });

    token = body.data.token;
  });

  it("should create a new bus", async () => {
    const { status, body } = await request(app)
      .post("/api/v1/admin/bus")
      .set("Authorization", token)
      .send({
        name: "Express Line 101",
        source: "New York",
        destination: "Boston",
        departureTime: "2025-01-10T08:30:00.000Z",
        arrivalTime: "2025-01-10T12:30:00.000Z",
        capacity: 50,
      });

    expect(status).toBe(201);
    busId = body.data._id;
  });

  it("should retrieve all buses", async () => {
    const { status, body } = await request(app)
      .get("/api/v1/buses")
      .set("Authorization", token);

    expect(status).toBe(200);
    expect(body.success).toBe(true);
  });

  it("should update a specific bus by ID", async () => {
    const { status, body } = await request(app)
      .put(`/api/v1/admin/bus/${busId}`)
      .set("Authorization", token)
      .send({
        capacity: 60,
      });

    expect(status).toBe(200);
    expect(body.success).toBe(true);
  });

  /** delete does not work because Transaction does not exist in test mode */
});
