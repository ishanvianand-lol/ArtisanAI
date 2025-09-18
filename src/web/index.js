import Head from 'next/head';
import Link from 'next/link';
import { styles } from '../web/styles/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureCard from '../components/featureCard';
import { FaPaintBrush, FaSeedling, FaHandsHelping } from 'react-icons/fa';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Artisan Marketplace | Handmade Crafts from India</title>
        <meta name="description" content="A platform for Indian artisans to sell their unique handmade crafts." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Celebrating India's Artisan Heritage
            </h1>
            <p style={styles.heroSubtitle}>
              Connecting passionate artisans with craft lovers worldwide.
            </p>
            <div style={styles.heroButtons}>
              <Link href="/login" style={styles.primaryBtn}>
                Join as an Artisan
              </Link>
              <Link href="/client" style={styles.secondaryBtn}>
                Explore the Marketplace
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={styles.statsSection}>
          <div style={styles.statsContainer}>
            <div style={styles.stat}>
              <h2 style={styles.statNumber}>150+</h2>
              <p style={styles.statLabel}>Artisans Onboarded</p>
            </div>
            <div style={styles.stat}>
              <h2 style={styles.statNumber}>500+</h2>
              <p style={styles.statLabel}>Unique Products</p>
            </div>
            <div style={styles.stat}>
              <h2 style={styles.statNumber}>10+</h2>
              <p style={styles.statLabel}>States Represented</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={styles.featuresSection}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={styles.sectionTitle}>Why Choose Our Platform?</h2>
            <p style={styles.roleSubtitle}>We empower artisans with the tools they need to succeed.</p>
            <div style={styles.featuresGrid}>
              <FeatureCard 
                icon={<FaPaintBrush />} 
                title="Curated Marketplace"
                desc="A beautiful showcase for your creations, attracting buyers who value authentic art."
              />
              <FeatureCard 
                icon={<FaSeedling />} 
                title="Growth & Support"
                desc="Access to resources and mentorship to grow your craft and your business."
              />
              <FeatureCard 
                icon={<FaHandsHelping />} 
                title="Community Focused"
                desc="Connect with fellow artisans, share knowledge, and build a supportive network."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}