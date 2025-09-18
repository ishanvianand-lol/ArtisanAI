import formidable from 'formidable';
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false, // Disables body parser to allow formidable to handle the request
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = formidable();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Step 1: Get description or image
    const description = fields.description?.[0];
    const image = files.image?.[0]; // Access the file object if it exists

    // Step 2 (Optional): Extract style tags from image using Vision model
    // This part requires a separate API call to a vision model (like GPT-4 Vision or Google Vision AI)
    // Placeholder logic for now:
    const styleTags = ['handcrafted', 'bohemian'];

    // Step 3 (Optional): Search your DB for similar crafts
    // This would involve a vector search on your database
    // Placeholder data:
    const similarCrafts = [
      { id: "prod_001", name: "Hand-painted Ceramic Mug", price: 450 },
      { id: "prod_002", name: "Woven Bamboo Basket", price: 800 },
    ];

    // Step 4: Generate a preview image using OpenAI's DALL-E model
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `A cozy room with a ${description}, include artisanal crafts and an Indian aesthetic.`;
    
    const gen = await openai.images.generate({ 
      model: "dall-e-3", // Using the latest model
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = gen.data[0].url;

    // Return the generated image URL along with other data
    res.status(200).json({
      imageUrl,
      styleTags,
      similarCrafts,
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}