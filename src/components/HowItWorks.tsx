
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

type UserType = "tenant" | "landlord";

export function HowItWorks() {
  const [activeUserType, setActiveUserType] = useState<UserType>("tenant");
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tenantSteps = [
    {
      title: "Recherchez",
      description: "Utilisez nos filtres avancés pour trouver un logement qui correspond à vos besoins.",
      icon: "🔍"
    },
    {
      title: "Réservez une visite",
      description: "Planifiez une visite à une date et heure qui vous conviennent.",
      icon: "📅"
    },
    {
      title: "Postulez",
      description: "Soumettez votre dossier et vos documents directement via notre plateforme.",
      icon: "📄"
    },
    {
      title: "Emménagez",
      description: "Une fois votre dossier accepté, signez le bail et emménagez dans votre nouveau logement.",
      icon: "🏠"
    }
  ];
  
  const landlordSteps = [
    {
      title: "Publiez votre bien",
      description: "Créez une annonce détaillée avec photos et description de votre logement.",
      icon: "📸"
    },
    {
      title: "Gérez les visites",
      description: "Acceptez ou refusez les demandes de visite selon votre disponibilité.",
      icon: "📆"
    },
    {
      title: "Évaluez les candidats",
      description: "Consultez les dossiers des candidats et choisissez le locataire idéal.",
      icon: "👥"
    },
    {
      title: "Signez le contrat",
      description: "Finalisez le processus de location en toute sécurité via notre plateforme.",
      icon: "✍️"
    }
  ];

  const steps = activeUserType === "tenant" ? tenantSteps : landlordSteps;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn(
          "transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            Comment ça fonctionne
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Notre plateforme facilite la recherche et la gestion de locations immobilières
          </p>
          
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex rounded-lg overflow-hidden border">
              <button
                className={`flex-1 py-3 font-medium transition-colors ${
                  activeUserType === "tenant" 
                    ? "bg-primary text-white" 
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveUserType("tenant")}
                id="tenant"
              >
                Je cherche un logement
              </button>
              <button
                className={`flex-1 py-3 font-medium transition-colors ${
                  activeUserType === "landlord" 
                    ? "bg-primary text-white" 
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveUserType("landlord")}
                id="landlord"
              >
                Je propose un logement
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className={`border-none shadow-lg transition-all hover:shadow-xl ${inView ? 'animate-scale-in' : 'opacity-0'}`} 
                   style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="text-center relative pb-0">
                  <div className="w-16 h-16 flex items-center justify-center text-3xl bg-white rounded-full border-2 border-primary mx-auto mb-3 shadow-sm">
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-full w-full h-0.5 bg-gray-200 transform -translate-x-8 hidden lg:block"></div>
                  )}
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-4">
                  <CardDescription className="text-gray-600">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
