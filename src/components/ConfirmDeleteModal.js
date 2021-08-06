import React from 'react'
const ConfirmDeleteModal = ({ handleClose, show, action }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <p>Are you sure you want to delete? </p>
          <button type="button" onClick = {action}>
            Delete
          </button>
          <button onClick={handleClose}>Nevermind</button>
        </section>
      </div>
    );
  };

export default ConfirmDeleteModal