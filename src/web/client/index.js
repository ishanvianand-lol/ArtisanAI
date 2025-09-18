import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import { styles } from '../../styles/styles';

export default function ClientMarketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/crafts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner}></div>
        <p>Loading products...</p>
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
        <title>Marketplace | Artisan Marketplace</title>
      </Head>
      <main style={styles.marketplaceContainer}>
        <h1 style={styles.marketplaceHeading}>Marketplace</h1>
        <p style={styles.marketplaceSubheading}>
          Discover unique, handcrafted products from talented local artisans.
        </p>
        <input
          type="search"
          placeholder="Search products..."
          style={styles.marketplaceSearchBox}
        />
        <div style={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}