import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Email is invalid";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field when user types
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await login(credentials);
    if (success) {
      navigate("/users");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-8 text-white text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-blue-100 mt-2">Sign in to access your account</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
                <FiAlertCircle className="flex-shrink-0 mr-2" />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="eve.holt@reqres.in"
                  className={`w-full pl-10 pr-3 py-2 border ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="cityslicka"
                  className={`w-full pl-10 pr-3 py-2 border ${
                    validationErrors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" size={14} />
                  {validationErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 px-4 flex justify-center items-center transition duration-200"
            >
              {loading ? (
                <span className="animate-spin mr-2">⟳</span>
              ) : (
                <FiLogIn className="mr-2" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 text-center text-sm bg-gray-50 rounded-lg border border-gray-100">
            <p className="font-medium text-gray-700 mb-1">Demo credentials:</p>
            <div className="text-gray-600 flex flex-col space-y-1">
              <div className="flex items-center justify-center">
                <FiMail className="mr-2 text-gray-400" size={14} />
                <span>eve.holt@reqres.in</span>
              </div>
              <div className="flex items-center justify-center">
                <FiLock className="mr-2 text-gray-400" size={14} />
                <span>cityslicka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
