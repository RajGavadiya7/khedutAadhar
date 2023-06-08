import React, { useState } from 'react';
// import './Modal.css';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>

      <button onClick={openModal}>Update</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Modal Content</h2>
              <p>This is the content of the modal.</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .modal {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
          }
          
          .modal-content {
            margin-bottom: 20px;
          }
          
          button {
            padding: 8px 16px;
          }

        `}
        </style>
    </div>
  );
}

export default Modal;
