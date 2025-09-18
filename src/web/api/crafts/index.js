// src/pages/api/crafts/index.js

const products = [
  {
    id: "prod_001",
    name: "Hand-painted Ceramic Mug",
    price: 450,
    imageUrl: "https://via.placeholder.com/300/e9c46a/000000?text=Mug",
    description: "A beautiful, hand-painted ceramic mug. Perfect for coffee and tea lovers.",
  },
  {
    id: "prod_002",
    name: "Woven Bamboo Basket",
    price: 800,
    imageUrl: "https://via.placeholder.com/300/f4a261/000000?text=Basket",
    description: "A sturdy, hand-woven basket made from natural bamboo fibers.",
  },
  {
    id: "prod_003",
    name: "Block-printed Scarf",
    price: 1200,
    imageUrl: "https://via.placeholder.com/300/2a9d8f/000000?text=Scarf",
    description: "Soft cotton scarf with intricate block-printed patterns.",
  },
  {
    id: "prod_004",
    name: "Carved Wooden Elephant",
    price: 1500,
    imageUrl: "https://via.placeholder.com/300/e76f51/000000?text=Elephant",
    description: "A small, detailed elephant figurine carved from a single piece of wood.",
  },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return the full list of products for a GET request
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    // Handle POST request logic for adding a new craft
    // For now, this is a placeholder response
    res.status(201).json({ message: 'Craft uploaded successfully' });
  } else {
    // Return a Method Not Allowed error for any other method
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}