import React, { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero images - using high-quality real estate images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
      title: "Luxury Living",
      subtitle: "Découvrez l'excellence immobilière parisienne"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
      title: "Modern Architecture",
      subtitle: "Des biens d'exception dans les plus beaux quartiers"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80",
      title: "Prestigious Properties",
      subtitle: "Votre projet immobilier entre de bonnes mains"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
      title: "Dream Homes",
      subtitle: "L'expertise au service de vos ambitions"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden -mt-16"
    >
      <Carousel 
        setApi={setApi}
        className="h-full w-full"
        opts={{
          loop: true,
          duration: 30,
        }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 
                      className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-300 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                    >
                      {image.title}
                    </h1>
                    <p 
                      className={`text-xl md:text-2xl mb-8 transition-all duration-1000 delay-500 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                    >
                      {image.subtitle}
                    </p>
                    <div 
                      className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                    >
                      <Button 
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        Découvrir nos biens
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-medium transition-all"
                      >
                        Nous contacter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 text-white hover:bg-black/40 border-0 h-12 w-12 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 text-white hover:bg-black/40 border-0 h-12 w-12 rounded-full backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </Carousel>

      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index + 1
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 text-white/80 text-sm animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-8 bg-white/50" />
          <span className="text-xs uppercase tracking-wider">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;