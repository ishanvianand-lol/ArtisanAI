import React from 'react';
import { styles } from '../styles/styles';

export default function ProductCard({ product }) {
  return (
    <div style={styles.productCard.card}>
      {/* Product image goes here */}
      <img src={product.imageUrl} alt={product.name} style={styles.productCard.image} />
      <h4 style={styles.productCard.title}>{product.name}</h4>
      <p style={styles.productCard.price}>₹{product.price}</p>
    </div>
  );
}