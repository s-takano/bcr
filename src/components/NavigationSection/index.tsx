"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  setHasMounted,
  setActiveSection,
  slideBrandSignature,
  updateNavigationBoundingRect,
  getActiveLinkClass,
  setSidebarMenuOpen,
  toggleSidebarMenu,
  setScreenDimensions
} from './navigationSlice';

import { RootState, AppDispatch } from "@/app/store";

import {
  getSection,
  getAllSections,
  TextColor,
  getNavigationColor,
} from "./LogoTransformConfigs";

import { HAMBURGER_ICON } from "@/components/Icons/constants";
import SidebarMenu from "@/components/SidebarMenu";

const Navigation = () => {

  const dispatch = useDispatch<AppDispatch>();

  const {
    activeSection,
    hasMounted,
    lastScrollY,
    brandSignatureTransform,
    navigationTransform,
    sidebarMenuOpen
  } = useSelector((state: RootState) => state.navigation);

  const getNavigationRoot = () => {
    return document.getElementById('navigation-root');
  }

  const getScrollDisplacement = () => {
    return window.scrollY - lastScrollY;
  }

  const slideNavigation = () => {

    // Get the section that has activeSection as data-section
    const firstSectionElement = document.querySelector(`[data-section="${"services"}"]`);
    if (!firstSectionElement) return;
    const firstSectionHeight = firstSectionElement.getBoundingClientRect().top;

    // get root element
    const rootElement: HTMLElement = document.getElementById('navigation-root') as HTMLElement;
    if (!rootElement) return;

    const scrollDisplacement = getScrollDisplacement();

    dispatch(updateNavigationBoundingRect(firstSectionHeight, scrollDisplacement));
  }

  const getBrandSignatureHeight = () => {
    return document.getElementById('branding-signature')?.offsetHeight || 200;
  }

  const trackScroll = () => {

    const handleScroll = () => {
      dispatch(slideBrandSignature(window.scrollY));
      slideNavigation();
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }

  const trackResize = () => {
    const handleResize = () => {

      dispatch(setScreenDimensions({
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        navigationHeightMax: getNavigationRoot()?.offsetHeight || 200,
        brandSignatureHeight: getBrandSignatureHeight()
      }));

      dispatch(slideBrandSignature(window.scrollY));
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }


  const trackActiveSection = (document: Document) => {
    const findActiveSection = (entries: IntersectionObserverEntry[]): string =>
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

    dispatch(setScreenDimensions({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      navigationHeightMax: getNavigationRoot()?.offsetHeight || 200,
      brandSignatureHeight: getBrandSignatureHeight()
    }));


    const cleanupActiveSectionTracker = trackActiveSection(document);
    // Set window width after component mounts

    // initial Logo placement
    dispatch(slideBrandSignature(window.scrollY));

    // initialize navigation position
    slideNavigation();

    return () => {
      cleanupActiveSectionTracker();
    }
  }, []);

  useEffect(() => {
    const cleanupScrollTracker = trackScroll();
    const cleanupResizeTracker = trackResize();
    return () => {
      cleanupScrollTracker();
      cleanupResizeTracker();
    }
  }, [hasMounted, lastScrollY, dispatch]);


  const formatLogoTextColor = (textColor: TextColor) => {
    return `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`;
  }

  return (
    <>
      <div id="navigation-root"
        className={`fixed top-0 z-50 ${hasMounted ? 'opacity-100' : 'opacity-0'}
      w-full left-0 right-0`}
        style={{
          backgroundColor: `${getNavigationColor(navigationTransform.isActive)}`,
          transition: 'all 0.3s ease-out',
          top: `${navigationTransform.top}px`
        }} >
        <div
          className={`items-center max-w-7xl mx-auto  
          top-0 left-0 right-0 z-50
          px-3 sm:px-8 
          py-3 sm:py-3 md:py-2 lg:py-3
          ${hasMounted ? 'opacity-100' : 'opacity-0'}
          overflow-visible `}
          style={{
            transition: 'all 0.3s ease-out'
          }}>

          {/* Branding Signature */}
          <div
            className={`absolute w-fit`}
            style={{
              left: `${brandSignatureTransform.left}px`,
              top: `${brandSignatureTransform.top}px`,
              transform: `scale(${brandSignatureTransform.scale})`
            }}
          >

            <div id="branding-signature"
              className="flex flex-col items-center justify-center mx-auto font-light"
              style={{
                color: formatLogoTextColor(brandSignatureTransform.textColor),
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
                        "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.3) 10%, transparent 50%)",
                      top: '-100px',
                      left: '-100px',
                      width: '250px',
                      height: '250px',
                      opacity: `${brandSignatureTransform.dropShadowOpacity}`
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
                opacity: brandSignatureTransform.subHeadlineOpacity,
                transition: 'opacity 0.1s ease-out'
              }}>
              <span className="relative inline-block">
                <div
                  className={`absolute pointer-events-none z-[-1]
                    transition-opacity duration-500 ease-in-out`}
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.3) 10%, transparent 50%)",
                    top: '-50px',
                    left: '-50px',
                    width: '170px',
                    height: '150px',
                    opacity: `${brandSignatureTransform.dropShadowOpacity}`
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
                {Object.values(getAllSections()).map((section) => (
                  <li key={section.link}>
                    <a
                      href={section.link}
                      className={`nav-link text-base sm:text-lg hover:opacity-80 transition-colors 
                      duration-300 hover:scale-110 transition-all
                      ${dispatch(getActiveLinkClass(section))}`}
                    >
                      {section.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="text-gold-600 bg-black/20 border border-gold-600 
                      px-2 sm:px-6 py-0 sm:py-2 
                      text-base md:text-lg 
                      whitespace-nowrap
                      hover:bg-gold-600/90 hover:scale-110
                      focus:outline-none hover:ring-1 hover:ring-gold-600 hover:ring-offset-1 hover:ring-offset-transparent
                      transition-all duration-300 font-semibold">
                Book Now
              </button>

              {/* Mobile Menu Button */}
              <button className={`md:hidden ${dispatch(getActiveLinkClass(getSection(activeSection)))}`}
                onClick={() => dispatch(toggleSidebarMenu())}
              >
                {HAMBURGER_ICON}
              </button>
            </div>
          </div>
        </div>
      </div>
      <SidebarMenu menuOpen={sidebarMenuOpen} setMenuOpen={setSidebarMenuOpen} />
    </>
  );
};


export default Navigation;
