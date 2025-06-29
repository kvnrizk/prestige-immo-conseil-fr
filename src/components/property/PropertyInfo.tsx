
import React from 'react';
import { MapPin, Bed, Square } from 'lucide-react';
import { Property } from '@/data/PropertyData';

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  return (
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
    </div>
  );
};

export default PropertyInfo;
