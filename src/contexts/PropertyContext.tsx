import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { properties as initialProperties, Property } from '@/data/PropertyData';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: number, property: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const stored = localStorage.getItem('properties');
    return stored ? JSON.parse(stored) : initialProperties;
  });

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = {
      ...property,
      id: Math.max(0, ...properties.map(p => p.id)) + 1
    };
    setProperties([...properties, newProperty]);
  };

  const updateProperty = (id: number, updatedData: Partial<Property>) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, ...updatedData } : p
    ));
  };

  const deleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('useProperties must be used within PropertyProvider');
  return context;
};
