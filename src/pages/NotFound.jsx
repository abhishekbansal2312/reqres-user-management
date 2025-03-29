import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-8 btn-primary flex items-center"
      >
        <FiArrowLeft className="mr-2" />
        <span>Go Back</span>
      </button>
    </div>
  );
};

export default NotFound;
