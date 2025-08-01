// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4">Trust in Lawise</h2>
        <p className="mb-4">
          At Lawise, we believe that every individual deserves justice. Trust our team to guide you through
          the legal landscape with expertise and compassion.
        </p>
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
