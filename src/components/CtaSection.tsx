import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { ArrowRight, Home, PlusCircle, Star, Users, Clock, Gift, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CtaSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Gestionnaire de mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuration des particules
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      trail: Array<{ x: number; y: number }>;
    }> = [];

    const createParticle = (x: number, y: number) => {
      const colors = ['#ffffff', '#E0252C', '#F38A30', '#ffd700', '#00ff00', '#00ffff'];
      return {
        x,
        y,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: Array(5).fill({ x, y })
      };
    };

    // Créer des particules initiales
    for (let i = 0; i < 70; i++) {
      particles.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Animation des particules
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Effet de traînée pour la souris
      if (isHovering) {
        for (let i = 0; i < 3; i++) {
          particles.push(createParticle(
            mousePosition.x + (Math.random() - 0.5) * 20,
            mousePosition.y + (Math.random() - 0.5) * 20
          ));
        }
      }
      
      particles.forEach((particle, index) => {
        // Mise à jour de la traînée
        particle.trail.pop();
        particle.trail.unshift({ x: particle.x, y: particle.y });

        // Mise à jour de la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity -= 0.003;

        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        if (particle.opacity <= 0) {
          particles[index] = createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
        }

        // Dessin de la traînée
        particle.trail.forEach((point, i) => {
          const trailOpacity = (1 - i / particle.trail.length) * particle.opacity;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * (1 - i / particle.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        });

        // Dessin de la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePosition, isHovering]);

  return (
    <section 
      className="py-32 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Canvas pour les particules */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Effet de fond décoratif amélioré */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E0252C] via-[#E0252C]/95 to-[#F38A30]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay animate-pulse-slow"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Effet de scanline amélioré */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[2px] animate-[scan_8s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[1px] animate-[scan_4s_linear_infinite]" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Effet de glitch */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-white/5 animate-[glitch_0.3s_steps(2)_infinite]"></div>
      </div>

      {/* Motif de points décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="container mx-auto px-4 relative">
        <div ref={ref} className={cn(
          "max-w-5xl mx-auto text-center transition-all duration-1000 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {/* Badge amélioré avec effet néon */}
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-10 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden neon-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Star className="w-4 h-4 text-yellow-300 mr-2 animate-pulse-slow" />
            <Sparkles className="absolute -right-2 -top-2 w-3 h-3 text-yellow-300 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
            <Zap className="absolute -left-2 -bottom-2 w-3 h-3 text-blue-300 animate-pulse-slow" style={{ animationDelay: '0.7s' }} />
            <span className="text-white/90 text-sm font-medium tracking-wide relative z-10">Ce que disent nos utilisateurs</span>
            <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse-slow"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight tracking-tight relative neon-text">
            Prêt à trouver votre{" "}
            <span className="relative inline-block">
              prochain logement
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/30 rounded-full"></span>
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-white rounded-full animate-[width_2s_ease-in-out_infinite]"></span>
              <span className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow rounded-lg blur-sm"></span>
            </span>
            ?
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light relative">
            <span className="relative z-10">
            Rejoignez des milliers d'utilisateurs satisfaits qui ont trouvé leur logement idéal sur Locato.
              <span className="block mt-2 text-white/80">Inscription gratuite et rapide !</span>
            </span>
            <span className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow rounded-lg blur-md"></span>
          </p>

          {/* Boutons améliorés avec effets néon */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Button 
              size="lg" 
              className="group relative bg-white text-[#E0252C] hover:bg-white/90 px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden neon-button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Home className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold relative z-10">Rechercher un logement</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 border border-white/20 rounded-2xl animate-pulse-slow"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E0252C] to-[#F38A30] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 rounded-2xl"></div>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="group relative border-2 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden neon-button-outline"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <PlusCircle className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold relative z-10">Proposer un bien</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 border border-white/20 rounded-2xl animate-pulse-slow"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E0252C] to-[#F38A30] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 rounded-2xl"></div>
            </Button>
          </div>

          {/* Statistiques améliorées avec effets néon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
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
                value: "24/7", 
                label: "Support client",
                icon: Clock,
                color: "from-purple-400 to-purple-600",
                glow: "shadow-purple-500/20",
                neon: "text-purple-400"
              },
              { 
                value: "100%", 
                label: "Gratuit",
                icon: Gift,
                color: "from-yellow-400 to-yellow-600",
                glow: "shadow-yellow-500/20",
                neon: "text-yellow-400"
              }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={cn(
                  "group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in-up hover:shadow-lg hover:scale-105",
                  stat.glow,
                  "neon-card"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <stat.icon className={cn("w-8 h-8 mb-4 mx-auto text-white/80 group-hover:scale-110 transition-transform duration-300", stat.neon)} />
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300 relative">
                  {stat.value}
                  <span className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm"></span>
                </div>
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl animate-pulse-slow"></div>
                <div className={cn("absolute -inset-1 bg-gradient-to-br opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 rounded-2xl", stat.color)}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
