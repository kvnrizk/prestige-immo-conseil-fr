
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Si on n'est pas sur la page d'accueil, naviguer d'abord vers l'accueil
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-foreground hover:text-muted-foreground transition-colors">
              Charbel's Agency
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-foreground hover:text-muted-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('a-propos')}
                className="text-foreground hover:text-muted-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('biens')}
                className="text-foreground hover:text-muted-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Biens immobiliers
              </button>
              <Link
                to="/properties"
                className="text-foreground hover:text-muted-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Tous nos biens
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-muted-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-muted-foreground p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              <button
                onClick={() => scrollToSection('accueil')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('a-propos')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('biens')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Biens immobiliers
              </button>
              <Link
                to="/properties"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tous nos biens
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
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
