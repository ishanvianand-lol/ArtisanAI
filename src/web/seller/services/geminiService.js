// src/services/geminiService.js
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.visionModel = this.genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
  }

  // Convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

  // Generate product description from image
  async generateProductDescription(imageFile, productDetails = {}) {
    try {
      const imageData = await this.fileToBase64(imageFile);
      const prompt = `
        Analyze this handcrafted artisan product and create a compelling product description.
        
        Product Context:
        - Category: ${productDetails.category || 'Handcrafted Item'}
        - Materials: ${productDetails.materials || 'Traditional materials'}
        - Technique: ${productDetails.technique || 'Traditional craft'}
        - Origin: ${productDetails.origin || 'Local artisan'}
        
        Generate:
        1. An engaging title (max 60 characters)
        2. A detailed description (2-3 paragraphs highlighting heritage and craftsmanship)
        3. Key features (3-5 bullet points)
        4. Cultural significance (1 paragraph)
        5. Care instructions
        6. SEO tags (comma-separated)
        
        Format as JSON with keys: title, description, features, cultural_significance, care_instructions, tags
      `;

      const result = await this.visionModel.generateContent([
        prompt,
        {
          inlineData: {
            data: imageData,
            mimeType: imageFile.type
          }
        }
      ]);

      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error generating product description:', error);
      throw new Error('Failed to generate product description');
    }
  }

  // Generate heritage story for artisan
  async generateHeritageStory(artisanData) {
    const prompt = `
      Create an engaging heritage story for an artisan:
      
      Artisan Information:
      - Name: ${artisanData.name}
      - Craft: ${artisanData.craft}
      - Location: ${artisanData.location}
      - Experience: ${artisanData.experience} years
      - Specialization: ${artisanData.specialization}
      - Family Tradition: ${artisanData.familyTradition || 'No'}
      
      Write a compelling story (3-4 paragraphs) that includes:
      1. Journey into the craft
      2. Traditional techniques and skills
      3. Cultural heritage and significance
      4. Personal passion and dedication
      
      Make it authentic and inspiring for potential customers.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generating heritage story:', error);
      throw new Error('Failed to generate heritage story');
    }
  }

  // Smart pricing suggestions
  async suggestPricing(productData) {
    const prompt = `
      Suggest competitive pricing for this handcrafted product:
      
      Product Details:
      - Category: ${productData.category}
      - Materials: ${productData.materials}
      - Size: ${productData.size}
      - Complexity: ${productData.complexity}
      - Time to make: ${productData.timeToMake} hours
      - Material cost: ₹${productData.materialCost}
      
      Consider:
      1. Fair artisan wages
      2. Market positioning (premium handcrafted)
      3. Material costs
      4. Time investment
      5. Profit margin for sustainability
      
      Return JSON with: recommended_price, price_range_min, price_range_max, reasoning
    `;

    try {
      const result = await this.model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error generating pricing suggestions:', error);
      throw new Error('Failed to generate pricing suggestions');
    }
  }

  // Generate social media content
  async generateSocialContent(productData) {
    const prompt = `
      Create engaging social media content for this handcrafted product:
      
      Product: ${productData.name}
      Category: ${productData.category}
      Story: ${productData.story || 'Beautiful handcrafted item'}
      
      Generate:
      1. Instagram caption (with hashtags)
      2. Facebook post
      3. Twitter post
      4. Pinterest description
      5. Suggested hashtags (15-20)
      
      Focus on heritage, craftsmanship, uniqueness, and emotional connection.
      Format as JSON.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error('Error generating social content:', error);
      throw new Error('Failed to generate social media content');
    }
  }

  // Customer service chatbot
  async handleCustomerQuery(query, context = {}) {
    const prompt = `
      You are a helpful customer service assistant for a heritage artisan marketplace.
      
      Customer Query: "${query}"
      
      Context:
      - Product: ${context.product || 'General inquiry'}
      - Customer: ${context.customer || 'New customer'}
      
      Respond helpfully and professionally. If about:
      - Product details: Highlight craftsmanship and heritage
      - Shipping: Mention careful packaging for handcrafted items
      - Customization: Explain artisan can often customize
      - Returns: Emphasize quality but explain handmade variations
      
      Keep response under 150 words and friendly.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error handling customer query:', error);
      throw new Error('Failed to process customer query');
    }
  }
}

export default new GeminiService();