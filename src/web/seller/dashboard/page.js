// seller/[sellerId]/page.js
import React from 'react';
import Navbar from '@/components/Navbar';
import ProfileHeader from './components/ProfileHeader';
import StorytellingBio from './components/StorytellingBio';
import PersonalDetails from './components/PersonalDetails';
import WorkshopGallery from './components/WorkshopGallery';
import ImpactHighlight from './components/ImpactHighlight';

const SellerProfilePage = ({ params }) => {
  // Use params.sellerId to fetch data for the specific artisan
  const sellerId = params.sellerId;
  const sellerData = { /* Fetch data based on sellerId */ };

  return (
    <div className="bg-artisan-cream font-sans text-artisan-brown min-h-screen">
      <Navbar />

      <main className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Profile Sections */}
        <ProfileHeader seller={sellerData} />
        <StorytellingBio seller={sellerData} />
        <PersonalDetails seller={sellerData} />
        <WorkshopGallery seller={sellerData} />
        <ImpactHighlight seller={sellerData} />

        {/* Link to the separate products page */}
        <div className="mt-8 text-center">
          <a
            href={`/seller/products/${sellerId}`}
            className="inline-block bg-artisan-saffron text-white py-2 px-6 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
          >
            View All Products
          </a>
        </div>
      </main>
    </div>
  );
};

export default SellerProfilePage;