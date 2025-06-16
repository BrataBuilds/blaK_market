import React from 'react';
import { Heart, Eye, MapPin, Star, Clock } from 'lucide-react';
import { Service } from '../types';
import { useMarketplace } from '../contexts/MarketplaceContext';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useMarketplace();
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id);
    } else {
      addToWishlist(service.id, 'service');
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      {/* Image section */}
      {service.images && service.images.length > 0 && (
        <div className="relative">
          <img
            src={service.images[0]}
            alt={service.title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isInWishlist(service.id)
                ? 'bg-red-500 text-white'
                : 'bg-black/20 text-white hover:bg-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={isInWishlist(service.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
      )}

      <div className={`p-6 ${!service.images || service.images.length === 0 ? 'border border-gray-700 hover:border-purple-500' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {service.title}
          </h3>
          {(!service.images || service.images.length === 0) && (
            <button
              onClick={handleWishlistClick}
              className={`p-1.5 rounded-full transition-colors ${
                isInWishlist(service.id)
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
              }`}
            >
              <Heart className="w-4 h-4" fill={isInWishlist(service.id) ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-xl font-bold text-white">₹{service.price.toLocaleString()}</span>
            {service.negotiable && (
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                Negotiable
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{service.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{service.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{service.saves}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src={service.provider.avatar}
              alt={service.provider.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-300">{service.provider.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm text-gray-300">{service.provider.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;