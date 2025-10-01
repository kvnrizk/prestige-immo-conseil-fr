import React, { useState, useEffect } from 'react';
import { useProperties } from '@/contexts/PropertyContext';
import { Property } from '@/data/PropertyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PropertyFormProps {
  property?: Property | null;
  onSave: () => void;
  onCancel: () => void;
}

const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const { addProperty, updateProperty } = useProperties();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'vente' as 'vente' | 'location' | 'saisonnier',
    bedrooms: '',
    area: '',
    price: '',
    description: '',
    image: '',
    features: ''
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        type: property.type,
        bedrooms: property.bedrooms?.toString() || '',
        area: property.area?.toString() || '',
        price: property.price,
        description: property.description,
        image: property.image,
        features: property.features?.join(', ') || ''
      });
    }
  }, [property]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.price || !formData.description) {
      toast({ 
        title: "Erreur", 
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const propertyData = {
      title: formData.title,
      location: formData.location,
      type: formData.type,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      area: formData.area ? parseInt(formData.area) : undefined,
      price: formData.price,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    if (property) {
      updateProperty(property.id, propertyData);
      toast({ title: "Propriété mise à jour", description: `${formData.title} a été modifiée avec succès` });
    } else {
      addProperty(propertyData);
      toast({ title: "Propriété ajoutée", description: `${formData.title} a été ajoutée avec succès` });
    }

    onSave();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          {property ? 'Modifier la propriété' : 'Ajouter une nouvelle propriété'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Appartement moderne centre-ville"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Emplacement *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Lyon 6ème"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vente">Vente</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="saisonnier">Saisonnier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="285 000 € ou 1 200 €/mois"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Chambres</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleChange('bedrooms', e.target.value)}
                placeholder="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Surface (m²)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                placeholder="85"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de l'image</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Description détaillée de la propriété..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Caractéristiques (séparées par des virgules)</Label>
            <Input
              id="features"
              value={formData.features}
              onChange={(e) => handleChange('features', e.target.value)}
              placeholder="Balcon, Cave, Parking, ..."
            />
          </div>

          <div className="flex space-x-3 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {property ? 'Mettre à jour' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
