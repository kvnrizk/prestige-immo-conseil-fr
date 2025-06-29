
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/data/PropertyData';

interface PropertyImagesProps {
  property: Property;
  getTypeColor: (type: string) => string;
  getTypeLabel: (type: string) => string;
}

const PropertyImages: React.FC<PropertyImagesProps> = ({ 
  property, 
  getTypeColor, 
  getTypeLabel 
}) => {
  return (
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
  );
};

export default PropertyImages;
