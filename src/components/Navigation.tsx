import React from "react";

interface NavigationProps {
  navLinkClass: string;
}

const Navigation = ({ navLinkClass }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-2 sm:py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - always gold */}
        <div className="text-gold-600 text-xl sm:text-2xl font-light mr-10">
          BEAUTY CELLAR BY HOLLYWOOD
        </div>


        {/* Navigation Links - class changes dynamically */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#"
            className={`nav-link ${navLinkClass} text-lg hover:opacity-80 transition-colors`}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link ${navLinkClass} text-lg hover:opacity-80 transition-colors`}
          >
            About
          </a>
          <a
            href="#"
            className={`nav-link ${navLinkClass} text-lg hover:opacity-80 transition-colors`}
          >
            Services
          </a>
          <a
            href="#"
            className={`nav-link ${navLinkClass} text-lg hover:opacity-80 transition-colors`}
          >
            Gallery
          </a>
          <a
            href="#"
            className={`nav-link ${navLinkClass} text-lg hover:opacity-80 transition-colors`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className={`md:hidden ${navLinkClass}`}>
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
    </nav>
  );
};

export default Navigation;
