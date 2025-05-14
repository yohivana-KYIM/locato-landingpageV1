import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Download, Check, Search, Plus, ChevronDown } from "lucide-react";
import * as THREE from "three";

export function MobileApps() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const canvasRef = useRef(null);

  // Observer pour détecter quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Animation de rotation du téléphone
  useEffect(() => {
    if (phoneRef.current && inView) {
      const phone = phoneRef.current;
      let animationFrame;
      let startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const oscillation = Math.sin(elapsed / 1000) * 5;
        
        phone.style.transform = `rotateY(${oscillation}deg) translateY(${Math.sin(elapsed / 1500) * 5}px)`;
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [inView]);

  // Configuration Three.js avec effets visuels améliorés
  useEffect(() => {
    if (!canvasRef.current || !inView) return;

    // Configuration
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      canvas: canvasRef.current
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Système de particules amélioré
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Distribution sphérique pour un effet plus élégant
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      
      scaleArray[i / 3] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Shader personnalisé pour les particules
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#E0252C') },
        secondaryColor: { value: new THREE.Color('#F38A30') }
      },
      vertexShader: `
        attribute float scale;
        uniform float time;
        
        void main() {
          vec3 pos = position;
          pos.x += sin(time * 0.2 + position.z * 0.5) * 0.1;
          pos.y += cos(time * 0.2 + position.x * 0.5) * 0.1;
          pos.z += sin(time * 0.2 + position.y * 0.5) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 4.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 secondaryColor;
        uniform float time;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float mixFactor = sin(time * 0.3) * 0.5 + 0.5;
          vec3 finalColor = mix(color, secondaryColor, mixFactor);
          
          gl_FragColor = vec4(finalColor, 1.0 - dist * 2.0);
        }
      `,
      transparent: true,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Ajout d'un effet de lumière
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xE0252C, 1, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xF38A30, 1, 10);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    camera.position.z = 5;

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update shaders
      particlesMaterial.uniforms.time.value = elapsedTime;
      
      // Rotation douce
      particlesMesh.rotation.x = elapsedTime * 0.05;
      particlesMesh.rotation.y = elapsedTime * 0.08;
      
      // Mouvement des lumières
      pointLight.position.x = Math.sin(elapsedTime * 0.3) * 3;
      pointLight.position.y = Math.cos(elapsedTime * 0.2) * 3;
      pointLight2.position.x = Math.sin(elapsedTime * 0.3 + Math.PI) * 3;
      pointLight2.position.y = Math.cos(elapsedTime * 0.2 + Math.PI) * 3;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [inView]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Canvas Three.js en arrière-plan */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`transition-all duration-1000 ${inView ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#E0252C] to-[#F38A30]">
            Trouvez vite<br />et louez mieux
          </h1>
          
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 text-lg">
            Téléchargez notre application mobile pour trouver votre logement idéal où que vous soyez
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Côté gauche: Téléphone avec application */}
          <div 
            className={`relative transition-all duration-1000 ${inView ? 'opacity-100 transform translate-x-0 scale-100' : 'opacity-0 transform -translate-x-20 scale-95'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative flex justify-center perspective">
              {/* Effets lumineux avec animation */}
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#E0252C]/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#F38A30]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Téléphone avec animation améliorée */}
              <div 
                ref={phoneRef} 
                className="relative transition-all duration-700 ease-out"
                style={{ 
                  transformStyle: 'preserve-3d',
                  animation: inView ? 'float 3s ease-in-out infinite' : 'none'
                }}
              >
                {/* Cadre du téléphone */}
                <div className="relative w-64 h-auto rounded-[3rem] bg-black shadow-2xl overflow-hidden border-8 border-gray-800">
                  {/* Encoche du téléphone */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>
                  
                  {/* Écran de l'application */}
                  <div className="relative aspect-[9/19.5] w-full bg-white overflow-hidden">
                    {/* Interface de l'application */}
                    <div className="absolute inset-0">
                      {/* Barre de statut */}
                      <div className="h-10 bg-[#E0252C] flex items-center justify-between px-4">
                        <div className="text-white text-xs font-bold">20:45</div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-white/80"></div>
                          <div className="w-3 h-3 rounded-full bg-white/80"></div>
                          <div className="w-3 h-3 rounded-full bg-white/80"></div>
                        </div>
                      </div>
                      
                      {/* Contenu de l'application */}
                      <div className="p-3 h-full bg-gray-100">
                        <div className="bg-white rounded-xl shadow-sm p-3 mb-3">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-[#E0252C]/10 flex items-center justify-center mr-2">
                              <div className="w-4 h-4 rounded-full bg-[#E0252C]"></div>
                            </div>
                            <div className="text-xs font-bold">Locato</div>
                          </div>
                          <div className="text-[10px] font-medium">Trouvez votre logement idéal</div>
                        </div>
                        
                        {/* Carte avec propriétés */}
                        <div className="bg-[#E0252C]/10 rounded-xl h-40 mb-3 relative overflow-hidden">
                          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                            <div className="w-4 h-4 bg-[#E0252C] rounded-full"></div>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 bg-white rounded-lg p-2 shadow-md">
                            <div className="text-[8px] font-bold text-[#E0252C]">3 propriétés à proximité</div>
                          </div>
                        </div>
                        
                        {/* Liste de propriétés */}
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg p-2 flex shadow-sm">
                              <div className="w-12 h-12 bg-gray-200 rounded-md mr-2"></div>
                              <div>
                                <div className="text-[10px] font-bold">Appartement {i}</div>
                                <div className="text-[8px] text-gray-500">Yaoundé • 2 chambres</div>
                                <div className="text-[8px] font-bold text-[#E0252C] mt-1">180 000 FCFA/mois</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Barre de navigation */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-200 flex justify-around items-center px-4">
                          {['home', 'search', 'bookmark', 'user'].map((icon, i) => (
                            <div key={i} className={`w-6 h-6 rounded-full ${i === 0 ? 'bg-[#E0252C]' : 'bg-gray-200'}`}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Reflet sur l'écran */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-[3rem] pointer-events-none"></div>
              </div>
            </div>
          </div>
          
          {/* Côté droit: Informations sur l'application avec délais augmentés */}
          <div 
            className={`space-y-8 transition-all duration-1000 ${inView ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-20'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="space-y-3">
              <div className="inline-flex items-center bg-[#E0252C]/10 text-[#E0252C] rounded-full px-4 py-1.5 text-sm font-medium">
                <Phone className="w-4 h-4 mr-2" />
                Application Mobile
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Trouvez votre logement partout et à tout moment</h3>
              <p className="text-gray-600 text-lg">
                Notre application vous permet de rechercher, visiter et réserver des logements directement depuis votre téléphone.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: "Recherche géolocalisée",
                  description: "Trouvez les logements disponibles autour de vous avec notre système de géolocalisation précis"
                },
                {
                  title: "Gestion de visites",
                  description: "Planifiez et organisez vos visites directement depuis l'application"
                },
                {
                  title: "Communication directe",
                  description: "Discutez avec les propriétaires et posez toutes vos questions sans intermédiaire"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-[#E0252C]/10 flex items-center justify-center text-[#E0252C]">
                      <Check className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 pt-4 items-center justify-center"
              style={{ transitionDelay: '1100ms' }}
            >
              <a 
                href="https://apps.apple.com/app/locato-cameroun/id1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Télécharger sur l'App Store" 
                  className="h-12 w-auto"
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.locato.cameroun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png" 
                  alt="Disponible sur Google Play" 
                  className="h-16 w-auto"
                />
              </a>
            </div>

            {/* Section QR code avec animation de scan améliorée */}
            <div 
              className={`mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '1200ms' }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-48 h-48">
                  {/* Cadre du QR code avec effet de scan */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-3 shadow-inner">
                    {/* Image de scan stylisée */}
                    <div className="relative w-full h-full">
                      {/* QR Code de base */}
                      <div className="absolute inset-0 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://locato.cm/app')] bg-contain bg-center bg-no-repeat opacity-90"></div>
                      
                      {/* Effet de scan animé */}
                      <div className="absolute inset-0 overflow-hidden">
                        {/* Ligne de scan horizontale */}
                        <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 animate-scan"></div>
                        
                        {/* Points de repère du scan */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
                        
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-shine"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Effet de halo */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></div>
                    Application disponible
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Scannez pour télécharger</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Pointez votre appareil photo vers ce QR code pour accéder directement à l'application
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Sécurisé</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Rapide</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Vérifié</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Version 1.0.0 • Compatible iOS 13+ et Android 8.0+
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}