/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../services/userService";
import { Loading } from "../components/common/Loading";
import { UserForm } from "../components/users/UserForm";
import useUsers from "../hooks/useUsers";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit,
} from "react-icons/fi";
import toast from "react-hot-toast";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { updateUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUser(id);
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch user details");
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateUser(id, formData);
      setUser((prev) => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loading message="Loading user details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            Error Loading User
          </h2>
          <p className="text-red-600 mb-6 p-3 bg-red-50 rounded-md">{error}</p>
          <button
            onClick={() => navigate("/users")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2 flex items-center mx-auto transition duration-200"
          >
            <FiArrowLeft className="mr-2" />
            <span>Back to Users</span>
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            User Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested user does not exist or was removed.
          </p>
          <button
            onClick={() => navigate("/users")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2 flex items-center mx-auto transition duration-200"
          >
            <FiArrowLeft className="mr-2" />
            <span>Back to Users</span>
          </button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => setIsEditing(false)}
          className="mb-6 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium rounded-lg px-4 py-2 flex items-center transition duration-200"
        >
          <FiArrowLeft className="mr-2" />
          <span>Cancel Editing</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Edit User: {user.first_name} {user.last_name}
          </h2>
          <UserForm
            user={user}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/users")}
          className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium rounded-lg px-4 py-2 flex items-center transition duration-200"
        >
          <FiArrowLeft className="mr-2" />
          <span>Back to Users</span>
        </button>

        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 flex items-center transition duration-200"
        >
          <FiEdit className="mr-2" />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
        <div className="px-6 py-8 relative">
          <div className="flex flex-col md:flex-row">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md -mt-20 mb-6 md:mb-0 md:mr-8 object-cover"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {user.first_name} {user.last_name}
              </h1>

              <div className="text-sm text-gray-500 mb-4">
                User ID: {user.id}
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <FiMail className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h3>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>

                {user.created_at && (
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <FiCalendar className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Account Created
                      </h3>
                      <p className="text-gray-900">
                        {new Date(user.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
