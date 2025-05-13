
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

export function CtaSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn(
          "max-w-4xl mx-auto text-center transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à trouver votre prochain logement ?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Rejoignez des milliers d'utilisateurs satisfaits qui ont trouvé leur logement idéal sur Locato.
            Inscription gratuite et rapide !
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100 px-8 py-6">
              Rechercher un logement
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
              Proposer un bien
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
