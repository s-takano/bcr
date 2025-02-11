"use client";

import Image from "next/image";
import AboutSection from "@/components/About";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import Contact from "@/components/Contact";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + (scrollY * 0.00025); // Adjust 0.001 to control zoom speed
      const limitedScale = Math.min(newScale, 1.3); // Max 1.3x zoom
      setScale(limitedScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Decide navigation link class based on `isAboutInView`
  //const navLinkClass = isAboutInView || isContactInView ? "text-black hover:text-gray-400" : "text-white hover:text-gray-400";

  return (
    <main className="bg-white text-gray-800 font-sans relative">
      {/* Pass the navLinkClass to Navigation */}
      <Navigation />

      {/* Hero Section - made sticky */}
      <section data-section="home" className="fixed inset-0 w-full h-screen">
        {/* Background image */}
        <div className="absolute inset-0 transform translate-x-64 -ml-64">
          <Image
            src="/images/hero-model1.jpg"
            alt="Model with manicure"
            fill
            className="object-cover object-[50%_20%] transition-transform duration-100"
            priority
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center'
            }}
          />
        </div>

        {/* Radial gradient overlay */}
        <div  
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 40%, rgba(0, 0, 0, 0.6), transparent 50%)"
          }}
        ></div>
        
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
        <Contact />
      </section>
    </main>
  );
}
