import React from 'react';
import './modal.css';

const Modal = ({ openPopup, setOpenPopup, onAfterConfirm }) => {
  return (
    <div
      className={'modal fade' + (openPopup ? ' show' : '')}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmation</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete friend name?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                setOpenPopup(false);
                onAfterConfirm();
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
