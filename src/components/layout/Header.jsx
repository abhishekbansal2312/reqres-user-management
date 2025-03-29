import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUsers } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

// Header Component
export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1
              onClick={() => navigate("/")}
              className="text-xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-700 transition-colors"
            >
              EmployWise
            </h1>
          </div>

          {isAuthenticated() && (
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate("/users")}
                className="flex items-center text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                <FiUsers className="mr-2 h-4 w-4" />
                <span>Users</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 font-medium transition-colors"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Footer Component
