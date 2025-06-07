
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Square, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample property data - in a real app this would come from an API
  const properties = [
    {
      id: 1,
      title: "Appartement moderne centre-ville",
      price: "285 000 €",
      location: "Lyon 6ème",
      type: "vente" as const,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
      description: "Magnifique appartement de 85m² entièrement rénové avec goût, proche des commodités. Cet appartement bénéficie d'une exposition plein sud avec une vue dégagée. Il comprend un séjour spacieux, une cuisine équipée moderne, trois chambres dont une suite parentale avec dressing, et deux salles de bains. Le bien dispose également d'un balcon de 8m² et d'une cave. Proche métro et commerces.",
      bedrooms: 3,
      area: 85,
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Balcon 8m²", "Cave", "Exposition Sud", "Proche métro", "Cuisine équipée", "Dressing"]
    },
    {
      id: 2,
      title: "Maison familiale avec jardin",
      price: "1 200 €/mois",
      location: "Villeurbanne",
      type: "location" as const,
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
      description: "Belle maison de 120m² avec jardin privatif, idéale pour une famille. Cette maison récente propose un espace de vie généreux avec un salon-séjour de 40m², une cuisine ouverte entièrement équipée, et 4 chambres confortables. Le jardin de 300m² est parfaitement entretenu avec terrasse et barbecue. Garage et parking privé disponibles.",
      bedrooms: 4,
      area: 120,
      images: [
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Jardin 300m²", "Garage", "Terrasse", "Barbecue", "Parking privé", "Cuisine équipée"]
    },
    {
      id: 3,
      title: "Studio cosy Airbnb",
      price: "75 €/nuit",
      location: "Lyon 2ème",
      type: "saisonnier" as const,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
      description: "Studio parfaitement équipé en plein cœur de Lyon, idéal pour les voyageurs d'affaires. Situé au 3ème étage avec ascenseur, ce studio moderne offre tout le confort nécessaire avec un coin nuit, un espace de travail, une kitchenette équipée et une salle de bain moderne. Wifi haut débit et télévision inclus.",
      bedrooms: 1,
      area: 35,
      images: [
        "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1564540574859-0dfb63293365?auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Wifi haut débit", "Ascenseur", "Kitchenette", "3ème étage", "Centre-ville", "Meublé"]
    }
  ];

  const property = properties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bien non trouvé</h1>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vente':
        return 'bg-secondary text-secondary-foreground';
      case 'location':
        return 'bg-muted text-muted-foreground';
      case 'saisonnier':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vente':
        return 'À vendre';
      case 'location':
        return 'À louer';
      case 'saisonnier':
        return 'Location saisonnière';
      default:
        return type;
    }
  };

  const handleContact = () => {
    navigate('/#contact');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <Badge className={`absolute top-4 left-4 ${getTypeColor(property.type)}`}>
                  {getTypeLabel(property.type)}
                </Badge>
              </div>
              
              {property.images && property.images.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {property.images.slice(1).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${property.title} - ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.location}
                </div>
                <div className="text-3xl font-bold text-primary">
                  {property.price}
                </div>
              </div>

              {/* Property Info */}
              <div className="flex gap-6 text-sm text-muted-foreground">
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-2" />
                    {property.bedrooms} chambre{property.bedrooms > 1 ? 's' : ''}
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-2" />
                    {property.area} m²
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              {property.features && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Caractéristiques</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Intéressé par ce bien ?</h3>
                  <Button 
                    onClick={handleContact}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Contacter l'agent
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
