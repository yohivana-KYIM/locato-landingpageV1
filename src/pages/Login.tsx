import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'une connexion
    setTimeout(() => {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Locato",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Côté formulaire */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/f57da0a1-0095-4f23-b813-cfc3e39f8403.png" 
                alt="Locato Logo" 
                className="h-12 w-auto"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Bon retour 👋
            </h2>
            <p className="mt-3 text-gray-600">
              Aujourd'hui est un nouveau jour. Trouvez le logement parfait selon vos envies.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email ou numéro de téléphone
              </label>
              <Input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@email.com"
                required
                className="w-full py-3"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Au moins 8 caractères"
                required
                className="w-full py-3"
              />
              <div className="text-right mt-1">
                <a href="#" className="text-primary text-sm hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-white py-6"
              >
                Connexion
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={() => toast({ title: "Google Auth", description: "Fonctionnalité à venir" })}
                variant="outline" 
                className="w-full py-6 border text-gray-700"
              >
                <Mail className="mr-2 h-5 w-5" />
                Connexion avec Google
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <a href="/signup" className="text-primary font-medium hover:underline">
              S'inscrire
            </a>
          </p>

          <p className="mt-10 text-center text-xs text-gray-400">
            LOCATO © {new Date().getFullYear()} TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>

      {/* Côté image */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 z-10"></div>
        <img 
          src="/lovable-uploads/gauche.png"
          alt="Couple avec des clés" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
