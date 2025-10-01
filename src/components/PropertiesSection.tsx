import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '@/contexts/PropertyContext';
import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';

const PropertiesSection = () => {
  const [activeFilter, setActiveFilter] = useState('tous');
  const { properties } = useProperties();

  const filteredProperties = activeFilter === 'tous' 
    ? properties 
    : properties.filter(property => property.type === activeFilter);

  const filters = [
    { key: 'tous', label: 'Tous les biens' },
    { key: 'vente', label: 'À vendre' },
    { key: 'location', label: 'À louer' },
    { key: 'saisonnier', label: 'Location court durée' }
  ];

  return (
    <section id="biens" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Découvrez nos biens immobiliers
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Une sélection de biens de qualité, rigoureusement choisis pour répondre 
            à tous vos besoins immobiliers.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200} className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              variant={activeFilter === filter.key ? "default" : "outline"}
              className={activeFilter === filter.key 
                ? "bg-foreground hover:bg-foreground/90 text-background" 
                : "border-foreground text-foreground hover:bg-foreground hover:text-background"
              }
            >
              {filter.label}
            </Button>
          ))}
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.map((property, index) => (
            <ScrollReveal key={property.id} delay={index * 100} animation="fade-in-up">
              <PropertyCard
                {...property}
              />
            </ScrollReveal>
          ))}
        </div>

        {filteredProperties.length === 0 && (
        <ScrollReveal className="text-center py-12">
          <p className="text-muted-foreground">Aucun bien ne correspond à ce filtre pour le moment.</p>
        </ScrollReveal>
        )}

        {/* Lien vers tous les biens */}
        <ScrollReveal delay={400} className="text-center mt-12">
          <Link to="/properties">
            <Button 
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background"
            >
              Voir tous nos biens
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PropertiesSection;
