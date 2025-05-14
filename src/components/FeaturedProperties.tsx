import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Calendar } from "lucide-react";
import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { PropertyDetailModal } from "./PropertyDetailModal";
import { ReservationModal } from "./ReservationModal";

// Données des propriétés pour la région du Littoral (Douala)
const properties = [
  {
    id: 1,
    title: "Appartement lumineux",
    location: "Akwa, Douala",
    price: 150000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    durationMonths: 6,
    available: true,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070"
  },
  {
    id: 2,
    title: "Villa moderne avec jardin",
    location: "Bonapriso, Douala",
    price: 350000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    durationMonths: 12,
    available: true,
    image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2070"
  },
  {
    id: 3,
    title: "Studio centre-ville",
    location: "Bonanjo, Douala",
    price: 75000,
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    durationMonths: 3,
    available: false,
    image: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=2070"
  },
  {
    id: 4,
    title: "Maison familiale",
    location: "Makepe, Douala",
    price: 250000,
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    durationMonths: 12,
    available: true,
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070"
  },
  {
    id: 5,
    title: "Appartement avec vue",
    location: "Deido, Douala",
    price: 180000,
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    durationMonths: 6,
    available: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070"
  },
  {
    id: 6,
    title: "Studio moderne",
    location: "Bali, Douala",
    price: 85000,
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    durationMonths: 3,
    available: true,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070"
  }
];

export function FeaturedProperties() {
  // const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState(3);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    // Simuler le chargement
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 1500);
    
    // return () => clearTimeout(timer);
  }, []);

  const handleViewMore = () => {
    setDisplayedProperties(properties.length);
  };

  const handlePropertyDetails = (property: any) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  const handleReservation = (property: any) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(false); // Fermer le modal détail s'il est ouvert
    setIsReservationModalOpen(true);
  };

  // Formater le type de propriété
  const getPropertyType = (type: string) => {
    switch (type) {
      case 'apartment': return 'Appartement';
      case 'villa': return 'Villa';
      case 'studio': return 'Studio';
      default: return 'Maison';
    }
  };

  return (
    <section id="properties" className="py-20">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn(
          "transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Logements recommandés
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Découvrez notre sélection de biens immobiliers disponibles à la location à Douala
          </p>
          
          {/* {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <CardHeader className="bg-gray-100 h-8"></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardContent>
                  <CardFooter className="bg-gray-100 h-12"></CardFooter>
                </Card>
              ))}
            </div>
          ) : */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, displayedProperties).map((property, index) => (
              <Card 
                key={property.id} 
                className={cn(
                  "overflow-hidden group transition duration-500 hover:shadow-xl transform hover:-translate-y-1",
                  property.available ? "" : "opacity-75",
                  inView ? 'animate-fade-in' : ''
                )}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary">
                    {getPropertyType(property.type)}
                  </Badge>
                  
                  {!property.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="outline" className="border-2 px-4 py-2 text-lg font-bold text-white border-white">
                        Non disponible
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-xl">{property.price.toLocaleString()} FCFA<span className="text-sm font-normal">/mois</span></p>
                    {property.durationMonths && (
                      <span className="text-xs text-white/80">Durée min: {property.durationMonths} mois</span>
                    )}
                  </div>
                </div>
                <CardHeader className="py-4">
                  <h3 className="text-xl font-bold">{property.title}</h3>
                  <p className="text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {property.location}
                  </p>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{property.bedrooms} {property.bedrooms > 1 ? 'chambres' : 'chambre'}</span>
                    <span>•</span>
                    <span>{property.bathrooms} {property.bathrooms > 1 ? 'SdB' : 'SdB'}</span>
                    <span>•</span>
                    <span>{property.area} m²</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => property.available && handleReservation(property)}
                    disabled={!property.available}
                    className={!property.available ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Réserver une visite
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-primary hover:bg-primary-light"
                    onClick={() => handlePropertyDetails(property)}
                  >
                    Détails
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {displayedProperties < properties.length && (
            <div className="mt-12 text-center">
              <Button
                size="lg"
                variant="outline"
                className="mx-auto"
                onClick={handleViewMore}
              >
                <Home className="mr-2 h-5 w-5" />
                Voir plus de logements
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedProperty && (
        <>
          <PropertyDetailModal
            isOpen={isDetailModalOpen}
            onRequestClose={() => setIsDetailModalOpen(false)}
            property={selectedProperty}
            onReserveClick={handleReservation}
          />
          
          <ReservationModal
            isOpen={isReservationModalOpen}
            onRequestClose={() => setIsReservationModalOpen(false)}
            property={selectedProperty}
          />
        </>
      )}
    </section>
  );
}
