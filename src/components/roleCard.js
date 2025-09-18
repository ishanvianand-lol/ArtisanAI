import React from 'react';
import { styles } from '../styles/styles';

export default function RoleCard({ icon, title, description, features, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.roleCard,
        ...(selected ? styles.roleCardSelected : {}),
      }}
    >
      <div style={styles.roleIcon}>{icon}</div>
      <h3 style={styles.roleTitle}>{title}</h3>
      <p style={styles.roleDesc}>{description}</p>
      <ul style={styles.featureList}>
        {features.map((feature, idx) => (
          <li key={idx} style={styles.featureItem}>
            <span style={styles.checkmark}>✓</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}