import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-white/10 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Looks like this page went off the map.</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="focus-ring rounded-lg">
            <Button className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/events" className="focus-ring rounded-lg">
            <Button variant="glass" className="w-full sm:w-auto">
              Explore Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}