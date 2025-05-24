import React from 'react';

const DeleteConfirmationModal = ({ show, onHide, onConfirm, currencyName }) => {
    if (!show) return null;

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete {currencyName ? `"${currencyName}"` : 'this currency'}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;