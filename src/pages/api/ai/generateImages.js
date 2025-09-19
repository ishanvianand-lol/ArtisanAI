// pages/api/ai/generateImages.js
export default async function handler(req, res) {
  // Set CORS headers for better compatibility
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "No description provided" });
    }

    if (typeof description !== 'string' || description.trim().length < 5) {
      return res.status(400).json({ error: "Description must be at least 5 characters long" });
    }

    const cleanDescription = description.trim();

    // Enhanced prompts for beautiful Indian craft designs
    const prompts = [
      `Beautiful handcrafted Indian artisan corner featuring ${cleanDescription}, traditional heritage style, warm lighting, professional photography, high quality, detailed craftsmanship`,
      
      `Elegant home decor display with ${cleanDescription}, Indian cultural motifs, rich textures, artistic arrangement, premium quality, traditional meets modern aesthetic`,
      
      `Stunning craft workspace corner showcasing ${cleanDescription}, vibrant Indian colors, intricate patterns, cozy ambiance, artisan tools, creative atmosphere`,
      
      `Premium heritage craft collection with ${cleanDescription}, museum quality display, soft golden lighting, cultural significance, masterpiece craftsmanship, artistic composition`
    ];

    // Generate unique seed for each request to ensure variety
    const baseTimestamp = Date.now();

    const imageUrls = prompts.map((prompt, index) => {
      // Clean and encode the prompt
      const encodedPrompt = encodeURIComponent(prompt);
      
      // Generate unique seed for each image
      const seed = baseTimestamp + (index * 1000) + Math.floor(Math.random() * 1000);
      
      return {
        id: index + 1,
        prompt: prompt,
        url: `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=512&height=512&model=flux&enhance=true&nologo=true`,
        downloadUrl: `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=1024&height=1024&model=flux&enhance=true&nologo=true`,
        thumbnail: `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=256&height=256&model=flux&enhance=true&nologo=true`
      };
    });

    return res.status(200).json({ 
      success: true,
      images: imageUrls,
      description: cleanDescription,
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    console.error("Image generation error:", err);
    
    // Return more specific error messages
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      return res.status(503).json({ 
        error: "Image generation service is temporarily unavailable. Please try again in a moment." 
      });
    }
    
    return res.status(500).json({ 
      error: "Failed to generate images. Please try again with a different description." 
    });
  }
}