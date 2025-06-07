
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Immobilier Pro</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('a-propos')}
                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('biens')}
                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Biens immobiliers
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-amber-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <button
                onClick={() => scrollToSection('accueil')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('a-propos')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('biens')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                Biens immobiliers
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
