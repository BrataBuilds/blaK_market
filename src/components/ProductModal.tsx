import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Share2, Flag, MessageCircle, MapPin, Calendar, Eye, Star, Shield } from 'lucide-react';
import { Product } from '../types';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onContactSeller: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onContactSeller }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist, products } = useMarketplace();
  const { user } = useAuth();

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleWishlistClick = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id, 'product');
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-400 bg-green-400/10';
      case 'like-new': return 'text-green-300 bg-green-300/10';
      case 'good': return 'text-yellow-400 bg-yellow-400/10';
      case 'used': return 'text-orange-400 bg-orange-400/10';
      case 'for-parts': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const similarProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white truncate">{product.title}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleWishlistClick}
              className={`p-2 rounded-lg transition-colors ${
                isInWishlist(product.id)
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
              }`}
            >
              <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <Flag className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-purple-500' : 'border-gray-600'
                    }`}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price and Condition */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-white">₹{product.price.toLocaleString()}</span>
                  {product.negotiable && (
                    <span className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">
                      Negotiable
                    </span>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getConditionColor(product.condition)}`}>
                  {product.condition.replace('-', ' ')}
                </span>
              </div>
              <div className="text-right text-sm text-gray-400">
                <div className="flex items-center space-x-1 mb-1">
                  <Eye className="w-4 h-4" />
                  <span>{product.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{product.saves} saves</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <div className="text-gray-300">
                {showFullDescription ? (
                  <p className="whitespace-pre-wrap">{product.description}</p>
                ) : (
                  <p className="line-clamp-3">{product.description}</p>
                )}
                {product.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-purple-400 hover:text-purple-300 text-sm mt-2"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-gray-700">
                      <span className="text-gray-400 capitalize">{key.replace('_', ' ')}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location and Date */}
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{product.location.address}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Posted {new Date(product.datePosted).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Seller Information</h3>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-white">{product.seller.name}</h4>
                    {product.seller.verified && (
                      <Shield className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span>{product.seller.rating.toFixed(1)} ({product.seller.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Member since {new Date(product.seller.joinedDate).getFullYear()}</p>
                <p>{product.seller.department} • Semester {product.seller.semester}</p>
                {product.seller.averageResponseTime && (
                  <p>Usually responds within {product.seller.averageResponseTime} minutes</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {user?.id !== product.sellerId && (
              <div className="flex space-x-3">
                <button
                  onClick={onContactSeller}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Seller</span>
                </button>
                <button className="px-6 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-lg transition-colors">
                  Make Offer
                </button>
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="border-t border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Similar Items</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((similarProduct) => (
                <div key={similarProduct.id} className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors cursor-pointer">
                  <img
                    src={similarProduct.images[0]}
                    alt={similarProduct.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-white line-clamp-2 mb-1">
                      {similarProduct.title}
                    </h4>
                    <p className="text-lg font-bold text-white">₹{similarProduct.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;