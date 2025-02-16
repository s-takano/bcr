import { useState } from 'react';
import { HAMBURGER_ICON } from '../Icons/constants';

interface SidebarMenuParams{
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}
function SidebarMenu({ menuOpen, setMenuOpen }: SidebarMenuParams) {
  return (
    <>
      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full bg-black text-white font-sans transform 
                       ${menuOpen ? "translate-x-0" : "translate-x-full"} 
                       transition-transform duration-300 ease-in-out 
                       w-full sm:w-80 md:w-96 z-40`}>
        {/* Sidebar Header: Logo and Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <span className="text-lg font-bold">BEAUTY CELLAR BY HOLLYWOOD</span>
          <button 
            className="text-white text-2xl focus:outline-none" 
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        {/* Menu Items */}
        <nav className="flex flex-col p-4 space-y-2">
          <a 
            href="#" 
            className="block py-2 px-4 rounded transition-colors 
                       hover:bg-gray-800 hover:text-gray-300 
                       text-yellow-500"
          >
            Home
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 rounded transition-colors hover:bg-gray-800 hover:text-gray-300"
          >
            Hair
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 rounded transition-colors hover:bg-gray-800 hover:text-gray-300"
          >
            Aesthetics
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 rounded transition-colors hover:bg-gray-800 hover:text-gray-300"
          >
            Nail
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 rounded transition-colors hover:bg-gray-800 hover:text-gray-300"
          >
            Kimono
          </a>
          <a 
            href="#" 
            className="block py-2 px-4 rounded transition-colors hover:bg-gray-800 hover:text-gray-300"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}

export default SidebarMenu;
