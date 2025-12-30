import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50 flex items-center justify-center px-4 sm:px-8 lg:px-16 py-4 lg:py-6 text-white text-xs sm:text-sm tracking-wider">
        <div className="hidden md:flex items-center w-full max-w-7xl justify-between">
          <div className="flex text-white gap-8 lg:gap-12 flex-1">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-300 transition">About</a>
            <a href="#" className="hover:text-gray-300 transition">Contact</a>
          </div>
          <div className="text-base sm:text-lg lg:text-xl tracking-[0.3em] font-light px-8">METEORA</div>
          <div className="flex gap-8 lg:gap-12 flex-1 justify-end">
            <a href="#" className="hover:text-gray-300 transition">Galaxies</a>
            <a href="#" className="hover:text-gray-300 transition">Solar System</a>
            <a href="#" className="hover:text-gray-300 transition">Earth</a>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
          <button 
            className="text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <div className="text-base sm:text-lg tracking-[0.3em] font-light">METEORA</div>
          <div className="w-6"></div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0f1229]/95 z-40 md:hidden flex flex-col items-center justify-center gap-8 text-white text-lg">
          <a href="#" className="hover:text-gray-300 transition" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#" className="hover:text-gray-300 transition" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#" className="hover:text-gray-300 transition" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#" className="hover:text-gray-300 transition" onClick={() => setMobileMenuOpen(false)}>Galaxies</a>
          <a href="#" className="hover:text-gray-300 transition" onClick={() => setMobileMenuOpen(false)}>Solar System</a>
          <a href="#" className="hover:text-gray-300 transition" onClick={() => setMobileMenuOpen(false)}>Earth</a>
        </div>
      )}
    </>
  );
}
