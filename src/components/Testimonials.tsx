import { useInView } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Locataire",
    content: "J'ai trouvé mon appartement en moins d'une semaine ! Le processus était si simple et intuitif.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop",
    rating: 5
  },
  {
    name: "Thomas Martin",
    role: "Propriétaire",
    content: "Locato m'a permis de trouver des locataires sérieux très rapidement. Je recommande à tous les propriétaires.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop",
    rating: 5
  },
  {
    name: "Sophie Laurent",
    role: "Locataire",
    content: "Les filtres de recherche sont très précis, j'ai pu trouver exactement ce que je cherchais dans mon quartier préféré.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
    rating: 5
  }
];

export function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div ref={ref} className={cn(
          "transition-all duration-700 transform",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-gray-600 text-lg">
              Découvrez les expériences de locataires et propriétaires qui utilisent Locato
            </p>
          </div>
          
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true,
              }}
              speed={800}
              loop={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              className="testimonials-slider"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl transform transition-transform group-hover:scale-105"></div>
                    <div className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                      <Quote className="w-8 h-8 text-primary/20 mb-6" />
                      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                          />
                          <div className="ml-4">
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <div className="swiper-button-prev !w-12 !h-12 !bg-white !rounded-full !shadow-lg !text-primary hover:!bg-primary hover:!text-white transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </div>
            <div className="swiper-button-next !w-12 !h-12 !bg-white !rounded-full !shadow-lg !text-primary hover:!bg-primary hover:!text-white transition-colors">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
