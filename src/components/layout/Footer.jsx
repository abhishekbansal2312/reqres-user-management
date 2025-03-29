export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} EmployWise User Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
