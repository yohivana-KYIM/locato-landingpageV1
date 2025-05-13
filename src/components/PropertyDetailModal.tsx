
import { useState } from "react";
import Modal from "react-modal";
import { X, MapPin, Home, BedDouble, Bath, Ruler, Calendar, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Assurez-vous que Modal est accessible pour les lecteurs d'écran
Modal.setAppElement('#root');

interface Property {
  id: number;
  title: string;
  location: string;
  description?: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  available?: boolean;
  features?: string[];
  images?: string[];
  durationMonths?: number;
}

interface PropertyDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  property: Property;
  onReserveClick: (property: Property) => void;
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 9999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '900px',
    width: '95%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '0',
    border: 'none',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  },
};

export function PropertyDetailModal({ isOpen, onRequestClose, property, onReserveClick }: PropertyDetailModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  
  if (!property) return null;
  
  // Images par défaut si aucune n'est fournie
  const propertyImages = property.images || [
    property.image,
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1664",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1664"
  ];

  // Type de propriété formaté
  const getPropertyType = () => {
    switch (property.type) {
      case 'apartment': return 'Appartement';
      case 'villa': return 'Villa';
      case 'studio': return 'Studio';
      case 'house': return 'Maison';
      default: return property.type;
    }
  };
  
  // Caractéristiques par défaut
  const features = property.features || [
    "Cuisine équipée",
    "Balcon",
    "Ascenseur",
    "Parking",
    "Internet haut débit",
    "Climatisation",
    "Sécurité 24/7",
    "Meublé"
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Détails du logement"
    >
      <div className="relative">
        {/* Bouton fermer */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onRequestClose}
            className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors shadow-md"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Carrousel d'images */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-64 md:h-80"
          >
            {propertyImages.map((image, index) => (
              <SwiperSlide key={index}>
                <AspectRatio ratio={16/9}>
                  <img 
                    src={image} 
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary hover:bg-primary-dark text-white">
              {getPropertyType()}
            </Badge>
            {property.available === false && (
              <Badge variant="outline" className="ml-2 bg-red-500 text-white border-none">
                Non disponible
              </Badge>
            )}
          </div>
        </div>
        
        {/* Contenu du modal */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">{property.title}</h2>
              <p className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1 text-primary" />
                {property.location}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-2xl font-bold text-primary">
                {property.price.toLocaleString()} FCFA<span className="text-sm font-normal text-gray-600">/mois</span>
              </div>
              <div className="text-sm text-gray-600">
                Durée minimale: {property.durationMonths || 6} mois
              </div>
            </div>
          </div>
          
          <div className="flex overflow-x-auto gap-1 mt-8 border-b">
            <button 
              className={cn(
                "px-4 py-2 flex-shrink-0 border-b-2 font-medium text-sm transition-all",
                activeTab === 'details' 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab('details')}
            >
              Détails
            </button>
            <button 
              className={cn(
                "px-4 py-2 flex-shrink-0 border-b-2 font-medium text-sm transition-all",
                activeTab === 'features' 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab('features')}
            >
              Équipements
            </button>
            <button 
              className={cn(
                "px-4 py-2 flex-shrink-0 border-b-2 font-medium text-sm transition-all",
                activeTab === 'location' 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab('location')}
            >
              Emplacement
            </button>
          </div>
          
          <div className="py-6">
            {activeTab === 'details' && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Home className="w-6 h-6 text-primary mb-1" />
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="font-medium">{getPropertyType()}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <BedDouble className="w-6 h-6 text-primary mb-1" />
                    <span className="text-sm text-gray-500">Chambres</span>
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Bath className="w-6 h-6 text-primary mb-1" />
                    <span className="text-sm text-gray-500">Salles de bain</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Ruler className="w-6 h-6 text-primary mb-1" />
                    <span className="text-sm text-gray-500">Surface</span>
                    <span className="font-medium">{property.area} m²</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600 mb-6">
                  {property.description || `Superbe ${getPropertyType().toLowerCase()} situé dans un quartier recherché de Douala. Ce logement spacieux et lumineux offre tout le confort dont vous avez besoin pour vous sentir chez vous. Proche des commodités et bien desservi par les transports.`}
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Conditions de location</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ArrowUp className="w-4 h-4 mr-2 text-primary transform rotate-45" />
                      <span>Dépôt de garantie: {(property.price * 2).toLocaleString()} FCFA (2 mois de loyer)</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUp className="w-4 h-4 mr-2 text-primary transform rotate-45" />
                      <span>Durée minimale de location: {property.durationMonths || 6} mois</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUp className="w-4 h-4 mr-2 text-primary transform rotate-45" />
                      <span>Charges incluses: eau, électricité en supplément</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUp className="w-4 h-4 mr-2 text-primary transform rotate-45" />
                      <span>Disponibilité: {property.available === false ? "Non disponible actuellement" : "Disponible immédiatement"}</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Équipements et services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'location' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Emplacement</h3>
                <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-4">
                  <iframe 
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127559.69264282565!2d9.657475463901248!3d4.052569048683151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128be15a5653%3A0xab7e580e08fb85e6!2sDouala%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1715618827582!5m2!1sfr!2sfr`}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">À proximité</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                      <span>Supermarché (350m)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                      <span>École (500m)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                      <span>Centre médical (1km)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                      <span>Arrêt de bus (200m)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <Button 
              variant="outline"
              className="flex-1 border-gray-300"
              onClick={onRequestClose}
            >
              Retour aux résultats
            </Button>
            <Button 
              variant="default" 
              className="flex-1 bg-primary hover:bg-primary-dark"
              onClick={() => onReserveClick(property)}
              disabled={property.available === false}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {property.available === false ? "Non disponible" : "Réserver une visite"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
