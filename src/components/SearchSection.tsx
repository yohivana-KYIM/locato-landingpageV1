import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Download } from "lucide-react";
import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

export function SearchSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([50000, 300000]);
  const [minBedrooms, setMinBedrooms] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [duration, setDuration] = useState("");
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Quartiers de Douala
  const neighborhoods = [
    "Akwa", "Bonanjo", "Bonapriso", "Bonamoussadi", 
    "Makepe", "Deido", "Bali", "Bepanda", "Logpom", 
    "Ndokotti", "New Bell", "Bonaberi"
  ];

  return (
    <section id="search" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn(
          "transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Trouvez le logement parfait</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Utilisez notre moteur de recherche avancé pour filtrer les logements selon vos critères à Douala
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Quartier */}
              <div className="space-y-2">
                <Label htmlFor="location">Quartier</Label>
                <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Choisir un quartier" />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoods.map((neighborhood) => (
                      <SelectItem key={neighborhood} value={neighborhood.toLowerCase()}>
                        {neighborhood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Type de bien */}
              <div className="space-y-2">
                <Label htmlFor="property-type">Type de bien</Label>
                <Select onValueChange={setPropertyType} value={propertyType}>
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Appartement, Maison, etc." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="office">Bureau</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Chambres min */}
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Chambres min.</Label>
                <Select onValueChange={setMinBedrooms} value={minBedrooms}>
                  <SelectTrigger id="bedrooms">
                    <SelectValue placeholder="Nombre de chambres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 chambre</SelectItem>
                    <SelectItem value="2">2 chambres</SelectItem>
                    <SelectItem value="3">3 chambres</SelectItem>
                    <SelectItem value="4">4 chambres</SelectItem>
                    <SelectItem value="5">5+ chambres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Fourchette de prix */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Fourchette de prix</Label>
                  <span className="text-sm text-gray-500">
                    {priceRange[0].toLocaleString()} FCFA - {priceRange[1].toLocaleString()} FCFA
                  </span>
                </div>
                <Slider
                  min={0}
                  max={500000}
                  step={10000}
                  defaultValue={[50000, 300000]}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>
            </div>
            
            {/* Filtres avancés */}
            {showAdvancedFilters && (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200 ${inView ? 'animate-fade-in' : ''}`}>
                {/* Durée de location */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée de location</Label>
                  <Select onValueChange={setDuration} value={duration}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Durée minimale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 mois</SelectItem>
                      <SelectItem value="3">3 mois</SelectItem>
                      <SelectItem value="6">6 mois</SelectItem>
                      <SelectItem value="12">12 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Surface minimale */}
                <div className="space-y-2">
                  <Label htmlFor="min-area">Surface minimale (m²)</Label>
                  <Input id="min-area" type="number" placeholder="Ex: 50" min="0" />
                </div>
                
                {/* Date de disponibilité */}
                <div className="space-y-2">
                  <Label htmlFor="availability-date">Date de disponibilité</Label>
                  <Input id="availability-date" type="date" min={new Date().toISOString().split('T')[0]} />
                </div>
                
                {/* Caractéristiques */}
                <div className="lg:col-span-3 space-y-2">
                  <Label>Caractéristiques</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Meublé", "Parking", "Balcon", "Jardin", "Climatisation", "Ascenseur", "Sécurité"].map((feature) => (
                      <div key={feature} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`feature-${feature}`} 
                          className="rounded text-primary focus:ring-primary mr-1"
                        />
                        <label htmlFor={`feature-${feature}`} className="text-sm">{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Bouton de filtres avancés et Rechercher */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-gray-600"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="mr-2 h-5 w-5" />
                {showAdvancedFilters ? 'Masquer les filtres' : 'Filtres avancés'}
              </Button>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-light w-full sm:w-auto"
              >
                <Search className="mr-2 h-5 w-5" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
