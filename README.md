# EmployWise User Management

A professional React application that integrates with the Reqres API to perform user management functions including authentication, listing users, and performing CRUD operations.

## 🌟 Features

- **Authentication System**
  - Secure login with JWT token storage
  - Protected routes with authentication guards
- **User Management**
  - View paginated list of users with responsive card design
  - Edit user information with form validation
  - Delete users with confirmation dialog
  - Search and filter capabilities
- **Modern UI/UX**
  - Responsive design for all screen sizes
  - Professional styling with Tailwind CSS
  - Intuitive navigation and user feedback
  - Loading states and error handling

## 🚀 Live

[Click Here](https://reqres-user-management-alpha.vercel.app)

## 📋 Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/abhishekbansal2312/reqres-user-management.git
```

2. Navigate to the project directory:

```bash
cd reqres-user-management
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:5173
```

## 🔑 API Integration

This application uses the Reqres API for all data operations:

- **Authentication**: `POST /api/login`
- **Fetch Users**: `GET /api/users?page=1`
- **Update User**: `PUT /api/users/{id}`
- **Delete User**: `DELETE /api/users/{id}`

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Loading.jsx
│   │   ├── Modal.jsx
│   │   └── Pagination.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── users/
│       ├── UserCard.jsx
│       ├── UserForm.jsx
│       └── UserSearch.jsx
├── contexts/
│   └── AuthContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useUsers.js
├── pages/
│   ├── Login.jsx
│   ├── Users.jsx
│   ├── UserDetails.jsx
│   └── NotFound.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   └── userService.js
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
├── App.jsx
└── main.jsx
```

## 💻 Technologies Used

- **Frontend Framework**: React 19
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Form Handling**: Custom hooks with validation
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Build Tool**: Vite 6

## 🔐 Authentication

To log in to the application, use the following credentials:

- **Email**: eve.holt@reqres.in
- **Password**: cityslicka

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- Desktop
- Tablet
- Mobile devices

## 📝 Development Notes

**State Management**

- React Context API is used for global authentication state
- Custom hooks for user data management
- Local component state is used for UI elements and form handling

**API Handling**

- All API requests are centralized in the services directory
- Error handling and loading states are implemented consistently

**Optimizations**

- Vite for fast development and optimized builds
- Lazy loading of components for better performance
- Debounced search functionality to minimize API calls

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Abhishek Bansal - [GitHub Profile](https://github.com/abhishekbansal2312)

## 🙏 Acknowledgements

- Reqres API for providing the backend service
- Tailwind CSS for the styling framework
- React Icons for the icon library
- Vite for the build tooling
