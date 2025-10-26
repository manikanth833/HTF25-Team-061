import { MapPin } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 mr-2" />
            <div>
              <h1 className="text-xl font-bold">CBIT Navigator</h1>
              <p className="text-xs text-blue-100">Smart Campus Navigation</p>
            </div>
          </div>
          <div className="text-sm font-medium">
            {currentPage}
          </div>
        </div>
      </div>
    </nav>
  );
}
