import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { HowItWorks } from "@/components/HowItWorks";
// import { AboutSection } from "@/components/AboutSection";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MobileApps } from "@/components/MobileApps";
import { ContactSection } from "@/components/ContactSection";
import { BackToTop } from "@/components/BackToTop";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  // const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simuler le chargement initial
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
    
    // Ajouter la police Inter
    const head = document.head;
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
    head.appendChild(link);
    
    // Appliquer la police à tout le document
    document.body.style.fontFamily = "'Inter', sans-serif";
    
    // return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : ( */}
        <>
          <Navbar />
          
          <Hero />
          {/* <AboutSection /> */}
          <SearchSection />
          <FeaturedProperties />
          <HowItWorks />
       
          <MobileApps />
          <Testimonials />
          <ContactSection />
          <CtaSection />
          <Footer />
          <BackToTop />
          <Chatbot />
        </>
      {/* )} */}
    </div>
  );
};

export default Index;
