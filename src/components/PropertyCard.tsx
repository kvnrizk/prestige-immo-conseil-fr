
import React from 'react';
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
  title,
  price,
  location,
  type,
  image,
  description,
  bedrooms,
  area
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vente':
        return 'bg-green-100 text-green-800';
      case 'location':
        return 'bg-blue-100 text-blue-800';
      case 'saisonnier':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
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
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600">{location}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          {bedrooms && (
            <span>{bedrooms} chambre{bedrooms > 1 ? 's' : ''}</span>
          )}
          {area && (
            <span>{area} m²</span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-600">
            {price}
          </div>
          <Button 
            onClick={handleContact}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Contacter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
