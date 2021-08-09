import React from 'react'
const ConfirmDeleteModal = ({ handleClose, show, action, type }) => {
  // action is what to do when user presses delete
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName} >
        <section className="modal-main form centered">
          <div>Are you sure you want to delete this {type}? </div>
          <p>Deleting this {type} will remove all of its data</p>
          <button type="button" onClick = {action} className = 'button delete-button' >
            Delete
          </button>
          <button onClick={handleClose} className = 'button cta'>Nevermind</button>
        </section>
      </div>
    );
  };

export default ConfirmDeleteModal