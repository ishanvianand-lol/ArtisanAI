// pages/api/ai/generateIdeas.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "No description provided" });
    }

    // Init Gemini client with your API key from env
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Choose a model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(
      `Suggest 5 artisan craft ideas for a room corner with these aesthetics:
      ${description}`
    );

    const text = result.response.text();

    return res.status(200).json({ ideas: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
