import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/re-usable/SEO';

const DashboardNotFound = () => {
  return (
    <>
      <SEO title="Page Not Found - ES Gishoma" />
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-lg mb-6 text-center">
          {"The page you're looking for doesn't exist or has been moved."}
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default DashboardNotFound;
