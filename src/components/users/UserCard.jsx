import { FiMail, FiEdit2, FiTrash2 } from "react-icons/fi";

export const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-200 transition-shadow hover:shadow-lg">
      <div className="p-6 flex flex-col items-center text-center flex-grow">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          {user.first_name} {user.last_name}
        </h3>
        <div className="flex items-center mt-2 text-gray-600">
          <FiMail className="mr-1" />
          <span className="text-sm">{user.email}</span>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 flex justify-center space-x-2 bg-gray-50">
        <button
          onClick={() => onEdit(user)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <FiEdit2 className="mr-1.5 h-4 w-4 text-gray-500" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          <FiTrash2 className="mr-1.5 h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
