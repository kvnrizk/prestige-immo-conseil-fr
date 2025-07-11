
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  id: number;
  title: string;
  price: string;
  location: string;
  type: 'vente' | 'location' | 'saisonnier';
  image: string;
  description: string;
  bedrooms?: number;
  area?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  location,
  type,
  image,
  description,
  bedrooms,
  area
}) => {
  const navigate = useNavigate();

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

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/contact');
  };

  const handleViewDetails = () => {
    navigate(`/property/${id}`);
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-4 left-4 ${getTypeColor(type)}`}>
          {getTypeLabel(type)}
        </Badge>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground">{location}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          {bedrooms && (
            <span>{bedrooms} chambre{bedrooms > 1 ? 's' : ''}</span>
          )}
          {area && (
            <span>{area} m²</span>
          )}
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center gap-3">
          <div className="text-2xl font-bold text-primary">
            {price}
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleContact}
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contacter
            </Button>
            <Button 
              onClick={handleViewDetails}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Voir plus
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
