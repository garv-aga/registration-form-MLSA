import z from "zod";
import mongoose from "mongoose";
// import mailGun from "mailgun.js"
// import formData from "form-data"

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

    // const MailGun = new mailGun(formData)

    // const mg = MailGun.client({
    //   username: 'api',
    //   key: process.env.MAILGUN_API_KEY
    // })
    
    // const data = {
    //   from: 'MLSA KIIT Chapter <mailgun@sandbox38b7cf3ee90f44f7b73a64da9cb7d6a8.mailgun.org>',
    //   to: body.kiitEmailId,
    //   subject: 'Hello',
    //   text: 'Testing some Mailgun awesomness!'
    // };

    // const mailRes = await mg.messages.create('sandbox38b7cf3ee90f44f7b73a64da9cb7d6a8.mailgun.org', data)
    // console.log(mailRes)

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
