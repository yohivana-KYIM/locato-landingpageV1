import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { Search, Calendar, FileText, Home, Camera, Users, CheckCircle, Building2, ArrowRight, Sparkles } from "lucide-react";

type UserType = "tenant" | "landlord";

export function HowItWorks() {
  const [activeUserType, setActiveUserType] = useState<UserType>("tenant");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleUserTypeChange = (type: UserType) => {
    if (type !== activeUserType) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveUserType(type);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const tenantSteps = [
    {
      title: "Recherchez",
      description: "Utilisez nos filtres avancés pour trouver un logement qui correspond à vos besoins.",
      icon: <Search className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Réservez une visite",
      description: "Planifiez une visite à une date et heure qui vous conviennent.",
      icon: <Calendar className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Postulez",
      description: "Soumettez votre dossier et vos documents directement via notre plateforme.",
      icon: <FileText className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Emménagez",
      description: "Une fois votre dossier accepté, signez le bail et emménagez dans votre nouveau logement.",
      icon: <Home className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600"
    }
  ];
  
  const landlordSteps = [
    {
      title: "Publiez votre bien",
      description: "Créez une annonce détaillée avec photos et description de votre logement.",
      icon: <Camera className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Gérez les visites",
      description: "Acceptez ou refusez les demandes de visite selon votre disponibilité.",
      icon: <Calendar className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Évaluez les candidats",
      description: "Consultez les dossiers des candidats et choisissez le locataire idéal.",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Signez le contrat",
      description: "Finalisez le processus de location en toute sécurité via notre plateforme.",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const steps = activeUserType === "tenant" ? tenantSteps : landlordSteps;

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs d'arrière-plan améliorés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-50 animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div ref={ref} className={cn(
          "transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-4">
              <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary rounded-full animate-border-dance"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Comment ça fonctionne
            </h2>
            <p className="text-gray-600 text-lg neon-glow">
              Notre plateforme facilite la recherche et la gestion de locations immobilières
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex rounded-xl overflow-hidden border shadow-sm bg-white">
              <button
                className={cn(
                  "flex-1 py-4 px-6 font-medium transition-all duration-300 relative",
                  activeUserType === "tenant" 
                    ? "text-white" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleUserTypeChange("tenant")}
                id="tenant"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Je cherche un logement
                </span>
                {activeUserType === "tenant" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
                )}
              </button>
              <button
                className={cn(
                  "flex-1 py-4 px-6 font-medium transition-all duration-300 relative",
                  activeUserType === "landlord" 
                    ? "text-white" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleUserTypeChange("landlord")}
                id="landlord"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Home className="w-5 h-5" />
                  Je propose un logement
                </span>
                {activeUserType === "landlord" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
                )}
              </button>
            </div>
          </div>
          
          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-300",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}>
            {steps.map((step, index) => (
              <Card 
                key={index} 
                className={cn(
                  "group relative border-none transition-all duration-500 glass-effect glass-effect-hover",
                  "hover:shadow-2xl hover:-translate-y-2",
                  "before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
                  "after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-primary/5 after:to-secondary/5 after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100",
                  inView ? 'animate-scale-in' : 'opacity-0'
                )} 
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transform: 'perspective(1000px)',
                  transformStyle: 'preserve-3d',
                  borderRadius: '2rem'
                }}
              >
                {/* Effet de brillance amélioré */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                  <div className="absolute -inset-[100%] animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </div>

                {/* Contenu de la carte avec effet glassmorphisme */}
                <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 transition-all duration-500 group-hover:bg-white/90">
                  <CardHeader className="text-center relative pb-0">
                    {/* Icône avec effets améliorés */}
                    <div className={cn(
                      "relative w-24 h-24 mx-auto mb-8 transition-all duration-500",
                      "group-hover:scale-110 group-hover:rotate-3"
                    )}>
                      {/* Cercle décoratif avec animation */}
                      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white to-gray-100 shadow-lg transform rotate-6 transition-transform duration-500 group-hover:rotate-12 animate-pulse-glow"></div>
                      
                      {/* Icône principale avec animation */}
                      <div className={cn(
                        "relative w-full h-full flex items-center justify-center text-white rounded-[1.5rem] shadow-lg bg-gradient-to-br transition-all duration-500",
                        "group-hover:shadow-xl group-hover:shadow-primary/20",
                        "group-hover:animate-icon-spin",
                        step.color
                      )}>
                        {step.icon}
                        
                        {/* Effet de brillance sur l'icône */}
                        <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Étoiles décoratives avec animation */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-float">
                        <Sparkles className="w-full h-full" />
                      </div>
                    </div>

                    {/* Ligne de connexion avec animation améliorée */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-12 left-full w-full h-0.5 hidden lg:block">
                        <div className="relative w-full h-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 animate-border-dance"></div>
                          </div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-primary shadow-lg transform group-hover:scale-125 transition-transform duration-500 animate-pulse-glow"></div>
                        </div>
                      </div>
                    )}

                    <CardTitle className="text-2xl font-semibold gradient-text transition-all duration-500 mb-4">
                      {step.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center pt-4">
                    <CardDescription className="text-gray-600 text-lg transition-colors duration-500 group-hover:text-gray-800 neon-glow">
                      {step.description}
                    </CardDescription>
                  </CardContent>

                  {/* Indicateur de progression avec animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100 rounded-b-[2rem] overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 animate-border-dance"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    ></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
