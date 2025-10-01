import React from 'react';
import { useProperties } from '@/contexts/PropertyContext';
import { Property } from '@/data/PropertyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin, Bed, Square, Euro } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PropertiesOverviewProps {
  onSelectProperty: (property: Property) => void;
  onEditProperty: (property: Property) => void;
}

const PropertiesOverview = ({ onSelectProperty, onEditProperty }: PropertiesOverviewProps) => {
  const { properties, deleteProperty } = useProperties();
  const { toast } = useToast();

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      deleteProperty(id);
      toast({ title: "Propriété supprimée", description: `${title} a été supprimée avec succès` });
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vente': return 'Vente';
      case 'location': return 'Location';
      case 'saisonnier': return 'Saisonnier';
      default: return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'vente': return 'bg-blue-500/10 text-blue-500';
      case 'location': return 'bg-green-500/10 text-green-500';
      case 'saisonnier': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Propriétés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{properties.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">À Vendre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {properties.filter(p => p.type === 'vente').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">En Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {properties.filter(p => p.type === 'location' || p.type === 'saisonnier').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <Badge className={`absolute top-2 right-2 ${getTypeBadgeColor(property.type)}`}>
                {getTypeLabel(property.type)}
              </Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
                {property.title}
              </h3>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.location}
                </div>

                <div className="flex items-center space-x-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.area}m²
                    </div>
                  )}
                </div>

                <div className="flex items-center font-semibold text-primary">
                  <Euro className="w-4 h-4 mr-1" />
                  {property.price}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onEditProperty(property)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(property.id, property.title)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {properties.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">Aucune propriété pour le moment</p>
            <p className="text-sm mt-2">Ajoutez votre première propriété pour commencer</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PropertiesOverview;
