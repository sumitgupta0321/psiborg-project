import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from '../api/products'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import '../styles/ProductListPage.css'

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={error.message} />
  }

  const categories = ['all', ...new Set(products?.map(p => p.category) || [])]

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  }) || []

  return (
    <div className="product-list-page">
      <header className="page-header">
        <div className="header-content">
          <h1>Product Catalog</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filter">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListPage
