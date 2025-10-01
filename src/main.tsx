import { createRoot } from 'react-dom/client';
import { PropertyProvider } from './contexts/PropertyContext';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <PropertyProvider>
      <App />
    </PropertyProvider>
  </AuthProvider>
);
