"use client";

import React, { useState, useEffect } from "react";

const Navigation = () => {

  const [activeSection, setActiveSection] = useState<string | null>('home');
//  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textOffset, setTextOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      //const newScale = 1 + (scrollY * 0.00025); // Adjust 0.001 to control zoom speed
      setTextOffset(scrollY * 0.9);
      const newOpacity = Math.max(0, 1 - (scrollY / 500));
      setOpacity(newOpacity);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section");
//            console.log('Section in view:', sectionName); // Debug log
            if (sectionName) {
              setActiveSection(sectionName);
            }
          }
          else {
            if (entry.target.getAttribute("data-section") === "about" && entry.boundingClientRect.y > 0) {
              // leaving about section to going up to home section
              setActiveSection('home');
            }
          }
        });

      },

      {
        threshold: [0.2, 0.5, 0.7], // Multiple thresholds for better detection
        rootMargin: '-10% 0px -10% 0px' // Adjust trigger area
      }
    );

    const sections = document.querySelectorAll("[data-section]");
//    console.log('Found sections:', Array.from(sections).map(s => s.getAttribute("data-section")));
    
    sections.forEach((section) => observer.observe(section));

    // Set window width after component mounts
    setWindowWidth(window.innerWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  type Section = {
    name: string;
    link: string;
    desktopLinkClass: string;
    mobileLinkClass: string;
  }

  const sections: Record<string, Section> = {
    home: {name: 'Home', link: '#home', desktopLinkClass: 'text-white hover:text-gray-400', mobileLinkClass: 'text-white hover:text-gray-400'}, 
    services: {name: 'Services', link: '#services', desktopLinkClass: 'text-white hover:text-gray-400', mobileLinkClass: 'text-white hover:text-gray-400'}, 
    about: {name: 'About', link: '#about', desktopLinkClass: 'text-black hover:text-gray-400', mobileLinkClass: 'text-black hover:text-gray-400'}, 
 //   gallery: {name: 'Gallery', link: '#gallery', desktopLinkClass: 'text-black hover:text-gray-400', mobileLinkClass: 'text-black hover:text-gray-400'}, 
    contact: {name: 'Contact', link: '#contact', desktopLinkClass: 'text-black hover:text-gray-400', mobileLinkClass: 'text-black hover:text-gray-400'}
  };

  const activeSectionKey = activeSection as keyof typeof sections || 'home';
  const desktopLinkClass = sections[activeSectionKey].desktopLinkClass;
  const mobileLinkClass = sections[activeSectionKey].mobileLinkClass;

  const getActiveLinkClass = (section: Section) => {
//    console.log(activeSection, section.link.replace('#', ''));
    if (activeSection === section.link.replace('#', '') ) {
      return "text-gold-600";
    }
    else {
      return desktopLinkClass;
    }
  }

  const calculateScaledOffset = (textOffset: number) => {
    // Use windowWidth state instead of checking window directly
    const isDesktop = windowWidth >= 768;

    const desktopStart = {
      left: 140,
      top: 300,
      scale: 1.9
    };

    const desktopTarget = {
      left: 0,
      top: 0,
      scale: 1
    };

    const mobileStart = {
      left: 70,
      top: 250,
      scale: 1.5
    };

    const mobileTarget = {
      left: 0,
      top: 0,
      scale: 0.8
    };

    // Use desktop values as initial state for server-side rendering
    const startValues = windowWidth === 0 ? desktopStart : (isDesktop ? desktopStart : mobileStart);
    const targetValues = windowWidth === 0 ? desktopTarget : (isDesktop ? desktopTarget : mobileTarget);

    const progress = Math.min(textOffset / 500, 1);

    return {
      left: startValues.left + (targetValues.left - startValues.left) * progress,
      top: startValues.top + (targetValues.top - startValues.top) * progress,
      scale: startValues.scale + (targetValues.scale - startValues.scale) * progress
    };
  };

  const scaledOffset = calculateScaledOffset(textOffset);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-2 sm:py-6 overflow-visible">


      <div className="max-w-7xl mx-auto flex justify-end items-center overflow-visible">


        {/* Logo - always gold */}
        <div className={`absolute px-3 sm:px-10 py-5 sm:py-10 
          `}
          style={{
            left: `${scaledOffset.left}px`,
            top: `${scaledOffset.top}px`,
            transform: `scale(${scaledOffset.scale})`,
            transition: 'all 0.1s ease-out'
          }}
        >

          <div className="flex flex-col items-center text-gold-600 font-light mr-10">
            <div className="text-3xl sm:text-4xl">BEAUTY CELLAR</div> 
            <div className="text-sm sm:text-base">BY HOLLYWOOD</div> 
          </div>
          <p className="text-white text-base md:text-1xl font-extralight tracking-wide leading-relaxed max-w-md mb-8"
            style={{
              opacity: opacity,
              transition: 'opacity 0.1s ease-out'
            }}>
              Elevate Beauty, Timeless&nbsp;Elegance
          </p>
        </div>

        {/* Desktop Navigation Container - align everything to right */}
        <div className="flex items-center justify-end space-x-5 p-6">
          {/* Navigation Links */}
          <ul className="flex space-x-4 md:space-x-8">
            {Object.values(sections).map((section) => (
              <li key={section.link}>
                <a
                  href={section.link}
                  className={`hidden md:block nav-link text-base sm:text-lg hover:opacity-80 transition-colors 
                    duration-300 hover:scale-110 transition-all
                    ${getActiveLinkClass(section)}`}
                >
                  {section.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className="text-gold-600 bg-black/20 border border-gold-600 
                    px-6 py-4 text-base md:text-lg whitespace-nowrap
                    hover:bg-gold-600/90 hover:scale-110
                    focus:outline-none hover:ring-1 hover:ring-gold-600 hover:ring-offset-1 hover:ring-offset-transparent
                    transition-all duration-300 font-semibold">
            Book Now
          </button>
  
          {/* Mobile Menu Button */}
          <button className={`md:hidden ${mobileLinkClass}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
     </div>
    </div>
  );
};


export default Navigation;
