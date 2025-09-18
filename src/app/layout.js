import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';

// Clean, modern font similar to Calibri
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Soft, rounded alternative
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Artisan Marketplace',
  description: 'A platform for Indian artisans to sell their unique handmade crafts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}