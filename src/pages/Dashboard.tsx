
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PropertiesOverview from '@/components/dashboard/PropertiesOverview';
import CalendarView from '@/components/dashboard/CalendarView';
import BookingsManagement from '@/components/dashboard/BookingsManagement';
import PropertyForm from '@/components/dashboard/PropertyForm';
import { Property } from '@/data/PropertyData';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setActiveView('add-property');
  };

  const handleAddNew = () => {
    setEditingProperty(null);
    setActiveView('add-property');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <PropertiesOverview onSelectProperty={setSelectedProperty} onEditProperty={handleEditProperty} />;
      case 'calendar':
        return <CalendarView selectedProperty={selectedProperty} />;
      case 'bookings':
        return <BookingsManagement />;
      case 'add-property':
        return <PropertyForm property={editingProperty} onSave={() => { setEditingProperty(null); setActiveView('overview'); }} onCancel={() => { setEditingProperty(null); setActiveView('overview'); }} />;
      default:
        return <PropertiesOverview onSelectProperty={setSelectedProperty} onEditProperty={handleEditProperty} />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16 flex">
        <DashboardSidebar activeView={activeView} onViewChange={setActiveView} onLogout={logout} />
        
        <div className="flex-1 p-6">
          <DashboardHeader activeView={activeView} onAddNew={handleAddNew} />
          <div className="mt-6">
            {renderActiveView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
