import React from 'react';

const Modal = ({ title, onSubmit, onClose, children }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e.target);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {children}
          <input type="submit" value="Submit" />
        </form>
        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
