import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { Building2, Home, Users, Shield, Target, ArrowRight, Star, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      value: "1000+",
      label: "Logements disponibles",
      icon: Home,
      color: "from-blue-400 to-blue-600",
      glow: "shadow-blue-500/20",
      neon: "text-blue-400"
    },
    {
      value: "500+",
      label: "Utilisateurs satisfaits",
      icon: Users,
      color: "from-green-400 to-green-600",
      glow: "shadow-green-500/20",
      neon: "text-green-400"
    },
    {
      value: "10+",
      label: "Quartiers couverts",
      icon: Building2,
      color: "from-purple-400 to-purple-600",
      glow: "shadow-purple-500/20",
      neon: "text-purple-400"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Notre Mission",
      description: "Simplifier la recherche de logement à Douala en offrant une plateforme intuitive et efficace.",
      color: "from-[#E0252C] to-[#F38A30]"
    },
    {
      icon: Shield,
      title: "Notre Engagement",
      description: "Garantir la qualité et la sécurité de chaque logement proposé sur notre plateforme.",
      color: "from-[#F38A30] to-[#E0252C]"
    },
    {
      icon: Users,
      title: "Notre Vision",
      description: "Devenir la référence en matière de location immobilière au Cameroun.",
      color: "from-[#E0252C] to-[#F38A30]"
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Effet de fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFEDE0]/20 via-transparent to-[#FFF5ED]/20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Motif de points décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="container mx-auto px-4 relative">
        <div ref={ref} className={cn(
          "max-w-6xl mx-auto transition-all duration-1000 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {/* En-tête avec badge */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden neon-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Star className="w-4 h-4 text-yellow-300 mr-2 animate-pulse-slow" />
              <Sparkles className="absolute -right-2 -top-2 w-3 h-3 text-yellow-300 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
              <Zap className="absolute -left-2 -bottom-2 w-3 h-3 text-blue-300 animate-pulse-slow" style={{ animationDelay: '0.7s' }} />
              <span className="text-gray-800 text-sm font-medium tracking-wide relative z-10">À propos de Locato</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-800 leading-tight tracking-tight relative">
              La plateforme de location immobilière qui vous permet de trouver rapidement le logement idéal selon vos critères à Douala, Cameroun.
            </h2>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Notre mission est de simplifier votre recherche de logement en vous offrant une expérience unique et personnalisée.
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={cn(
                  "group relative bg-white rounded-2xl p-8 border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up",
                  stat.glow
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color})` }}></div>
                <stat.icon className={cn("w-12 h-12 mb-6 text-gray-800 group-hover:scale-110 transition-transform duration-300", stat.neon)} />
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
                <div className="absolute inset-0 border border-gray-100/50 rounded-2xl animate-pulse-slow"></div>
              </div>
            ))}
          </div>

          {/* Nos valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={cn(
                  "group relative bg-white rounded-2xl p-8 border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up",
                  "hover:scale-105"
                )}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" style={{ backgroundImage: `linear-gradient(to bottom right, ${value.color})` }}></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center" style={{ backgroundImage: `linear-gradient(to bottom right, ${value.color})` }}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
                <div className="absolute inset-0 border border-gray-100/50 rounded-2xl animate-pulse-slow"></div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="group relative bg-gradient-to-r from-[#E0252C] to-[#F38A30] text-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 font-semibold">Découvrir nos logements</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 