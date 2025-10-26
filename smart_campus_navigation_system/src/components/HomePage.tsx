import { Navigation, AlertCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-gray-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Smart Campus Navigation System
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-2xl mx-auto">
            Navigate easily within the CBIT campus
          </p>
          <p className="text-sm sm:text-base text-gray-300 mt-4 max-w-xl mx-auto">
            Find your way to any building, check emergency locations, and explore the campus with interactive maps
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={() => onNavigate('navigation')}
            className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Navigation className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            Start Navigation
          </button>

          <button
            onClick={() => onNavigate('emergency')}
            className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <AlertCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            Emergency Help
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <div className="text-blue-300 text-3xl mb-2">📍</div>
            <h3 className="text-white font-semibold text-lg mb-2">Interactive Maps</h3>
            <p className="text-gray-300 text-sm">
              Explore campus with detailed interactive maps and building locations
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <div className="text-blue-300 text-3xl mb-2">🚶</div>
            <h3 className="text-white font-semibold text-lg mb-2">Route Planning</h3>
            <p className="text-gray-300 text-sm">
              Get walking directions with distance and time estimates
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <div className="text-red-300 text-3xl mb-2">🚨</div>
            <h3 className="text-white font-semibold text-lg mb-2">Emergency Access</h3>
            <p className="text-gray-300 text-sm">
              Quick access to medical room, security, and admin offices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
