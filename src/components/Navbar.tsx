import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, User, Menu, X, Search, Users, Building2, Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("FR");
  
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

  // Fermer le menu mobile lors du changement de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsMobileMenuOpen(false); // Fermer le menu mobile lors du changement de langue
  };

  // Fonction pour gérer le clic sur les liens
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/f57da0a1-0095-4f23-b813-cfc3e39f8403.png" 
            alt="Locato Logo" 
            className="h-10 w-auto mr-2 transition-transform hover:scale-105"
          />
          <span className={cn(
            "font-bold text-2xl transition-colors duration-300",
            isScrolled ? "text-primary" : "text-white"
          )}>Locato</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="#" icon={<Home className="h-4 w-4" />} isScrolled={isScrolled}>
            Accueil
          </NavLink>
          <NavLink href="#search" icon={<Search className="h-4 w-4" />} isScrolled={isScrolled}>
            Rechercher
          </NavLink>
          <NavLink href="#tenant" icon={<Users className="h-4 w-4" />} isScrolled={isScrolled}>
            Locataires
          </NavLink>
          <NavLink href="#landlord" icon={<Building2 className="h-4 w-4" />} isScrolled={isScrolled}>
            Propriétaires
          </NavLink>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200",
                  isScrolled 
                    ? "text-gray-700 hover:bg-gray-100 hover:text-primary" 
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
              >
                <Globe className="h-4 w-4" />
                {language}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("FR")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-sm">🇫🇷</span>
                Français
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("EN")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-sm">🇬🇧</span>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2 ml-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "rounded-full transition-all duration-200",
                isScrolled 
                  ? "border-yellow-400/20 text-yellow-600 hover:bg-yellow-400/10 hover:text-yellow-600 hover:border-yellow-400" 
                  : "border-yellow-300/20 text-yellow-300 hover:bg-yellow-300/10"
              )}
              asChild
            >
              <a href="/login" className="flex items-center gap-2" onClick={handleLinkClick}>
                <User className="h-4 w-4" />
                Connexion
              </a>
          </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="rounded-full bg-primary hover:bg-primary/90 transition-all duration-200"
              asChild
            >
              <a href="/register" className="flex items-center gap-2" onClick={handleLinkClick}>
                <Home className="h-4 w-4" />
                S'inscrire
              </a>
          </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={cn(
            "md:hidden p-2 rounded-full transition-colors duration-200",
            isScrolled 
              ? "hover:bg-gray-100" 
              : "hover:bg-white/10"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={cn(
              "h-6 w-6 transition-transform duration-200",
              isScrolled ? "text-gray-800" : "text-white"
            )} />
          ) : (
            <Menu className={cn(
              "h-6 w-6 transition-transform duration-200",
              isScrolled ? "text-gray-800" : "text-white"
            )} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out",
          isMobileMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-1">
            <MobileNavLink href="#" icon={<Home className="h-5 w-5" />} onClick={handleLinkClick}>
              Accueil
            </MobileNavLink>
            <MobileNavLink href="#search" icon={<Search className="h-5 w-5" />} onClick={handleLinkClick}>
              Rechercher
            </MobileNavLink>
            <MobileNavLink href="#tenant" icon={<Users className="h-5 w-5" />} onClick={handleLinkClick}>
              Locataires
            </MobileNavLink>
            <MobileNavLink href="#landlord" icon={<Building2 className="h-5 w-5" />} onClick={handleLinkClick}>
              Propriétaires
            </MobileNavLink>

            {/* Mobile Language Selector */}
            <div className="flex items-center justify-between py-3 px-4 mt-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Langue</span>
              </div>
              <select 
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="font-medium text-gray-700 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
              >
                <option value="FR">🇫🇷 Français</option>
                <option value="EN">🇬🇧 English</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full justify-center rounded-full border-yellow-400/20 text-yellow-600 hover:bg-yellow-400/10 hover:text-yellow-600 hover:border-yellow-400 transition-all duration-200"
                asChild
              >
                <a href="/login" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <User className="h-5 w-5" />
                  Connexion
                </a>
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="w-full justify-center rounded-full bg-primary hover:bg-primary/90 transition-all duration-200"
                asChild
              >
                <a href="/register" className="flex items-center gap-2" onClick={handleLinkClick}>
                  <Home className="h-5 w-5" />
                  S'inscrire
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

// Composant pour les liens de navigation desktop
const NavLink = ({ 
  href, 
  icon, 
  children, 
  isScrolled 
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  isScrolled: boolean;
}) => (
  <a 
    href={href} 
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
      isScrolled 
        ? "text-gray-700 hover:bg-gray-100 hover:text-primary" 
        : "text-white/90 hover:bg-white/10 hover:text-white"
    )}
  >
    {icon}
    <span className="font-medium">{children}</span>
  </a>
);

// Composant pour les liens de navigation mobile
const MobileNavLink = ({ 
  href, 
  icon, 
  children,
  onClick
}: { 
  href: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a 
    href={href} 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
  >
    {icon}
    <span className="font-medium">{children}</span>
  </a>
);
