import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchProductById, updateProduct, deleteProduct } from '../api/products'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EditProductModal from '../components/EditProductModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import '../styles/ProductDetailPage.css'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  })

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      const mergedProduct = { ...product, ...updatedProduct }
      
      queryClient.setQueryData(['products'], (oldData) => {
        if (!oldData) return oldData
        return oldData.map(p => p.id === mergedProduct.id ? { ...p, ...updatedProduct } : p)
      })
      queryClient.setQueryData(['product', id], mergedProduct)
      setIsEditModalOpen(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.setQueryData(['products'], (oldData) => {
        if (!oldData) return oldData
        return oldData.filter(p => p.id !== parseInt(id))
      })
      navigate('/products')
    },
  })

  const handleEdit = (formData) => {
    updateMutation.mutate({ id, data: formData })
  }

  const handleDelete = () => {
    deleteMutation.mutate(id)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <button onClick={() => navigate('/products')} className="back-button">
          ← Back to Products
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-detail-info">
            <div className="product-category-badge">{product.category}</div>
            <h1 className="product-detail-title">{product.title}</h1>
            
            <div className="product-rating-section">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(product.rating.rate) ? 'star filled' : 'star'}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="rating-text">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="product-price-section">
              <span className="product-detail-price">${product.price.toFixed(2)}</span>
            </div>

            <div className="product-description-section">
              <h2>Description</h2>
              <p className="product-description">{product.description}</p>
            </div>

            <div className="product-actions">
              <button 
                onClick={() => setIsEditModalOpen(true)} 
                className="edit-button"
                disabled={updateMutation.isLoading}
              >
                {updateMutation.isLoading ? 'Updating...' : 'Edit Product'}
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(true)} 
                className="delete-button"
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>

            {updateMutation.isError && (
              <ErrorMessage message="Failed to update product. Please try again." />
            )}
            {deleteMutation.isError && (
              <ErrorMessage message="Failed to delete product. Please try again." />
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditProductModal
          product={product}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEdit}
          isLoading={updateMutation.isLoading}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          productTitle={product.title}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          isLoading={deleteMutation.isLoading}
        />
      )}
    </div>
  )
}

export default ProductDetailPage
