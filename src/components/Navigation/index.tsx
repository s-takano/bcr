"use client";

import React, { useEffect } from "react";
import { isElementInViewport } from "@/utils/viewport";
import { useSelector, useDispatch } from 'react-redux';
import { 
  setHasMounted,  
  setLastScrollY,
  setActiveSection,
  updateLogoAnimation,
  selectNavigationColor,
  selectLogoTextColor,
  selectGradientOpacity,
  selectIsLogoAnimationComplete,
  setNavigationHeight,
  setNavigationHeightMax
} from './navigationSlice';

import { RootState, AppDispatch } from "@/app/store";

import { 
  ActiveLinkColor, 
  InactiveCompleteLinkColor, 
  InactiveTransitionLinkColor, 
  SectionConfig, 
  sections } from "./LogoTransformConfigs";

const Navigation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    activeSection,
    subHeadlineOpacity,
    hasMounted,
    lastScrollY,
    logoTransform,
    navigationHeight,
    navigationHeightMax
  } = useSelector((state: RootState) => state.navigation);
  

  const getScrollDisplacement = () => {
    return window.scrollY - lastScrollY;
  }

  const navigationColor = useSelector(selectNavigationColor);
  const logoTextColor = useSelector(selectLogoTextColor);
  const gradientOpacity = useSelector(selectGradientOpacity);
  const IsLogoAnimationComplete = useSelector(selectIsLogoAnimationComplete);

  const getNavigationRoot = () => {
    return document.getElementById('navigation-root');
  }

  const slideNavigation = () => {
    
    // Get the section that has activeSection as data-section
    const firstSectionElement = document.querySelector(`[data-section="${"services"}"]`);
    if (!firstSectionElement) return;

    // get root element
    const rootElement : HTMLElement = document.getElementById('navigation-root') as HTMLElement;
    if (!rootElement) return;

    const scrollDisplacement = getScrollDisplacement();

    let newHeight = navigationHeight;

    if(firstSectionElement.getBoundingClientRect().top <= navigationHeightMax)
      newHeight = navigationHeight - scrollDisplacement;
    else
      newHeight = navigationHeightMax;

    newHeight = Math.max(0, Math.min(navigationHeightMax, Math.round(newHeight)));
    dispatch(setNavigationHeight(newHeight));

    const newTop = newHeight - navigationHeightMax;

    rootElement.style.top = `${newTop}px`;
  }

  const trackScroll = () => {
    
    const handleScroll = () => {
      dispatch(updateLogoAnimation(
        window.scrollY, 
        window.innerHeight, 
        window.innerWidth
      ));    
      slideNavigation();
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }


  const trackActiveSection = (document: Document) =>
  {
      const findActiveSection = (entries: IntersectionObserverEntry[]) : string => 
          entries
          .map((entry) => {
              let sectionName = "";
              if (entry.isIntersecting) 
                  sectionName = entry.target.getAttribute("data-section") || 'home';
              else {
                  if (entry.target.getAttribute("data-section") === "about" && entry.boundingClientRect.y > 0) {
                  // leaving about section to going up to home section
                  sectionName = 'home';
                  }
              }            
              return sectionName;
              })
          .filter((sectionName) => sectionName !== "")
          .reduce((acc, sectionName) => {
              return sectionName;
          }, "");
          
  
      const observer = new IntersectionObserver(
          (entries) => dispatch(setActiveSection(findActiveSection(entries) || 'home')),
          {
              threshold: [0.2, 0.5, 0.7], // Multiple thresholds for better detection
              rootMargin: '-10% 0px -10% 0px' // Adjust trigger area
          }
      );
  
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => observer.observe(section));    
  
      return () => {
          observer.disconnect();
      }
  };

  useEffect(() => {

    dispatch(setHasMounted(true));

    dispatch(setNavigationHeightMax(getNavigationRoot()?.offsetHeight || 200));

    const cleanupActiveSectionTracker =  trackActiveSection(document);
    // Set window width after component mounts

    // initial Logo placement
    dispatch(updateLogoAnimation(
      window.scrollY, 
      window.innerHeight, 
      window.innerWidth
    ));    

    return () => {
      cleanupActiveSectionTracker();
    }
  }, []);

  useEffect(() => {
    const cleanupScrollTracker = trackScroll();
    return () => {
      cleanupScrollTracker();
    }
  }, [hasMounted, IsLogoAnimationComplete, lastScrollY, dispatch]);


  const activeSectionKey = activeSection as keyof typeof sections || 'home';

  
  const getActiveLinkClass = (section: SectionConfig) => {
    if( activeSection === section.link.replace('#', '') )
      return ActiveLinkColor;
    if(IsLogoAnimationComplete)
      return InactiveCompleteLinkColor;
    else
      return InactiveTransitionLinkColor;
  }
  

  return (
      <div id="navigation-root" className={`items-center max-w-7xl mx-auto fixed top-0 left-0 right-0 z-50
        px-3 sm:px-8 py-2 sm:py-4 md:py-6 
        overflow-visible ${navigationColor}`}
        style={{
          transition: 'top 0.3s ease-out'
        }}>

        {/* Logo */}
        <div className={`absolute w-fit`}
          style={{
            left: `${logoTransform.left}px`,
            top: `${logoTransform.top}px`,
            transform: `scale(${logoTransform.scale})`
          }}
        >
          
          <div 
            className="flex flex-col items-center justify-center mx-auto font-light"
            style={{
              color: logoTextColor,
              transition: 'color 0.3s ease-out'
            }}
          >
            {/* BEAUTY CELLAR */}
            <div className="relative">
              <span className="relative inline-block">
                <div
                  className={`absolute pointer-events-none z-[-1]                
                    transition-opacity duration-500 ease-in-out`}
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.4) 10%, transparent 70%)",
                    top: '-100px',
                    left: '-100px',
                    width: '250px',
                    height: '250px',
                    opacity: `${gradientOpacity}`
                  }}
                />
                <span className="text-4xl sm:text-5xl">BEAUTY</span>
              </span>
              <span className="text-4xl sm:text-5xl relative">CELLAR</span>
            </div>

            
            {/* BY HOLLYWOOD */}
            <div className="relative">
              <div className="text-sm sm:text-base">BY HOLLYWOOD</div>
            </div>
          </div>

          <div className="text-[#FFD700] text-base sm:text-1xl font-extralight tracking-wide leading-relaxed max-w-md my-2 text-center"
            style={{
              opacity: subHeadlineOpacity,
              transition: 'opacity 0.1s ease-out'
            }}>
            <span className="relative inline-block">
                <div
                  className={`absolute pointer-events-none z-[-1]
                    transition-opacity duration-500 ease-in-out`}
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.4) 10%, transparent 70%)",
                    top: '-50px',
                    left: '-50px',
                    width: '170px',
                    height: '150px',
                    opacity: `${gradientOpacity}`
                  }}
                />
              <span>Elevate Beauty,</span>
            </span>
            <span>Timeless&nbsp;Elegance</span>
          </div>
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
            <button className={`md:hidden ${getActiveLinkClass(sections[activeSectionKey])}`}>
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
