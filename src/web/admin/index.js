import Head from 'next/head';
import styles from 'artisan-marketplace/src/web/styles/globals.css';
import Header from 'artisan-marketplace/src/components/common/Header.js';
import Footer from 'artisan-marketplace/src/components/common/Footer.js';

// Placeholder data - In a real app, this would come from an API
const dashboardData = {
  totalUsers: 1250,
  activeSellers: 85,
  totalProducts: 5400,
  pendingOrders: 12,
};

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.description}>
          Welcome back, Admin! Here's a quick overview of the marketplace.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Total Users</h2>
            <p>{dashboardData.totalUsers}</p>
          </div>
          <div className={styles.card}>
            <h2>Active Sellers</h2>
            <p>{dashboardData.activeSellers}</p>
          </div>
          <div className={styles.card}>
            <h2>Total Products</h2>
            <p>{dashboardData.totalProducts}</p>
          </div>
          <div className={styles.card}>
            <h2>Pending Orders</h2>
            <p>{dashboardData.pendingOrders}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}