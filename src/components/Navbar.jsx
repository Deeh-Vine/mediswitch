import { useState } from 'react';
// useNavigate gives us a programmatic way to change the URL route without a full page reload.
import { useNavigate } from 'react-router-dom';
import { Pill, Menu, X } from 'lucide-react';

export default function Navbar() {
  // navigate('/path') pushes a new entry onto the browser history stack and renders the matching page.
  const navigate = useNavigate();

  // Controls the visibility of the mobile slide-down menu.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shared handler to navigate and close the mobile menu in one step.
  const handleNav = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-primary-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── LOGO ──────────────────────────────────────────────────────────
              Clicking the logo always routes back to the landing page ('/').   */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNav('/')}
          >
            <div className="bg-white/10 group-hover:bg-white/20 p-1.5 rounded-lg transition-colors">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-white tracking-tight">
              Medi<span className="text-white/70">Switch</span>
            </span>
          </div>

          {/* ── DESKTOP NAVIGATION (hidden on mobile) ─────────────────────── */}
          <div className="hidden md:flex items-center gap-7">
            {/* "How it works" and "About" scroll back to the landing page sections. */}
            <button
              onClick={() => handleNav('/')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              How it works
            </button>

            {/* Drug search leads to the main search/home page. */}
            <button
              onClick={() => handleNav('/home')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Drug search
            </button>

            {/* Find pharmacy routes to /home first so users search before seeing the map. */}
            <button
              onClick={() => handleNav('/home')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              Find pharmacy
            </button>

            <button
              onClick={() => handleNav('/')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-white/20" />

            {/* Auth links — wired to the Landing page modal state via props if needed later. */}
            <button className="text-sm font-semibold text-white/80 hover:text-white transition-colors cursor-pointer">
              Log in
            </button>
            <button className="bg-white text-primary-dark text-sm font-bold px-5 py-2 rounded-xl hover:bg-white/90 transition-all shadow-sm active:scale-95 cursor-pointer">
              Sign up
            </button>
          </div>

          {/* ── MOBILE HAMBURGER BUTTON ───────────────────────────────────── */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {/* Toggle between hamburger and close icon based on menu state. */}
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN MENU ──────────────────────────────────────────────
          Only rendered when isMobileMenuOpen is true.
          Uses absolute positioning so it overlays the page content below.      */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-primary-dark border-t border-white/10 px-4 pt-3 pb-5 space-y-1 shadow-xl">

          <button
            onClick={() => handleNav('/')}
            className="block w-full text-left px-3 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            How it works
          </button>

          <button
            onClick={() => handleNav('/home')}
            className="block w-full text-left px-3 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Drug search
          </button>

          <button
            onClick={() => handleNav('/home')}
            className="block w-full text-left px-3 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            Find pharmacy
          </button>

          <button
            onClick={() => handleNav('#about')}
            className="block w-full text-left px-3 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            About
          </button>

          <div className="border-t border-white/10 pt-3 mt-2 flex flex-col gap-2">
            <button className="w-full text-left px-3 py-2.5 text-base font-bold text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
              Log in
            </button>
            <button className="w-full bg-white text-primary-dark text-base font-bold py-2.5 rounded-xl hover:bg-white/90 transition-all cursor-pointer">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
