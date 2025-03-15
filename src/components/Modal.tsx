// src/components/Modal.tsx
import React from 'react';
import { useModalStore } from 'store/modalState';

const Modal: React.FC = () => {
  const { isOpen, content, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="text-lg mb-4">{content}</p>
        <button 
          onClick={closeModal} 
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
