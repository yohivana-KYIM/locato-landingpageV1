import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/f57da0a1-0095-4f23-b813-cfc3e39f8403.png" 
            alt="Locato Logo" 
            className="h-10 w-auto mr-2"
          />
          <span className={cn(
            "font-bold text-2xl",
            isScrolled ? "text-primary" : "text-white"
          )}>Locato</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className={cn(
            "font-medium transition-colors",
            isScrolled ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}>Accueil</a>
          <a href="#search" className={cn(
            "font-medium transition-colors",
            isScrolled ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}>Rechercher</a>
          <a href="#tenant" className={cn(
            "font-medium transition-colors",
            isScrolled ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}>Locataires</a>
          <a href="#landlord" className={cn(
            "font-medium transition-colors",
            isScrolled ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
          )}>Propriétaires</a>
          <Button variant="outline" size="sm" className="ml-2" asChild>
            <a href="/login"><User className="h-4 w-4 mr-2" />Connexion</a>
          </Button>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary-light">
            <Home className="h-4 w-4 mr-2" />S'inscrire
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-gray-800" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-gray-800" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#" className="font-medium text-gray-800 hover:text-primary">Accueil</a>
            <a href="#search" className="font-medium text-gray-800 hover:text-primary">Rechercher</a>
            <a href="#tenant" className="font-medium text-gray-800 hover:text-primary">Locataires</a>
            <a href="#landlord" className="font-medium text-gray-800 hover:text-primary">Propriétaires</a>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a href="/login"><User className="h-4 w-4 mr-2" />Connexion</a>
              </Button>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary-light flex-1">
                <Home className="h-4 w-4 mr-2" />S'inscrire
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
