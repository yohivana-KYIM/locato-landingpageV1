import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Download, Home, Building2, BedDouble, Calendar, Maximize2, Minimize2, MapPin, ChevronDown, ChevronUp, X } from "lucide-react";
import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function SearchSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([50000, 300000]);
  const [minBedrooms, setMinBedrooms] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [duration, setDuration] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [minArea, setMinArea] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  
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

  const features = [
    { id: "furnished", label: "Meublé", icon: Home },
    { id: "parking", label: "Parking", icon: Building2 },
    { id: "balcony", label: "Balcon", icon: Maximize2 },
    { id: "garden", label: "Jardin", icon: Minimize2 },
    { id: "ac", label: "Climatisation", icon: BedDouble },
    { id: "elevator", label: "Ascenseur", icon: ChevronUp },
    { id: "security", label: "Sécurité", icon: Building2 }
  ];

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <section id="search" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
              Trouvez le logement parfait
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Utilisez notre moteur de recherche avancé pour filtrer les logements selon vos critères à Douala
          </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quartier */}
              <div className="space-y-2 group">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  Quartier
                </Label>
                <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger id="location" className="h-12 bg-gray-50 border-gray-200 group-hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Choisir un quartier" />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoods.map((neighborhood) => (
                      <SelectItem 
                        key={neighborhood} 
                        value={neighborhood.toLowerCase()}
                        className="flex items-center py-2"
                      >
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {neighborhood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Type de bien */}
              <div className="space-y-2 group">
                <Label htmlFor="property-type" className="text-sm font-medium text-gray-700 flex items-center">
                  <Home className="w-4 h-4 mr-2 text-primary" />
                  Type de bien
                </Label>
                <Select onValueChange={setPropertyType} value={propertyType}>
                  <SelectTrigger id="property-type" className="h-12 bg-gray-50 border-gray-200 group-hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Appartement, Maison, etc." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment" className="flex items-center py-2">
                      <Home className="w-4 h-4 mr-2 text-gray-400" />
                      Appartement
                    </SelectItem>
                    <SelectItem value="house" className="flex items-center py-2">
                      <Home className="w-4 h-4 mr-2 text-gray-400" />
                      Maison
                    </SelectItem>
                    <SelectItem value="villa" className="flex items-center py-2">
                      <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                      Villa
                    </SelectItem>
                    <SelectItem value="studio" className="flex items-center py-2">
                      <Home className="w-4 h-4 mr-2 text-gray-400" />
                      Studio
                    </SelectItem>
                    <SelectItem value="office" className="flex items-center py-2">
                      <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                      Bureau
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Chambres min */}
              <div className="space-y-2 group">
                <Label htmlFor="bedrooms" className="text-sm font-medium text-gray-700 flex items-center">
                  <BedDouble className="w-4 h-4 mr-2 text-primary" />
                  Chambres min.
                </Label>
                <Select onValueChange={setMinBedrooms} value={minBedrooms}>
                  <SelectTrigger id="bedrooms" className="h-12 bg-gray-50 border-gray-200 group-hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Nombre de chambres" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem 
                        key={num} 
                        value={num.toString()}
                        className="flex items-center py-2"
                      >
                        <BedDouble className="w-4 h-4 mr-2 text-gray-400" />
                        {num} {num > 1 ? 'chambres' : 'chambre'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Fourchette de prix */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 bg-gray-50 p-6 rounded-xl">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-gray-700 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-primary" />
                    Fourchette de prix
                  </Label>
                  <Badge variant="secondary" className="bg-white text-gray-700 font-medium">
                    {priceRange[0].toLocaleString()} FCFA - {priceRange[1].toLocaleString()} FCFA
                  </Badge>
                </div>
                <Slider
                  min={0}
                  max={500000}
                  step={10000}
                  defaultValue={[50000, 300000]}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0 FCFA</span>
                  <span>500 000 FCFA</span>
                </div>
              </div>
            </div>
            
            {/* Filtres avancés */}
            <AnimatePresence>
            {showAdvancedFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
                {/* Durée de location */}
                    <div className="space-y-2 group">
                      <Label htmlFor="duration" className="text-sm font-medium text-gray-700 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        Durée de location
                      </Label>
                  <Select onValueChange={setDuration} value={duration}>
                        <SelectTrigger id="duration" className="h-12 bg-gray-50 border-gray-200 group-hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Durée minimale" />
                    </SelectTrigger>
                    <SelectContent>
                          {[1, 3, 6, 12].map((months) => (
                            <SelectItem 
                              key={months} 
                              value={months.toString()}
                              className="flex items-center py-2"
                            >
                              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                              {months} {months > 1 ? 'mois' : 'mois'}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Surface minimale */}
                    <div className="space-y-2 group">
                      <Label htmlFor="min-area" className="text-sm font-medium text-gray-700 flex items-center">
                        <Maximize2 className="w-4 h-4 mr-2 text-primary" />
                        Surface minimale (m²)
                      </Label>
                      <Input 
                        id="min-area" 
                        type="number" 
                        placeholder="Ex: 50" 
                        min="0"
                        value={minArea}
                        onChange={(e) => setMinArea(e.target.value)}
                        className="h-12 bg-gray-50 border-gray-200 group-hover:border-primary/50 transition-colors"
                      />
                </div>
                
                {/* Date de disponibilité */}
                    <div className="space-y-2 group">
                      <Label htmlFor="availability-date" className="text-sm font-medium text-gray-700 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        Date de disponibilité
                      </Label>
                      <Input 
                        id="availability-date" 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]}
                        value={availabilityDate}
                        onChange={(e) => setAvailabilityDate(e.target.value)}
                        className="h-12 bg-gray-50 border-gray-200 group-hover:border-primary/50 transition-colors"
                      />
                </div>
                
                {/* Caractéristiques */}
                    <div className="lg:col-span-3 space-y-4">
                      <Label className="text-sm font-medium text-gray-700">Caractéristiques</Label>
                      <div className="flex flex-wrap gap-3">
                        {features.map((feature) => {
                          const Icon = feature.icon;
                          const isSelected = selectedFeatures.includes(feature.id);
                          return (
                            <button
                              key={feature.id}
                              onClick={() => toggleFeature(feature.id)}
                              className={cn(
                                "flex items-center px-4 py-2 rounded-full border transition-all duration-200",
                                isSelected 
                                  ? "bg-primary/10 border-primary text-primary" 
                                  : "bg-gray-50 border-gray-200 text-gray-600 hover:border-primary/50"
                              )}
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              <span className="text-sm font-medium">{feature.label}</span>
                              {isSelected && (
                                <X className="w-4 h-4 ml-2 text-primary" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
            )}
            </AnimatePresence>
            
            {/* Boutons d'action */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-primary hover:bg-primary/5 group"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
                {showAdvancedFilters ? 'Masquer les filtres' : 'Filtres avancés'}
                {showAdvancedFilters ? (
                  <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200" />
                )}
              </Button>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
              >
                <Search className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Rechercher
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
