import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import the AuthProvider
import { AuthProvider } from './components/Context/AuthContext.tsx'
createRoot(document.getElementById('root')!).render(
    <AuthProvider> 
      <App />
    </AuthProvider>
);
