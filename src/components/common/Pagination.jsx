import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    // Logic to show pages with ellipsis for large number of pages
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex logic for many pages with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <nav
        className="inline-flex items-center rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className={`relative inline-flex items-center px-3 py-2 rounded-l-md border ${
            currentPage <= 1
              ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          }`}
          aria-label="Previous page"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <div className="hidden md:inline-flex">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border ${
                  currentPage === page
                    ? "z-10 border-indigo-500 bg-indigo-600 text-white font-medium"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                } transition-colors`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        <div className="md:hidden">
          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            {currentPage} of {totalPages}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`relative inline-flex items-center px-3 py-2 rounded-r-md border ${
            currentPage >= totalPages
              ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          }`}
          aria-label="Next page"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
