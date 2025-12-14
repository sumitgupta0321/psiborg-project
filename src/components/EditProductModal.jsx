import { useState } from 'react'
import '../styles/Modal.css'

const EditProductModal = ({ product, onClose, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Product</h2>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="save-button" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductModal
