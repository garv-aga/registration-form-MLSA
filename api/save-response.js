import z from "zod";
import mongoose from "mongoose";

const ResponseData = z.object({
  name: z.string(),
  rollNumber: z.number(),
  currentYear: z.number(),
  branch: z.string(),
  kiitEmailId: z.string(),
  personalEmailId: z.string(),
  phoneNumber: z.number(),
  linkedin: z.string(),
  github: z.string(),
  expectation: z.string(),
  checkbox: z.boolean(),
});

const EventResponseSchema = new mongoose.Schema({
  name: String,
  rollNumber: Number,
  currentYear: Number,
  branch: String,
  kiitEmailId: String,
  personalEmailId: String,
  phoneNumber: Number,
  linkedin: String,
  github: String,
  expectation: String,
  checkbox: Boolean,
  ip: String,
  host: String,
  userAgent: String,
});

const EventResponse = mongoose.model("EventResponse", EventResponseSchema);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const body = req.body;

  if (!body.expectation) {
    body.expectation = "None Given";
  }

  if (!body.github) {
    body.github = "None Given";
  }

  if (!body.linkedin) {
    body.linkedin = "None Given";
  }

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const host = req.headers.host;
  const userAgent = req.headers["user-agent"];

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const isValidData = ResponseData.safeParse(body);

    if (!isValidData.success) {
      return res.status(400).json({ message: "Invalid Data" });
    }

    const newResponse = new EventResponse({
      ...body,
      ip,
      host,
      userAgent,
    });

    await newResponse.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
