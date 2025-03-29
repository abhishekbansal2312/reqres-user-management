import { useState, useEffect } from "react";
import { UserCard } from "../components/users/UserCard";
import { UserForm } from "../components/users/UserForm";
import { UserSearch } from "../components/users/UserSearch";
import { Pagination } from "../components/common/Pagination";
import { Modal } from "../components/common/Modal";
import { Loading } from "../components/common/Loading";
import useUsers from "../hooks/useUsers";
import { FiPlusCircle, FiRefreshCw, FiSearch, FiUsers } from "react-icons/fi";
import toast from "react-hot-toast";

const Users = () => {
  const { users, loading, pagination, fetchUsers, updateUser, deleteUser } =
    useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  useEffect(() => {
    // Reset filtered users when original users change
    if (!searching) {
      setFilteredUsers(users);
    }
  }, [users, searching]);

  const handlePageChange = (page) => {
    fetchUsers(page);
    // Reset search when changing pages
    setSearching(false);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      await updateUser(currentUser.id, formData);
      setIsModalOpen(false);
      setCurrentUser(null);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDelete = (userId) => {
    setConfirmDelete(userId);
  };

  const confirmUserDelete = async () => {
    if (confirmDelete) {
      const success = await deleteUser(confirmDelete);
      if (success) {
        setConfirmDelete(null);
        toast.success("User deleted successfully");
      }
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearching(false);
      setFilteredUsers(users);
      return;
    }

    setSearching(true);
    const lowercaseQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(lowercaseQuery) ||
        user.last_name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery)
    );

    setFilteredUsers(filtered);

    if (filtered.length === 0) {
      toast.error(`No users found matching "${query}"`);
    } else {
      toast.success(`Found ${filtered.length} user(s) matching "${query}"`);
    }
  };

  const handleRefresh = () => {
    fetchUsers(pagination.page);
    setSearching(false);
    toast.success("User list refreshed");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiUsers className="mr-2 text-blue-600" />
          Users Management
        </h1>
        <button
          onClick={handleRefresh}
          className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-600 font-medium rounded-lg px-4 py-2 flex items-center transition duration-200"
        >
          <FiRefreshCw className="mr-2" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <UserSearch onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading message="Loading users..." />
        </div>
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow text-center py-12">
              <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">
                No users found
              </h3>
              <p className="text-gray-500 mt-2">
                Try a different search or refresh the list
              </p>
              <button
                onClick={handleRefresh}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 flex items-center mx-auto transition duration-200"
              >
                <FiRefreshCw className="mr-2" />
                <span>Refresh List</span>
              </button>
            </div>
          )}

          {!searching && filteredUsers.length > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.total_pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {/* Edit User Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm
          user={currentUser}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Delete
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setConfirmDelete(null)}
              className="bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 font-medium rounded-lg px-4 py-2 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmUserDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 transition duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
