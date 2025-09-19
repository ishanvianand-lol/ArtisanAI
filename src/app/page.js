"use client";
import { useAuth } from "@/hooks/useAuth";
import { useAI } from "@/hooks/useAI";

// Components
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorBanner from "@/components/common/ErrorBanner";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AISection from "@/components/sections/AISection";
import RoleSection from "@/components/sections/RoleSection";

export default function Page() {
  const {
    user,
    role,
    loading,
    error,
    setError,
    handleLogin,
    handleGoogleLogin,
    handleRegister,
    handleLogout,
    handleRoleSelect,
    handleContinue,
  } = useAuth();

  const {
    desc,
    setDesc,
    images,
    imagesLoading,
    imagesError,
    handleGenerateImages,
    clearImages,
  } = useAI();

  // Loading screen
  if (loading && !user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Header
        user={user}
        loading={loading}
        handleLogin={handleLogin}
        handleGoogleLogin={handleGoogleLogin}
        handleLogout={handleLogout}
      />
      
      <ErrorBanner error={error} onClose={() => setError("")} />
      
      <main>
        <HeroSection
          user={user}
          role={role}
          loading={loading}
          handleLogin={handleLogin}
          handleContinue={handleContinue}
        />
        
        <StatsSection />
        <AboutSection />
        <FeaturesSection />
        
        {/* AI Section - Only for authenticated sellers */}
        {user && role === 'seller' && (
          <AISection
            desc={desc}
            setDesc={setDesc}
            images={images}
            imagesLoading={imagesLoading}
            imagesError={imagesError}
            handleGenerateImages={handleGenerateImages}
            clearImages={clearImages}
          />
        )}
        
        <RoleSection
          user={user}
          role={role}
          handleRoleSelect={handleRoleSelect}
          handleContinue={handleContinue}
        />
      </main>
      
      <Footer />
    </div>
  );
}