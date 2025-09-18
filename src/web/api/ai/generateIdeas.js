// pages/api/ai/generateIdeas.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const { description } = req.body; // user's style description

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Suggest 5 artisan craft ideas for a room corner with these aesthetics:
      ${description}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ ideas: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}