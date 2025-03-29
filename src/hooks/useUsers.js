import { useState, useCallback } from "react";
import { getUsers, updateUser, deleteUser } from "../services/userService";
import toast from "react-hot-toast";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 1,
    per_page: 6,
    total: 0,
  });

  const fetchUsers = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers(page);
      setUsers(data.data);
      setPagination({
        page: data.page,
        total_pages: data.total_pages,
        per_page: data.per_page,
        total: data.total,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch users");
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserData = async (id, userData) => {
    try {
      setLoading(true);
      const updatedUser = await updateUser(id, userData);

      // Update the local state with the updated user
      setUsers(
        users.map((user) => (user.id === id ? { ...user, ...userData } : user))
      );

      return updatedUser;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to update user";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    try {
      setLoading(true);
      await deleteUser(id);

      // Remove the user from the local state
      setUsers(users.filter((user) => user.id !== id));

      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete user";
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    pagination,
    fetchUsers,
    updateUser: updateUserData,
    deleteUser: removeUser,
  };
};

export default useUsers;
