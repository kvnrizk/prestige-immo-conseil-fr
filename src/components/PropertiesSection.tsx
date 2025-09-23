import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';
import ScrollReveal from './ScrollReveal';

const PropertiesSection = () => {
  const [activeFilter, setActiveFilter] = useState('tous');

  const properties = [
    {
      id: 1,
      title: "Appartement moderne centre-ville",
      price: "285 000 €",
      location: "Lyon 6ème",
      type: "vente" as const,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      description: "Magnifique appartement de 85m² entièrement rénové avec goût, proche des commodités.",
      bedrooms: 3,
      area: 85
    },
    {
      id: 2,
      title: "Maison familiale avec jardin",
      price: "1 200 €/mois",
      location: "Villeurbanne",
      type: "location" as const,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      description: "Belle maison de 120m² avec jardin privatif, idéale pour une famille.",
      bedrooms: 4,
      area: 120
    },
    {
      id: 3,
      title: "Studio cosy Airbnb",
      price: "75 €/nuit",
      location: "Lyon 2ème",
      type: "saisonnier" as const,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      description: "Studio parfaitement équipé en plein cœur de Lyon, idéal pour les voyageurs d'affaires.",
      bedrooms: 1,
      area: 35
    },
    {
      id: 4,
      title: "Loft industriel",
      price: "520 000 €",
      location: "Lyon 7ème",
      type: "vente" as const,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
      description: "Loft unique de 150m² avec vue exceptionnelle, dans un quartier en pleine expansion.",
      bedrooms: 2,
      area: 150
    },
    {
      id: 5,
      title: "Appartement T3 lumineux",
      price: "950 €/mois",
      location: "Caluire-et-Cuire",
      type: "location" as const,
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=800&q=80",
      description: "T3 de 70m² avec balcon et vue dégagée, dans résidence récente avec parking.",
      bedrooms: 2,
      area: 70
    },
    {
      id: 6,
      title: "Appartement de charme",
      price: "90 €/nuit",
      location: "Lyon 5ème",
      type: "saisonnier" as const,
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=800&q=80",
      description: "Appartement de caractère dans le Vieux Lyon, décoré avec raffinement pour vos séjours.",
      bedrooms: 2,
      area: 60
    }
  ];

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
