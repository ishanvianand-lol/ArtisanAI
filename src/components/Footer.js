import React from 'react';
import { styles } from '../styles/styles';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <h3 style={styles.footerTitle}>Heritage Craft Marketplace</h3>
        <p style={styles.footerDesc}>
          Preserving India's artisan traditions through technology
        </p>
      </div>
    </footer>
  );
}