import React from 'react';
import { styles } from '../styles/styles';

export default function Header({ user, handleLogin, handleLogout }) {
  return (
    <header style={styles.header}>
      <div style={styles.nav}>
        <h2 style={styles.logo}>Heritage Craft</h2>
        <div style={styles.navLinks}>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#artisans" style={styles.navLink}>Artisans</a>
          {!user ? (
            <button style={styles.loginBtn} onClick={handleLogin}>Join Us</button>
          ) : (
            <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}