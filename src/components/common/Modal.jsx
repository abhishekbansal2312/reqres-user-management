import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      // Disable scroll on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      // Re-enable scroll when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className="w-full max-w-md max-h-[90vh] overflow-auto"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
