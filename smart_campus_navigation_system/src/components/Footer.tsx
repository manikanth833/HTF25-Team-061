export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CBIT - Chaitanya Bharathi Institute of Technology
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Smart Campus Navigation System
        </p>
      </div>
    </footer>
  );
}
