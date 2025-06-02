import { Link } from 'react-router-dom';
import { FaceFrownIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 p-4 cursor-wchat">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20 text-center">
        <div className="px-10 py-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mb-4">
            <FaceFrownIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
          <p className="text-white/80 mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cursor-wchat {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E"), auto;
        }
      `}</style>
    </div>
  );
}