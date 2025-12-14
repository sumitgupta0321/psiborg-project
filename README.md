# psiborg-project

A modern, high-performance React application for browsing and managing products from the Fake Store API.

## Features

### ✅ Core Functionality

- **User Authentication**: Simple login system with session persistence
  - Username: `user`
  - Password: `password`
  - Session persists across page reloads

- **Product List View**: 
  - Beautiful 3-column grid layout with product cards
  - Each card displays: image, title, price, category, and rating
  - Responsive design that adapts to different screen sizes

- **Product Detail Page**:
  - Separate route for detailed product information
  - Complete product description and rating details
  - Edit and delete functionality

- **Product Management**:
  - **Edit Products**: Update product title, price, description, and category
  - **Delete Products**: Remove products with confirmation modal
  - Automatic cache updates after mutations

- **Search & Filter**:
  - Real-time search across product titles and descriptions
  - Filter products by category
  - Dynamic category list based on available products

### 🚀 Technical Features

- **React Query Integration**:
  - Intelligent caching of API responses
  - Automatic data revalidation on window focus
  - Optimistic UI updates
  - Efficient cache invalidation

- **State Management**:
  - React Query for server state
  - Context API for authentication
  - Session storage for login persistence

- **Performance Optimizations**:
  - Minimal re-renders
  - Efficient component structure
  - Lazy loading ready architecture

- **Beautiful UI/UX**:
  - Modern gradient design
  - Smooth animations and transitions
  - Loading states with spinners
  - User-friendly error messages
  - Fully responsive design

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Fake Store API** - Product data source
- **CSS3** - Styling with modern features

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd psiborg
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

### Login Credentials

- **Username**: `user`
- **Password**: `password`

## Project Structure

```
psiborg/
├── src/
│   ├── api/
│   │   └── products.js          # API functions
│   ├── components/
│   │   ├── ProductCard.jsx      # Product card component
│   │   ├── EditProductModal.jsx # Edit modal
│   │   ├── DeleteConfirmModal.jsx # Delete confirmation
│   │   ├── LoadingSpinner.jsx   # Loading state
│   │   └── ErrorMessage.jsx     # Error display
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context
│   ├── pages/
│   │   ├── LoginPage.jsx        # Login page
│   │   ├── ProductListPage.jsx  # Product list
│   │   └── ProductDetailPage.jsx # Product details
│   ├── styles/
│   │   ├── LoginPage.css
│   │   ├── ProductListPage.css
│   │   ├── ProductCard.css
│   │   ├── ProductDetailPage.css
│   │   ├── Modal.css
│   │   ├── LoadingSpinner.css
│   │   └── ErrorMessage.css
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── package.json
└── vite.config.js
```

## Features Implementation

### Authentication
- Simple static authentication with username/password validation
- Session storage for persistent login state
- Protected routes that redirect to login if not authenticated

### Data Fetching
- React Query configured with:
  - 5-minute stale time
  - 10-minute cache time
  - Automatic refetch on window focus
  - Retry logic for failed requests

### Product Operations
- **View**: Browse all products in a grid layout
- **Search**: Filter products by title or description
- **Filter**: Filter by category
- **Edit**: Update product details with optimistic updates
- **Delete**: Remove products with confirmation

### Cache Management
- Automatic cache updates after mutations
- No manual full list re-fetch required
- Efficient state synchronization

## API Endpoints Used

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Responsive Design

The application is fully responsive with breakpoints for:
- Desktop (1200px+): 3-column grid
- Tablet (768px-1199px): 2-column grid
- Mobile (<768px): 1-column grid

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Fast initial load with Vite
- Efficient re-renders with React Query
- Optimized bundle size
- Smooth animations and transitions

## Future Enhancements

- Pagination or infinite scroll for large datasets
- Advanced filtering options
- Product comparison feature
- Shopping cart functionality
- User preferences and favorites

## License

MIT

## Author

Built as a React JS assignment demonstrating modern React patterns and best practices.
