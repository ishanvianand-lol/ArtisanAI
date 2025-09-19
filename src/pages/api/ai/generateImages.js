// pages/api/ai/generateImages.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { description, userId, userRole } = req.body;

    // Authorization check - only sellers can generate images
    if (!userId || userRole !== "seller") {
      return res.status(403).json({ 
        error: "Access denied. Only authorized sellers can generate images." 
      });
    }

    if (!description) {
      return res.status(400).json({ error: "No description provided" });
    }

    // Pollinations.ai image generation function
    const generatePollinationsImage = (prompt, seed) => {
      const encodedPrompt = encodeURIComponent(prompt);
      return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=768&seed=${seed}&enhance=true&nologo=true`;
    };

    // Create optimized prompts for artisan crafts
    const createArtisanPrompts = (description) => [
      `Beautiful handcrafted artisan ${description}, traditional craftsmanship, detailed texture, warm lighting, professional photography, intricate patterns`,
      
      `Elegant ${description} corner decoration, handmade, rich colors, ornate designs, traditional motifs, studio lighting, premium quality`,
      
      `Traditional ${description} craft display, artisan made, cultural patterns, handwoven details, warm ambient lighting, heritage crafts`,
      
      `Handcrafted ${description} artwork, traditional techniques, intricate details, cultural motifs, warm colors, detailed workmanship`
    ];

    const prompts = createArtisanPrompts(description);
    const images = [];

    // Generate 4 different variations using Pollinations.ai
    for (let i = 0; i < 4; i++) {
      // Use different seeds for variety
      const seed = Math.floor(Math.random() * 1000000) + i * 12345;
      const imageUrl = generatePollinationsImage(prompts[i], seed);
      images.push(imageUrl);
    }

    console.log('Generated images:', images);

    return res.status(200).json({ 
      images: images,
      description: description,
      generatedAt: new Date().toISOString(),
      method: "pollinations_ai",
      message: `Successfully generated ${images.length} artisan craft images`
    });

  } catch (err) {
    console.error("Image generation error:", err);
    return res.status(500).json({ 
      error: "Failed to generate images",
      details: err.message
    });
  }
}