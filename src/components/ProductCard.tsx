import React from 'react';
import { Heart, Eye, MapPin, Star } from 'lucide-react';
import { Product } from '../types';
import { useMarketplace } from '../contexts/MarketplaceContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useMarketplace();
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id, 'product');
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-400';
      case 'like-new': return 'text-green-300';
      case 'good': return 'text-yellow-400';
      case 'fair': return 'text-orange-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
            isInWishlist(product.id)
              ? 'bg-red-500 text-white'
              : 'bg-black/20 text-white hover:bg-red-500'
          }`}
        >
          <Heart className="w-4 h-4" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getConditionColor(product.condition)} bg-black/50 backdrop-blur-sm`}>
            {product.condition}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold text-white">₹{product.price.toLocaleString()}</span>
            {product.negotiable && (
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                Negotiable
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{product.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{product.saves}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={product.seller.avatar}
              alt={product.seller.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-300">{product.seller.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm text-gray-300">{product.seller.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;