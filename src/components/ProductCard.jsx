import { useNavigate } from 'react-router-dom'
import '../styles/ProductCard.css'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <div className="product-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{product.rating.rate}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
