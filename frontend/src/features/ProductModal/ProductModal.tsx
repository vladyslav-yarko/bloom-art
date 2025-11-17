import { useState, useEffect } from "react";
import api from "../../../api";
import settings from "../../../config";
import { addToCart } from "../../../utils/cart";
import './ProductModal.css';

export default const ProductModal = ({ product, onClose, type, imgUrl }) => {
  if (!product) return null;
  
  const [imageUrl, setImageUrl] = useState(imgUrl || "");
  const [loading, setLoading] = useState(!imgUrl);

  useEffect(() => {
    if (!imgUrl && product.id) {
      const img_url = `${settings.apiUrl}/${type}s/get_one?id=${product.id}`;
      
      api.get(img_url, {
        responseType: 'blob'
      })
      .then(response => {
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        setLoading(false);
      });
    }
  }, [product.id, type, imgUrl]);

  const handleAddToCart = () => {
    addToCart(product.id);
    // Optional: Show success message or close modal
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'painting': return '🎨';
      case 'perfume': return '🌸';
      case 'product': return '🛍️';
      default: return '📦';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        
        {/* Image Section */}
        <div className='modal-image' style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
        }}>
          {(!imageUrl || loading) && (
            <div className="modal-image-placeholder">
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                getTypeIcon(type)
              )}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="modal-info">
          <div className="modal-header">
            <div className="modal-type-badge">
              <span>{getTypeIcon(type)}</span>
              {type}
            </div>
            <h1 className="modal-title">{product.title}</h1>
            <div className="modal-price">
              {product.price} {product.currency}
            </div>
          </div>

          {product.description && (
            <div className="modal-full-description">
              {product.description}
            </div>
          )}
          
          {/* Product Details for Paintings */}
          {type === 'painting' && (
            <div className="modal-details-grid">
              {product.width && product.height && (
                <div className="modal-detail-item">
                  <span className="modal-detail-label">📏 Dimensions:</span>
                  <span className="modal-detail-value">{product.width} x {product.height} px</span>
                </div>
              )}
              {product.weight && (
                <div className="modal-detail-item">
                  <span className="modal-detail-label">⚖️ Weight:</span>
                  <span className="modal-detail-value">{product.weight} kg</span>
                </div>
              )}
              {product.orientation && (
                <div className="modal-detail-item">
                  <span className="modal-detail-label">🖼️ Orientation:</span>
                  <span className="modal-detail-value">{product.orientation}</span>
                </div>
              )}
            </div>
          )}
          
          {/* Availability Status */}
          <div className="modal-availability">
            {product.available >= 1 ? (
              <span className="availability-badge available">
                ✅ Available
              </span>
            ) : (
              <span className="availability-badge unavailable">
                ❌ Not Available
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            {product.available >= 1 ? (
              <button 
                className="modal-btn modal-btn-primary"
                onClick={handleAddToCart}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
                Add to Cart
              </button>
            ) : (
              <button 
                className="modal-btn modal-btn-secondary"
                disabled
              >
                Out of Stock
              </button>
            )}
            
            <button 
              className="modal-btn modal-btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
