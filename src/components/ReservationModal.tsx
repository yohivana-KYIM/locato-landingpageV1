
import { useState } from "react";
import Modal from "react-modal";
import { X, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Assurez-vous que Modal est accessible pour les lecteurs d'écran
Modal.setAppElement('#root');

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  image: string;
  available: boolean;
}

interface ReservationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  property: Property;
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
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '0',
    border: 'none',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  },
};

export function ReservationModal({ isOpen, onRequestClose, property }: ReservationModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Générer les créneaux horaires disponibles
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      if (hour === 13) continue; // Pause déjeuner
      const formattedHour = hour.toString().padStart(2, "0");
      slots.push(`${formattedHour}:00`);
      if (hour !== 13 && hour !== 18) {
        slots.push(`${formattedHour}:30`);
      }
    }
    return slots;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi de la réservation
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Réservation envoyée",
        description: `Votre visite pour ${property.title} est confirmée pour le ${date} à ${time}`,
      });
      onRequestClose();
    }, 1500);
  };

  if (!property) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Réservation de visite"
    >
      <div className="relative">
        {/* Header avec image de la propriété */}
        <div className="relative h-40">
          <div className="absolute inset-0">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
          </div>
          
          <div className="absolute top-2 right-2">
            <button 
              onClick={onRequestClose}
              className="bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">{property.title}</h2>
            <p className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </p>
          </div>
        </div>
        
        {/* Contenu du modal */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Réserver une visite</h3>
          
          {!property.available ? (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg">
              <p className="font-medium">Ce logement n'est plus disponible</p>
              <p className="text-sm">Consultez nos autres offres ou contactez-nous pour plus d'informations.</p>
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  Date de visite
                </label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full pl-10"
                    min={new Date().toISOString().split('T')[0]}
                    disabled={!property.available}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-1">
                  Heure de visite
                </label>
                <div className="relative">
                  <Select disabled={!property.available} onValueChange={setTime}>
                    <SelectTrigger id="time" className="w-full pl-10">
                      <SelectValue placeholder="Choisir l'heure" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateTimeSlots().map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nom complet
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Entrez votre nom"
                disabled={!property.available}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Téléphone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Ex: 655123456"
                  disabled={!property.available}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemple@email.com"
                  disabled={!property.available}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">
                Raison de la visite (optionnel)
              </label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Précisez vos attentes pour cette visite..."
                className="w-full"
                disabled={!property.available}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={isSubmitting || !property.available}
                className="w-full bg-primary hover:bg-primary-dark"
              >
                {isSubmitting ? "Traitement en cours..." : "Confirmer la visite"}
              </Button>
              
              {property.available ? (
                <p className="text-xs text-center mt-2 text-gray-500">
                  En confirmant, vous acceptez que nous vous contactions au sujet de cette visite.
                </p>
              ) : (
                <p className="text-center mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onRequestClose}
                    className="text-primary border-primary hover:bg-primary/5"
                  >
                    Voir d'autres logements
                  </Button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
