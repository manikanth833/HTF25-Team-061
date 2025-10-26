import { useState, useEffect } from 'react';
import { Home, Navigation as NavigationIcon, AlertCircle } from 'lucide-react';
import { Location } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import NavigationPage from './components/NavigationPage';
import EmergencyPage from './components/EmergencyPage';

type Page = 'home' | 'navigation' | 'emergency';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load locations from JSON file
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await fetch('/locations.json');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error loading locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  // Navigation handler
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  // Get current page title
  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'Home';
      case 'navigation':
        return 'Navigation';
      case 'emergency':
        return 'Emergency Services';
      default:
        return 'Home';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage={getPageTitle()} />

      {/* Navigation Tabs - Visible on all pages */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <button
              onClick={() => handleNavigate('home')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => handleNavigate('navigation')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                currentPage === 'navigation'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <NavigationIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Navigation</span>
            </button>
            <button
              onClick={() => handleNavigate('emergency')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                currentPage === 'emergency'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Emergency</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading campus data...</p>
          </div>
        </div>
      ) : (
        <>
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'navigation' && <NavigationPage locations={locations} />}
          {currentPage === 'emergency' && <EmergencyPage locations={locations} />}
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
