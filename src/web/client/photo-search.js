// photo-search.js - Client side photo-based product search
import React, { useState, useRef, useEffect } from 'react';

const PhotoSearch = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [activeView, setActiveView] = useState('upload'); // upload, results, product-detail
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // API endpoints (adjust according to your backend)
  const API_ENDPOINTS = {
    PHOTO_SEARCH: '/api/client/photo-search',
    PRODUCTS: '/api/products',
    FAVORITES: '/api/client/favorites'
  };

  // Handle image upload from file
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          data: e.target.result,
          file: file,
          name: file.name
        });
        setShowResults(false);
        setActiveView('upload');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  // Handle camera capture
  const handleCameraCapture = async () => {
    try {
      // For mobile devices - directly open camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        fileInputRef.current.setAttribute('capture', 'camera');
        fileInputRef.current.click();
      } else {
        // Fallback to file input
        fileInputRef.current.click();
      }
    } catch (error) {
      console.error('Camera access error:', error);
      fileInputRef.current.click();
    }
  };

  // Search for similar products using uploaded image
  const handlePhotoSearch = async () => {
    if (!selectedImage) return;
    
    setIsSearching(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage.file);
      formData.append('searchType', 'pattern_similarity');
      
      const response = await fetch(API_ENDPOINTS.PHOTO_SEARCH, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        }
      });
      
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results.products || []);
        setShowResults(true);
        setActiveView('results');
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.error('Photo search error:', error);
      // Fallback to mock data for demo
      setSearchResults(getMockResults());
      setShowResults(true);
      setActiveView('results');
    } finally {
      setIsSearching(false);
    }
  };

  // Mock data for development/demo
  const getMockResults = () => [
    {
      id: 1,
      title: "Handmade Madhubani Painting",
      seller: "Priya Devi",
      sellerId: "seller_123",
      location: "Madhubani, Bihar",
      price: 1250,
      originalPrice: 1800,
      currency: "₹",
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      similarity: 95,
      tags: ["Traditional", "Handmade", "Madhubani"],
      description: "Authentic Madhubani art made with natural colors and traditional techniques.",
      deliveryTime: "5-7 days",
      inStock: true,
      category: "Wall Art",
      materials: "Natural pigments, handmade paper"
    },
    {
      id: 2,
      title: "Warli Pattern Handwoven Fabric",
      seller: "Ramesh Patil",
      sellerId: "seller_456",
      location: "Thane, Maharashtra",
      price: 890,
      originalPrice: 1200,
      currency: "₹",
      rating: 4.6,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop",
      similarity: 87,
      tags: ["Warli", "Tribal", "Handwoven"],
      description: "Traditional Warli pattern handwoven fabric, perfect for home decor.",
      deliveryTime: "3-5 days",
      inStock: true,
      category: "Textiles",
      materials: "Cotton, natural dyes"
    }
  ];

  // Clear uploaded image
  const handleClearImage = () => {
    setSelectedImage(null);
    setShowResults(false);
    setSearchResults([]);
    setActiveView('upload');
  };

  // Toggle favorite product
  const toggleFavorite = async (productId) => {
    try {
      const method = favorites.includes(productId) ? 'DELETE' : 'POST';
      const response = await fetch(`${API_ENDPOINTS.FAVORITES}/${productId}`, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setFavorites(prev => 
          prev.includes(productId) 
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
      // Fallback to local state
      setFavorites(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
    }
  };

  // Handle product click
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
  };

  // Navigation functions
  const handleBackToResults = () => {
    setActiveView('results');
    setSelectedProduct(null);
  };

  const handleBackToUpload = () => {
    setActiveView('upload');
    setShowResults(false);
  };

  // Contact seller
  const handleContactSeller = (sellerId) => {
    // Redirect to messaging or contact form
    window.location.href = `/client/messages?seller=${sellerId}`;
  };

  // Add to cart
  const handleAddToCart = async (product) => {
    try {
      const response = await fetch('/api/client/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          sellerId: product.sellerId
        })
      });

      if (response.ok) {
        alert('Product added to cart!');
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add product to cart');
    }
  };

  // Load user favorites on component mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FAVORITES, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites || []);
        }
      } catch (error) {
        console.error('Load favorites error:', error);
      }
    };

    loadFavorites();
  }, []);

  return {
    // State
    selectedImage,
    isSearching,
    searchResults,
    showResults,
    activeView,
    selectedProduct,
    favorites,
    isLoading,
    
    // Actions
    handleImageUpload,
    handleCameraCapture,
    handlePhotoSearch,
    handleClearImage,
    toggleFavorite,
    handleProductClick,
    handleBackToResults,
    handleBackToUpload,
    handleContactSeller,
    handleAddToCart,
    
    // Refs
    fileInputRef
  };
};

