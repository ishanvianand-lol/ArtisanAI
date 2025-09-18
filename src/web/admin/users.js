import Head from 'next/head';
import styles from '../../styles/globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Placeholder data
const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'client' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'seller' },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 4, name: 'Artisan A', email: 'artisan.a@example.com', role: 'seller' },
];

export default function UserManagement() {
  const handleDelete = (userId) => {
    // In a real application, you would make an API call here to delete the user
    console.log(`Deleting user with ID: ${userId}`);
    alert(`User with ID ${userId} deleted (simulated)`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>User Management</title>
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>User Management</h1>
        <p className={styles.description}>Manage all users registered on the platform.</p>
        
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
}
