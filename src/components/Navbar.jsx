export default function Navbar() {
  return <div>Navbar</div>;
}
import React, { useState } from 'react';
// Import the Menu (hamburger) and X (close) icons from the lucide-react library
import { Menu, X, ArrowRight } from 'lucide-react';

/**
 * Navbar - A fully responsive navigation bar for the MediSwitch platform.
 * 
 * Designed using color #0A6640 (deep green) and customized fonts:
 * - font-fraunces for premium serif branding heading
 * - font-dm-sans for highly legible clean body text
 */
const Navbar = () => {
  // useState hook is used here to manage the open/close state of our mobile menu.
  // When 'isMobileMenuOpen' is true, the mobile side drawer or list will show.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // A helper function to easily toggle the mobile menu state when clicked.
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative w-full bg-[#0A6640] text-white shadow-md z-50 transition-all duration-300">
      {/* 
        Main container restricting height to h-16 (64px) and maintaining a clean horizontal padding of px-16.
        We adjust horizontal padding on smaller screens (px-6) so it fits beautifully on mobile.
      */}
      <div className="max-w-7xl mx-auto h-16 px-6 md:px-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo and Title */}
        <a 
          href="#" 
          className="flex items-center gap-3 group transition-transform duration-200 active:scale-95"
          id="nav-logo"
        >
          {/* 
            A small green square icon.
            We use a vibrant emerald/mint green (bg-[#10B981]) to create a sharp, gorgeous contrast
            against the deep green body background (#0A6640). 
          */}
          <div className="w-8 h-8 bg-emerald-400 rounded-md flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform duration-300">
            {/* Minimalist health/switch cross graphic inside the square icon */}
            <div className="w-3.5 h-1 bg-[#0A6640] rounded-full absolute"></div>
            <div className="w-1 h-3.5 bg-[#0A6640] rounded-full absolute"></div>
          </div>
          
          {/* 
            The name "MediSwitch" in white, bold, using the font-fraunces class loaded via Google Fonts.
            Tracking-tight class is used to make display typography feel highly polished and professional.
          */}
          <span className="font-fraunces font-bold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors duration-200">
            MediSwitch
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        {/* 
          - 'hidden' means concealed by default on smallest screens.
          - 'md:flex' ensures that on medium-sized screens and up, it uses flexbox display.
          - Tracking-wide and font-medium enhance search and layout aesthetics.
        */}
        <div className="hidden md:flex items-center gap-8 font-dm-sans text-sm font-medium">
          <a href="#" className="text-white/90 hover:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-300 hover:after:w-full after:transition-all after:duration-200">
            How it works
          </a>
          <a href="#" className="text-white/90 hover:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-300 hover:after:w-full after:transition-all after:duration-200">
            Drug search
          </a>
          <a href="#" className="text-white/90 hover:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-300 hover:after:w-full after:transition-all after:duration-200">
            Find pharmacy
          </a>
          <a href="#" className="text-white/90 hover:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-300 hover:after:w-full after:transition-all after:duration-200">
            About
          </a>
        </div>

        {/* Right Side: Action Actions */}
        <div className="hidden md:flex items-center gap-6 font-dm-sans text-sm font-medium">
          {/* 
            Standard login link styled simply.
            Opacities are used to differentiate visual importance between 'Login' and 'Sign Up' CTA buttons.
          */}
          <a 
            href="#" 
            className="text-white hover:text-emerald-200 transition-colors duration-200"
            id="nav-login-desktop"
          >
            Login
          </a>
          
          {/* 
            Premium Sign Up button.
            Has a white background and #0A6640 green text with slightly rounded corners (rounded-lg).
            We use active:scale-95 to give native-like button feedback on press events.
          */}
          <a 
            href="#" 
            className="px-5 py-2.5 bg-white text-[#0A6640] font-semibold rounded-lg hover:bg-emerald-50 active:scale-95 transition-all duration-200 shadow-md"
            id="nav-signup-desktop"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile: Hamburger/X Toggle Button */}
        {/* 
          Visible only on screens below md breakpoint.
          Uses simple responsive utility classes to capture touch inputs comfortably.
        */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 -mr-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all text-white focus:outline-none"
            aria-label="Toggle main menu"
            id="nav-mobile-toggle"
          >
            {/* 
              Conditional rendering based on the react state.
              Shows the X icon if the dropdown list is open, else shows the standard Menu icon.
            */}
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 animate-in spin-in duration-200" />
            ) : (
              <Menu className="w-6 h-6 animate-in fade-in duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* 
        Mobile Dropdown Drawer.
        Uses absolute positioning directly below the header boundary.
        Designed with a glass-morphic touch matching the parent emerald-style theme.
      */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0A6640] border-t border-emerald-800/40 shadow-2xl z-40 md:hidden animate-in slide-in-from-top-4 duration-300 font-dm-sans">
          <div className="px-6 py-6 flex flex-col gap-5 bg-[#095A38]">
            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4">
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white font-medium py-1 border-b border-emerald-800/30"
              >
                How it works
              </a>
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white font-medium py-1 border-b border-emerald-800/30"
              >
                Drug search
              </a>
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white font-medium py-1 border-b border-emerald-800/30"
              >
                Find pharmacy
              </a>
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/90 hover:text-white font-medium py-1 border-b border-emerald-800/30"
              >
                About
              </a>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-emerald-800/55 flex flex-col gap-3">
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 text-center text-white font-medium hover:text-emerald-200 transition-colors"
                id="nav-login-mobile"
              >
                Login
              </a>
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-white text-[#0A6640] text-center font-bold rounded-lg hover:bg-emerald-50 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                id="nav-signup-mobile"
              >
                Sign Up
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Expose the Navbar component as the default export.
export default Navbar;
