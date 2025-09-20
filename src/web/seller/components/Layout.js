// app/layout.js
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

// Load Google Fonts
// You can choose fonts that match your "Modern + minimal, warm Indian cultural" theme
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'ArtisanAI - Seller Profile',
  description: 'AI-powered marketplace for Indian artisans',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans bg-artisan-cream text-artisan-brown antialiased min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}