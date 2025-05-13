import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, CheckCircle, Loader2 } from "lucide-react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inViewElements, setInViewElements] = useState({
    header: false,
    form: false,
    info: false,
    map: false
  });

  // Animation lors du scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInViewElements(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais",
        variant: "success",
      });
      
      // Réinitialiser le formulaire après quelques secondes
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête de section */}
        <div 
          data-section="header"
          className={cn(
            "transition-all duration-1000 transform",
            inViewElements.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="text-center mb-20">
            <div className="flex justify-center mb-4">
              <div className="h-1.5 w-16 bg-gradient-to-r from-[#E0252C] to-[#F38A30] rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#E0252C] to-[#F38A30]">
              Contactez-nous
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Notre équipe de professionnels est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Formulaire de contact - Style épuré façon Notion */}
          <div 
            data-section="form"
            className={cn(
              "w-full lg:w-1/2 transition-all duration-1000 delay-200",
              inViewElements.form ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            )}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="p-8 md:p-10">
                <div className="flex items-center mb-10">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#E0252C] to-[#F38A30] mr-4"></div>
                  <h3 className="text-2xl font-semibold text-gray-800">Envoyez-nous un message</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="space-y-2 group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 group-focus-within:text-[#E0252C] transition-colors duration-200">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Entrez votre nom"
                      className="w-full px-4 py-3 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F38A30]/20 focus:border-[#F38A30] transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 group-focus-within:text-[#E0252C] transition-colors duration-200">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="votreemail@exemple.com"
                      className="w-full px-4 py-3 h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F38A30]/20 focus:border-[#F38A30] transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 group-focus-within:text-[#E0252C] transition-colors duration-200">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="w-full min-h-[180px] px-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F38A30]/20 focus:border-[#F38A30] resize-none transition-all duration-200"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || submitted}
                    className={cn(
                      "w-full h-14 rounded-xl font-medium text-base transition-all duration-500 shadow-md",
                      submitted 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-gradient-to-r from-[#E0252C] to-[#F38A30] hover:from-[#d01f25] hover:to-[#e57f29] hover:shadow-lg hover:shadow-[#F38A30]/20"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi en cours...
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center justify-center">
                        <CheckCircle className="mr-2 h-5 w-5" /> Message envoyé
                      </span>
                    ) : (
                      <span className="flex items-center justify-center group">
                        Envoyer le message 
                        <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Informations de contact - Style épuré façon Dribbble */}
          <div 
            data-section="info"
            className={cn(
              "w-full lg:w-1/2 transition-all duration-1000 delay-400",
              inViewElements.info ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            )}
          >
            <div className="h-full flex flex-col gap-8">
              {/* Carte de contact */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-8 text-gray-800 flex items-center">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#F38A30] to-[#E0252C] mr-4"></div>
                  Nos coordonnées
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFEDE0] to-[#FFF5ED] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                        <MapPin className="w-6 h-6 text-[#E0252C] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="ml-5">
                      <h4 className="text-lg font-medium text-gray-800 mb-1">Adresse</h4>
                      <p className="text-gray-600">
                        Rue des Palmiers, Akwa<br />
                        Douala, Cameroun
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFEDE0] to-[#FFF5ED] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                        <Phone className="w-6 h-6 text-[#E0252C] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="ml-5">
                      <h4 className="text-lg font-medium text-gray-800 mb-1">Téléphone</h4>
                      <p className="text-gray-600">
                        <a href="tel:+237671178991" className="hover:text-[#E0252C] transition-colors duration-200">+237 671 178 991</a><br />
                        <a href="tel:+237677789012" className="hover:text-[#E0252C] transition-colors duration-200">+237 677 789 012</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFEDE0] to-[#FFF5ED] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                        <Mail className="w-6 h-6 text-[#E0252C] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="ml-5">
                      <h4 className="text-lg font-medium text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600">
                        <a href="mailto:contact@locato.cm" className="hover:text-[#E0252C] transition-colors duration-200">contact@locato.cm</a><br />
                        <a href="mailto:support@locato.cm" className="hover:text-[#E0252C] transition-colors duration-200">support@locato.cm</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Heures d'ouverture */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
                <h4 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                  <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#E0252C] to-[#F38A30] mr-4"></div>
                  Heures d'ouverture
                </h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition-all duration-300">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-[#F38A30]" />
                      Lundi - Vendredi:
                    </span>
                    <span className="font-medium text-gray-800 bg-[#FFF0E6] px-3 py-1 rounded-lg">08:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition-all duration-300">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-[#F38A30]" />
                      Samedi:
                    </span>
                    <span className="font-medium text-gray-800 bg-[#FFF0E6] px-3 py-1 rounded-lg">09:00 - 15:00</span>
                  </li>
                  <li className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 rounded-xl transition-all duration-300">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-[#F38A30]" />
                      Dimanche:
                    </span>
                    <span className="font-medium text-gray-800 bg-[#FFEDE0] px-3 py-1 rounded-lg">Fermé</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carte de localisation */}
        <div 
          data-section="map"
          className={cn(
            "mt-16 transition-all duration-1000 delay-600",
            inViewElements.map ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          )}
        >
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-[#E0252C] to-[#F38A30] mr-4"></div>
              <h3 className="text-2xl font-semibold text-gray-800">Notre zone de couverture</h3>
            </div>
            <p className="text-gray-600 mb-10 max-w-3xl text-lg">
              Nous sommes actuellement présents uniquement au Cameroun, dans la région du Littoral à Douala
            </p>
            
            <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127559.69264282565!2d9.657475463901248!3d4.052569048683151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061128be15a5653%3A0xab7e580e08fb85e6!2sDouala%2C%20Cameroun!5e0!3m2!1sfr!2sfr!4v1715618827582!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
            
            <div className="mt-10">
              <h4 className="font-medium text-xl text-gray-800 mb-6 flex items-center">
                <div className="w-1 h-6 rounded-full bg-[#F38A30] mr-3"></div>
                Quartiers couverts à Douala
              </h4>
              <div className="flex flex-wrap gap-3">
                {['Akwa', 'Bonanjo', 'Bonapriso', 'Bonamoussadi', 'Makepe', 'Ndokotti', 'Deido', 'Bali', 'Bepanda', 'Logpom'].map((quartier, index) => (
                  <div 
                    key={quartier}
                    className={cn(
                      "bg-gradient-to-r text-white rounded-xl px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300",
                      index % 2 === 0 
                        ? "from-[#E0252C] to-[#F38A30]" 
                        : "from-[#F38A30] to-[#E0252C]"
                    )}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animation: inViewElements.map ? 'fadeIn 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    {quartier}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}