// Export the hook
export default PhotoSearch;

// Also export a ready-to-use component
export const PhotoSearchComponent = () => {
  const {
    selectedImage,
    isSearching,
    searchResults,
    showResults,
    activeView,
    selectedProduct,
    favorites,
    handleImageUpload,
    handleCameraCapture,
    handlePhotoSearch,
    handleClearImage,
    toggleFavorite,
    handleProductClick,
    handleBackToResults,
    handleBackToUpload,
    handleContactSeller,
    handleAddToCart,
    fileInputRef
  } = PhotoSearch();

  // Upload View JSX
  const UploadView = () => (
    <div className="photo-search-upload">
      <div className="upload-header">
        <h1>Find Similar Designs</h1>
        <p>Upload a photo to discover products with similar patterns and styles</p>
      </div>

      {!selectedImage ? (
        <div className="upload-area">
          <div className="upload-buttons">
            <button onClick={handleCameraCapture} className="camera-btn">
              <span className="icon">📷</span>
              <span>Camera</span>
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="upload-btn">
              <span className="icon">📁</span>
              <span>Upload</span>
            </button>
          </div>
          <p>Take a photo or choose from gallery</p>
        </div>
      ) : (
        <div className="image-preview">
          <div className="selected-image">
            <img src={selectedImage.data} alt="Selected" />
            <button onClick={handleClearImage} className="clear-btn">×</button>
          </div>
          <button 
            onClick={handlePhotoSearch}
            disabled={isSearching}
            className="search-btn"
          >
            {isSearching ? 'Searching...' : 'Find Similar Products'}
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );

  // Results View JSX
  const ResultsView = () => (
    <div className="photo-search-results">
      <div className="results-header">
        <button onClick={handleBackToUpload}>← Back</button>
        <h2>Similar Products Found ({searchResults.length})</h2>
        <button className="filter-btn">Filter</button>
      </div>

      <div className="results-grid">
        {searchResults.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.title} onClick={() => handleProductClick(product)} />
              <div className="similarity-badge">{product.similarity}% match</div>
              <button 
                onClick={() => toggleFavorite(product.id)}
                className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
              >
                ♥
              </button>
            </div>
            
            <div className="product-info">
              <h3 onClick={() => handleProductClick(product)}>{product.title}</h3>
              <p>by {product.seller} • {product.location}</p>
              <div className="rating">⭐ {product.rating} ({product.reviews})</div>
              <div className="price">
                {product.currency}{product.price}
                {product.originalPrice && (
                  <span className="original-price">{product.currency}{product.originalPrice}</span>
                )}
              </div>
              <div className="tags">
                {product.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <div className="actions">
                <button onClick={() => handleContactSeller(product.sellerId)}>Contact</button>
                <button onClick={() => handleProductClick(product)}>Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Product Detail View JSX
  const ProductDetailView = () => (
    <div className="product-detail">
      <div className="detail-header">
        <button onClick={handleBackToResults}>← Back to Results</button>
        <div className="actions">
          <button onClick={() => toggleFavorite(selectedProduct.id)}>♥</button>
          <button>Share</button>
        </div>
      </div>

      <div className="detail-content">
        <div className="product-image">
          <img src={selectedProduct.image} alt={selectedProduct.title} />
        </div>

        <div className="product-details">
          <h1>{selectedProduct.title}</h1>
          <p>by {selectedProduct.seller} • {selectedProduct.location}</p>
          <div className="rating">⭐ {selectedProduct.rating} ({selectedProduct.reviews} reviews)</div>
          <div className="price">
            {selectedProduct.currency}{selectedProduct.price}
            {selectedProduct.originalPrice && (
              <span className="original-price">{selectedProduct.currency}{selectedProduct.originalPrice}</span>
            )}
          </div>
          
          <p className="description">{selectedProduct.description}</p>
          
          <div className="product-specs">
            <div>Delivery: {selectedProduct.deliveryTime}</div>
            <div>Stock: {selectedProduct.inStock ? 'Available' : 'Out of Stock'}</div>
            <div>Category: {selectedProduct.category}</div>
            <div>Materials: {selectedProduct.materials}</div>
          </div>

          <div className="tags">
            {selectedProduct.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          <div className="action-buttons">
            <button onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
            <button onClick={() => handleContactSeller(selectedProduct.sellerId)}>Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="photo-search-container">
      {activeView === 'upload' && <UploadView />}
      {activeView === 'results' && <ResultsView />}
      {activeView === 'product-detail' && selectedProduct && <ProductDetailView />}
    </div>
  );
};