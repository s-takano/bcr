"use client";

import Image from "next/image";
import AboutSection from "@/components/About";
import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const aboutRef = useRef(null);
  const [isAboutInView, setIsAboutInView] = useState(false);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsAboutInView(entry.isIntersecting);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Decide navigation link class based on `isAboutInView`
  const navLinkClass = isAboutInView ? "text-black hover:text-gray-400" : "text-white hover:text-gray-400";

  return (
    <main className="bg-white text-gray-800 font-sans relative">
      {/* Pass the navLinkClass to Navigation */}
      <Navigation navLinkClass={navLinkClass} />

      {/* Hero Section - made sticky */}
      <section className="fixed inset-0 w-full h-screen">
        {/* Background image */}
        <div className="absolute inset-0 transform translate-x-64 -ml-64">
          <Image
            src="/images/hero-model1.jpg"
            alt="Model with manicure"
            fill
            className="object-cover object-[50%_20%]"
            priority
          />
        </div>

        {/* Radial gradient overlay */}
        <div  
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.5), transparent 70%)"
          }}
        ></div>
        
        {/* White text overlay */}
        <div className="relative z-10 flex flex-col justify-center h-full px-12 md:px-16">
          <div className="max-w-2xl">
            {/* Main Hero Headline */}
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl leading-none mb-2 sm:mb-4 max-w-md">
              Elevate Beauty,
              <br />
              Timeless&nbsp;Elegance
            </h1>

            {/* Sub-Heading */}
            <p className="text-white text-lg md:text-xl font-extralight tracking-wide leading-relaxed max-w-md mb-8">
              Where time-honored expertise meets
              <br className="hidden md:block" />
              modern beauty artistry in <strong className="font-bold text-lg">Roppongi Hills</strong>
            </p>


            {/* CTA */}
            <button className="text-gold-600 bg-black/20 border border-gold-600 
                             px-10 py-4 text-base md:text-lg 
                             hover:bg-gold-600 hover:text-gray-900 transition-colors font-semibold">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Spacer to push content below hero height */}
      <div className="h-screen"></div>

      {/* About Section - will slide over hero */}
      <section className="relative z-20 bg-white">
        <AboutSection ref={aboutRef} />
      </section>

      {/* ... Additional sections ... */}
    </main>
  );
}
