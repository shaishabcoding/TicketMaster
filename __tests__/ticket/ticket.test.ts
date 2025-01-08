import request from "supertest";
import app from "../../src/app";
import config from "../../src/app/config";

describe("Ticket API", () => {
  let token: string;
  let busId: string;

  beforeAll(async () => {
    await request(app).post("/seedAdmin").send();

    const { body } = await request(app).post("/api/v1/auth/login").send({
      email: config.admin_email,
      password: config.admin_pass,
    });

    token = body.data.token;

    const busResponse = await request(app)
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

    expect(busResponse.status).toBe(201);
    busId = busResponse.body.data._id;
  });

  it("should create a ticket", async () => {
    const response = await request(app)
      .post("/api/v1/admin/ticket")
      .set("Authorization", token)
      .send({
        busId,
        price: 15.75,
        seatNumber: 5,
        timeSlot: "2025-01-12T10:00:00Z",
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should retrieve all tickets", async () => {
    const response = await request(app)
      .get("/api/v1/tickets")
      .set("Authorization", token)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
