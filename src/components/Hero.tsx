import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Plus, ChevronDown, Star, Check, MousePointer } from "lucide-react";
import * as THREE from 'three';

export default function EnhancedHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const textOptions = ["Appartements", "Villas", "Maisons", "Studios"];
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  
  // Palette de couleurs optimisée
  const primaryColor = "#E0252C";    // Rouge
  const secondaryColor = "#F38A30";  // Orange
  const accentColor = "#2E7D32";     // Vert foncé pour le bouton "Proposer un bien"

  // Arrière-plans optimisés pour une meilleure performance
  const backgrounds = [
    {
      type: "video",
      src: "/locato1.mp4",  // Vidéo locale depuis le dossier public
      poster: "/locato1-poster.jpg" // Ajout d'une image de poster pour le chargement
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&w=1920&q=75" // Optimisation de l'image
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&w=1920&q=75" // Optimisation de l'image
    }
  ];

  // Effet de parallaxe pour le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation de démarrage et intervalles
  useEffect(() => {
    // Chargement plus rapide
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50); // Réduit de 100ms à 50ms
    
    // Changement de texte plus rapide
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
    }, 2000); // Réduit de 3000ms à 2000ms
    
    // Changement d'arrière-plan plus rapide
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000); // Réduit de 8000ms à 6000ms
    
    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
      clearInterval(bgInterval);
    };
  }, []);
  
  // Gestion de la lecture vidéo optimisée
  useEffect(() => {
    if (backgrounds[currentBgIndex].type === "video" && videoRef.current) {
      // Préchargement de la vidéo
      videoRef.current.preload = "auto";
      videoRef.current.currentTime = 0;
      
      // Lecture optimisée
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Lecture vidéo optimisée:", error);
        });
      }
    }
  }, [currentBgIndex]);

  // Configuration de Three.js pour les effets 3D minimalistes
  useEffect(() => {
    if (!canvasRef.current || !isLoaded) return;

    // Initialisation de Three.js
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Convertir nos couleurs HEX en THREE.Color
    const primaryThreeColor = new THREE.Color(primaryColor);
    const secondaryThreeColor = new THREE.Color(secondaryColor);

    // Création des formes géométriques 3D épurées
    const geometries = [];
    
    // Sphère
    const sphereGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: primaryThreeColor,
      roughness: 0.3,
      metalness: 0.7,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-5, 2, -3);
    scene.add(sphere);
    geometries.push(sphere);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: secondaryThreeColor,
      roughness: 0.2,
      metalness: 0.8,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(5, -1, -2);
    cube.rotation.set(0.5, 0.5, 0);
    scene.add(cube);
    geometries.push(cube);

    // Tore
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.15, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: secondaryThreeColor,
      roughness: 0.4,
      metalness: 0.6,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(3, 2, -4);
    torus.rotation.set(1, 0.5, 0);
    scene.add(torus);
    geometries.push(torus);

    // Ajout de particules minimalistes
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200; // Réduit pour un aspect plus épuré
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Matériel pour les particules avec aspect moderne
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Éclairage optimisé
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const spotLight = new THREE.SpotLight(secondaryThreeColor, 1);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = 0.3;
    spotLight.penumbra = 1;
    spotLight.decay = 2;
    spotLight.distance = 30;
    scene.add(spotLight);

    // Gestion du redimensionnement de la fenêtre pour responsivité
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Animation fluide
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animation des formes géométriques - mouvement subtil
      geometries.forEach((mesh, index) => {
        mesh.rotation.x = elapsedTime * 0.15 * (index % 2 === 0 ? 1 : -1);
        mesh.rotation.y = elapsedTime * 0.2 * (index % 2 === 0 ? 1 : -1);
        
        // Mouvement oscillant subtil
        mesh.position.y += Math.sin(elapsedTime * (index + 1) * 0.3) * 0.003;
      });
      
      // Animation des particules - rotation lente
      particlesMesh.rotation.y = elapsedTime * 0.03;
      
      // Rendu
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isLoaded]);

  // Fonction pour faire défiler vers la section de recherche
  const scrollToSearch = () => {
    const searchSection = document.getElementById('search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Canvas Three.js */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: isLoaded ? 0.6 : 0 }}
      />

      {/* Arrières-plans */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${
            currentBgIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {bg.type === "image" ? (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url('${bg.src}')`,
                filter: "brightness(0.3) contrast(1.1)",
                transform: "scale(1.1)", // Légèrement plus grand pour éviter les bords blancs
                transition: "transform 0.3s ease-out"
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={bg.src}
              poster={bg.poster}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              loop
              style={{ 
                filter: "brightness(0.3) contrast(1.1)",
                transform: "scale(1.1)",
                transition: "transform 0.3s ease-out"
              }}
            />
          )}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}20 100%)`,
              mixBlendMode: 'soft-light',
              transition: "opacity 0.3s ease-out"
            }}
          />
        </div>
      ))}
      
      {/* Overlay design épuré */}
      <div className="absolute inset-0 z-5 bg-black/30" 
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, ${primaryColor}10 0%, transparent 40%), 
                           radial-gradient(circle at 70% 60%, ${secondaryColor}10 0%, transparent 40%)`,
          backdropFilter: 'blur(1px)'
        }}
      />
      
      {/* Éléments de design Notion/Dribbble */}
      <div 
        className={`absolute w-32 h-32 rounded-3xl bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-lg -top-4 left-1/4 transform rotate-12 z-20 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-300`} 
        style={{ 
          animation: 'float 15s ease-in-out infinite',
          transform: `rotate(12deg) translateY(${scrollPosition * 0.15}px)`,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
      
      <div 
        className={`absolute w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg bottom-32 left-1/3 z-20 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-500`} 
        style={{ 
          animation: 'float 12s ease-in-out infinite 1s',
          transform: `translateY(${scrollPosition * -0.1}px)`,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
      
      {/* Contenu principal */}
      <div 
        className="container mx-auto px-4 relative z-30 flex-1 flex items-center justify-center"
        style={{ transform: `translateY(${scrollPosition * -0.2}px)` }}
      >
        <div className="max-w-4xl mx-auto text-center py-12">
          {/* Titre principal avec effet de révélation */}
          <div className="overflow-hidden mb-4 md:mb-6">
            <h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight`}
              style={{ 
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              }}
            >
              <span 
                className={`block transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                Trouvez vite
              </span>
              <span 
                className={`block transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '0.1s' }}
              >
                <span className="text-white">et</span> <span style={{color: secondaryColor}}>louez mieux</span>
              </span>
            </h1>
          </div>
          
          {/* Texte animé avec effet de typage */}
          <div 
            className={`text-xl md:text-2xl font-medium h-12 mb-6 md:mb-8 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
            style={{ transition: 'opacity 0.6s ease', transitionDelay: '0.3s' }}
          >
            <span className="text-white/80">Découvrez les meilleurs </span>
            <span 
              className="inline-block min-w-32 transition-all duration-500 font-semibold"
              style={{ color: primaryColor }}
            >
              {textOptions[currentTextIndex]}
            </span>
          </div>
          
          {/* Description épurée */}
          <div
            className={`text-base md:text-lg text-white/70 mb-8 md:mb-10 max-w-xl mx-auto ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.6s ease', transitionDelay: '0.5s' }}
          >
            <p>
              {/* La plateforme de location immobilière qui vous permet de trouver rapidement 
              le logement idéal selon vos critères à Douala, Cameroun. */}
            </p>
          </div>
          
          {/* Zone de recherche optimisée */}
          <div
            className={`relative max-w-2xl mx-auto mb-8 md:mb-10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
              transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)', 
              transitionDelay: '0.3s',
              willChange: 'transform, opacity' // Optimisation des performances
            }}
          >
            <div className="relative flex rounded-xl overflow-hidden bg-white/10 backdrop-blur-md p-1 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex-1 flex items-center px-4 py-3">
                <Search className="w-5 h-5 text-white/60 mr-3 transition-colors duration-300" />
                <input 
                  type="text" 
                  placeholder="Où souhaitez-vous habiter ?" 
                  className="bg-transparent text-white w-full outline-none placeholder:text-white/60 focus:placeholder:text-white/40 transition-colors duration-300"
                />
              </div>
              <Button 
                size="lg" 
                className="px-6 py-3 m-0 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ 
                  background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 8px 20px -6px ${primaryColor}50`,
                  willChange: 'transform' // Optimisation des performances
                }}
              >
                Rechercher
              </Button>
            </div>
          </div>
          
          {/* Avantages */}
          <div 
            className={`flex flex-wrap justify-center gap-4 md:gap-8 mt-4 md:mt-6 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '0.8s' }}
          >
            {[
              { icon: <Check className="h-4 w-4" />, text: "Visite" },
              { icon: <Check className="h-4 w-4" />, text: "Paiement sécurisé" },
              { icon: <Check className="h-4 w-4" />, text: "Assistance 24/7" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center text-white/80 text-sm"
              >
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                  style={{ background: primaryColor }}
                >
                  {item.icon}
                </div>
                {item.text}
              </div>
            ))}
          </div>
          
          {/* Boutons d'action */}
          <div 
            className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 md:mt-10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '0.7s' }}
          >
            <Button 
              size="lg" 
              className="group relative px-6 py-2 overflow-hidden"
              style={{ 
                background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 8px 20px -6px ${primaryColor}40`
              }}
            >
              <div className="absolute inset-0 w-full h-full bg-white/10 transform origin-left -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="relative z-10">Découvrir les biens</span>
            </Button>
            
            <Button 
              size="lg" 
              className="group relative px-6 py-2 overflow-hidden"
              style={{ 
                background: `linear-gradient(to right, #1a1a1a, #333333)`,
                boxShadow: `0 8px 20px -6px rgba(0,0,0,0.4)`
              }}
            >
              <div className="absolute inset-0 w-full h-full bg-white/10 transform origin-left -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <Plus className="mr-2 h-5 w-5 relative z-10" />
              <span className="relative z-10">Proposer un bien</span>
            </Button>
          </div>
          
          {/* Statistiques design épuré */}
          <div 
            className={`flex justify-center mt-16 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '0.9s' }}
          >
            {/* <div className="grid grid-cols-3 gap-2 md:gap-8 max-w-2xl">
              {[
                { number: "1000+", label: "Logements" },
                { number: "98%", label: "Satisfaction" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="p-2 md:p-4 rounded-lg text-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div 
                    className="text-xl md:text-3xl font-bold mb-1" 
                    style={{ color: index === 0 ? primaryColor : index === 1 ? secondaryColor : '#fff' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Bouton de défilement avec icône de souris */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)', transitionDelay: '1s' }}
      >
        <button
          onClick={scrollToSearch}
          className="group flex flex-col items-center text-white/80 hover:text-white transition-colors"
        >
          <div className="w-10 h-16 rounded-full border-2 border-white/20 flex items-start justify-center p-2 mb-2 group-hover:border-white/40 transition-colors">
            <MousePointer className="w-4 h-4 animate-bounce-slow" />
          </div>
          <span className="text-sm font-medium">Découvrir</span>
        </button>
      </div>
      
      {/* Style global pour les animations optimisées */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        /* Optimisation des performances */
        .optimize-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}