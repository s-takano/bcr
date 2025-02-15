"use client";

import Image from "next/image";
import AboutSection from "@/components/AboutSection";
import Navigation from "@/components/NavigationSection";
import { useEffect, useState } from "react";
import ContactSection from "@/components/ContactSection";
import ServicesSection from "@/components/ServicesSection";
import { setHasMounted } from "@/components/NavigationSection/navigationSlice";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [hasMounted, setHasMounted] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newScale = 1 + (scrollY * 0.00025); // Adjust 0.001 to control zoom speed
    const limitedScale = Math.min(newScale, 1.3); // Max 1.3x zoom
    setScale(limitedScale);
  };

  const trackScroll = () => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }
  
  useEffect(() => {
    setHasMounted(true);

    const cleanupTrackScroll = trackScroll();
    
    return () => {
      cleanupTrackScroll();
    }
  }, []);

  

  // Decide navigation link class based on `isAboutInView`
  //const navLinkClass = isAboutInView || isContactInView ? "text-black hover:text-gray-400" : "text-white hover:text-gray-400";

  return (
    <div className={`relative bg-white text-gray-800 font-sans ${!hasMounted ? "opacity-0": "opacity-100"} transform-opacity duration-500 `}>
      {/* Pass the navLinkClass to Navigation */}
      <Navigation />

      {/* Hero Section - made sticky */}
      <section data-section="home" className="fixed inset-0 w-full h-screen">
        {/* Background image */}
        <div className="absolute inset-0 transform translate-x-48 md:translate-x-64 -ml-64">
          <Image
            src="/images/hero-model1.jpg"
            alt="Model with manicure"
            fill
            className={`object-cover transition-transform duration-100 
              object-[80%_20%] sm:object-[50%_20%]`}
            priority
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center'
            }}
          />
        </div>
      </section>

      {/* Spacer to push content below hero height */}
      <div className="h-screen"></div>


      {/* Services Section - will slide over hero */}
      <section data-section="services" className="relative z-20 bg-white">
        <ServicesSection />
      </section>

      {/* About Section - will slide over hero */}
      <section data-section="about" className="relative z-20 bg-white">
        <AboutSection />
      </section>

      {/* Contact Section - will slide over hero */}
      <section data-section="contact" className="relative z-20 bg-white">
     {/*   <ContactSection /> */}
      </section>
    </div>
  );
}
