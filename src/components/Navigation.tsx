"use client";

import React, { useState, useEffect } from "react";

const Navigation = () => {

  const [activeSection, setActiveSection] = useState<string | null>('home');
//  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [textOffset, setTextOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

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
  const mobileLinkClass = sections[activeSectionKey].mobileLinkClass;

  const getActiveLinkClass = (section: Section) => {
    return activeSection === section.link.replace('#', '') ? "text-gold-600" : "";
  }
  
  type Breakpoint = "large" | "medium" | "small" | "tiny";

  const getBreakpoint = (): Breakpoint => {
    if (windowWidth >= 1024) {
      return "large";
    }
    else if (windowWidth >= 768) {
      return "medium";
    }
    else if (windowWidth >= 640) {
      return "small";
    }
    else {
      return "tiny";
    }
  }

  
  type LogoDimension = {
    start: {
      left: number;
      top: number;
      scale: number;
    };
    target: {
      left: number;
      top: number;
      scale: number;
    };
  }

  const calculateScaledOffset = (textOffset: number) => {    
    // Calculate positions based on screen height
    const screenHeight = hasMounted ? (typeof window !== 'undefined' ? window.innerHeight : 800) : 800;
    const screenWidth = hasMounted ? (typeof window !== 'undefined' ? window.innerWidth : 1024) : 1024;
    const verticalMiddle = screenHeight / 2;
    const horizontalMiddle = screenWidth / 2;

    const breakpoint = getBreakpoint();
//    console.log(breakpoint);

    const logoDimensions: Record<Breakpoint, LogoDimension> = {
      large: {
        start: {
          left: horizontalMiddle - 200,
          top: verticalMiddle - 100, // Adjust 100 based on logo height
          scale: 1.9
        },
        target: {
          left: 20,
          top: 30,
          scale: 1
        }
      },
      medium: {
        start: {
          left: horizontalMiddle - 160,
          top: verticalMiddle - 60, // Adjust 80 for mobile logo height
          scale: 1.5
        },
        target: {
          left: 5,
          top: 20,
          scale: 0.8
        }
      },
      small: {
        start: {
          left: horizontalMiddle - 140,
          top: verticalMiddle - 40, // Adjust 80 for mobile logo height
          scale: 1.5
        },
        target: {
          left: 5,
          top: 15,
          scale: 0.8
        }
      },
      tiny: {
        start: {
          left: horizontalMiddle - 120,
          top: verticalMiddle - 80, // Adjust 80 for mobile logo height
          scale: 1.5
        },
        target: {
          left: -3,
          top: -3,
          scale: 0.8
        }
      }
    }

    const progress = Math.min(textOffset / 500, 1);

    const dimension = logoDimensions[breakpoint];
//    console.log(dimension);

    return {
      left: dimension.start.left + (dimension.target.left - dimension.start.left) * progress,
      top: dimension.start.top + (dimension.target.top - dimension.start.top) * progress,
      scale: dimension.start.scale + (dimension.target.scale - dimension.start.scale) * progress
    };
  };

  const scaledOffset = calculateScaledOffset(textOffset);
  const gradientVisible = textOffset < 50;
  
  return (
    <div className="items-center max-w-7xl mx-auto fixed top-0 left-0 right-0 z-50 
      px-3 sm:px-8 py-2 sm:py-4 md:py-6 
      overflow-visible">

      {/* Logo */}
      <div className={`absolute w-fit`}
        style={{
          left: `${scaledOffset.left}px`,
          top: `${scaledOffset.top}px`,
          transform: `scale(${scaledOffset.scale})`,
          transition: 'all 0.1s ease-out'
        }}
      >
        
        <div className="flex flex-col items-center justify-center text-gold-600 font-light mx-auto">
          {/* BEAUTY CELLAR with gradient */}
          <div className="relative">
            <span className="relative inline-block">
              <div
                className={`absolute pointer-events-none z-[-1]
                  ${gradientVisible ? 'opacity-100' : 'opacity-0'} 
                  transition-opacity duration-500 ease-in-out`}
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.4) 10%, transparent 70%)",
                  top: '-100px',
                  left: '-100px',
                  width: '250px',
                  height: '250px'
                }}
              />
              <span className="text-4xl sm:text-5xl">BEAUTY</span>
            </span>
            <span className="text-4xl sm:text-5xl relative">CELLAR</span>
          </div>

          
          {/* BY HOLLYWOOD with gradient */}
          <div className="relative">
            <div className="text-sm sm:text-base">BY HOLLYWOOD</div>
          </div>
        </div>

        <p className="text-white text-base sm:text-1xl font-extralight tracking-wide leading-relaxed max-w-md mb-8 text-center"
          style={{
            opacity: opacity,
            transition: 'opacity 0.1s ease-out'
          }}>
          Elevate Beauty, Timeless&nbsp;Elegance
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-end">
        {/* Desktop Navigation Container - align everything to right */}
        <div className="flex items-center justify-end space-x-5">
          {/* Navigation Links */}
          <ul className="hidden md:inline-flex space-x-4 md:space-x-4 lg:space-x-6">
            {Object.values(sections).map((section) => (
              <li key={section.link}>
                <a
                  href={section.link}
                  className={`nav-link text-base sm:text-lg hover:opacity-80 transition-colors 
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
                    px-2 sm:px-6 py-1 sm:py-4 
                    text-base md:text-lg 
                    whitespace-nowrap
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
