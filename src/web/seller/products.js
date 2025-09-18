// src/pages/api/seller/products.js

// This is a mock database. In a real application, you'd connect to a database like MongoDB or PostgreSQL.
let products = [
  { id: "prod_101", name: "Handmade Leather Wallet", price: 850, stock: 15, imageUrl: "https://via.placeholder.com/150" },
  { id: "prod_102", name: "Artisan Ceramic Vase", price: 2100, stock: 5, imageUrl: "https://via.placeholder.com/150" },
];

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // READ: Get all products for the seller
      return res.status(200).json(products);
    
    case 'POST':
      // CREATE: Add a new product
      const newProduct = {
        id: `prod_${Date.now()}`, // Simple unique ID
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        imageUrl: req.body.imageUrl,
      };
      products.push(newProduct);
      return res.status(201).json(newProduct);
    
    case 'PUT':
      // UPDATE: Update an existing product
      const { id, name, price, stock, imageUrl } = req.body;
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        products[productIndex] = { id, name, price, stock, imageUrl };
        return res.status(200).json(products[productIndex]);
      } else {
        return res.status(404).json({ message: "Product not found" });
      }

    case 'DELETE':
      // DELETE: Remove a product
      const productIdToDelete = req.body.id;
      const initialLength = products.length;
      products = products.filter(p => p.id !== productIdToDelete);
      if (products.length < initialLength) {
        return res.status(200).json({ message: "Product deleted successfully" });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}