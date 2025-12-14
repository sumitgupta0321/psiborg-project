import '../styles/Modal.css'

const DeleteConfirmModal = ({ productTitle, onClose, onConfirm, isLoading }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Delete</h2>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>

        <div className="modal-body">
          <p>Are you sure you want to delete this product?</p>
          <p className="delete-product-name">"{productTitle}"</p>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button" disabled={isLoading}>
            Cancel
          </button>
          <button onClick={onConfirm} className="delete-confirm-button" disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
