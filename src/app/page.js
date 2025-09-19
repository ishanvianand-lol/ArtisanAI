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
    handleRegister, // Add this if any components need registration
    handleLogout,
    handleRoleSelect,
    handleContinue,
  } = useAuth();

  const {
    desc,
    setDesc,
    ideas,
    ideasLoading,
    ideasError,
    handleGenerateIdeas,
    clearIdeas,
  } = useAI();

  // Loading screen
  if (loading && !user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header
        user={user}
        loading={loading}
        handleLogin={handleLogin}
        handleGoogleLogin={handleGoogleLogin}
        handleLogout={handleLogout}
      />
      <ErrorBanner error={error} onClose={() => setError("")} />
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
      <AISection
        desc={desc}
        setDesc={setDesc}
        ideas={ideas}
        ideasLoading={ideasLoading}
        ideasError={ideasError}
        handleGenerateIdeas={handleGenerateIdeas}
        clearIdeas={clearIdeas}
      />
      <RoleSection
        user={user}
        role={role}
        handleRoleSelect={handleRoleSelect}
        handleContinue={handleContinue}
      />
      <Footer />
    </>
  );
}