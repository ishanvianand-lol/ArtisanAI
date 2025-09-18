import { useState, useEffect } from 'react';
import Head from 'next/head';
import { styles } from '../../styles/styles';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  // Fetch products from the backend on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seller/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Failed to add product');
      await response.json();
      setNewProduct({ name: '', price: '', stock: '' }); // Clear form
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch('/api/seller/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ ...styles.loadingScreen, color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Seller Dashboard | Artisan Marketplace</title>
      </Head>
      <main style={styles.sellerDashboardContainer}>
        <h1 style={styles.sellerDashboardHeading}>Seller Dashboard</h1>
        <p style={styles.sellerDashboardSubheading}>
          Welcome back! Manage your products and track your sales efficiently.
        </p>

        <form onSubmit={handleAddProduct} style={styles.addProductForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            style={styles.formInput}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            style={styles.formInput}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            style={styles.formInput}
            required
          />
          <button type="submit" style={styles.button}>Add New Product</button>
        </form>

        <div style={styles.productList}>
          {products.length === 0 ? (
            <p>You have no products listed.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} style={styles.productItem}>
                <div style={styles.productInfo}>
                  <h3 style={styles.productTitle}>{product.name}</h3>
                  <p style={styles.productDetails}>Price: ₹{product.price} | Stock: {product.stock}</p>
                </div>
                <div style={styles.productActions}>
                  <button style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} style={styles.deleteBtn}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}