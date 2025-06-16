import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Share2, Flag, MessageCircle, MapPin, Clock, Eye, Star, Shield } from 'lucide-react';
import { Service } from '../types';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useAuth } from '../contexts/AuthContext';

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  onContactProvider: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose, onContactProvider }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist, services } = useMarketplace();
  const { user } = useAuth();

  if (!isOpen) return null;

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
//   };

  const handleWishlistClick = () => {
    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id);
    } else {
      addToWishlist(service.id, 'service');
    }
  };

  const similarServices = services
    .filter(s => s.id !== service.id && s.category === service.category)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-6">
      <div className="bg-gray-800 rounded-xl max-w-2xl md:max-w-3xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-3 md:p-5 flex items-center justify-between">
          <h2 className="text-lg md:text-2xl font-semibold text-white truncate">{service.title}</h2>
          <div className="flex items-center space-x-1 md:space-x-2">
            <button
              onClick={handleWishlistClick}
              className={`p-1 md:p-2 rounded-lg transition-colors ${
                isInWishlist(service.id)
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
              }`}
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5" fill={isInWishlist(service.id) ? 'currentColor' : 'none'} />
            </button>
            <button className="p-1 md:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-1 md:p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <Flag className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 md:p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Main Content: Use a single column */}
        <div className="p-3 md:p-6 space-y-6">
          {/* Price and Duration */}
          <div className="flex items-center">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-white">₹{service.price.toLocaleString()}</span>
                {service.negotiable && (
                  <span className="text-xs md:text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    Negotiable
                  </span>
                )}
              </div>
              <span className="text-xs md:text-sm text-blue-400 bg-blue-400/10 px-2 md:px-3 py-1 rounded-full font-medium capitalize">
                {service.duration}
              </span>
            </div>
            <div className="ml-auto text-right text-xs md:text-sm text-gray-400">
              <div className="flex items-center space-x-1 mb-1 justify-end">
                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                <span>{service.views} views</span>
              </div>
              <div className="flex items-center space-x-1 justify-end">
                <Heart className="w-3 h-3 md:w-4 md:h-4" />
                <span>{service.saves} saves</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">Description</h3>
            <div className="text-gray-300 text-sm md:text-base">
              {showFullDescription ? (
                <p className="whitespace-pre-wrap">{service.description}</p>
              ) : (
                <p className="line-clamp-3">{service.description}</p>
              )}
              {service.description.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-purple-400 hover:text-purple-300 text-xs md:text-sm mt-2"
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>

          {/* Location and Duration */}
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              <span>{service.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              <span>{service.duration}</span>
            </div>
          </div>

          {/* Provider Info */}
          <div className="bg-gray-700 rounded-lg p-3 md:p-4">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Provider Information</h3>
            <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
              <img
                src={service.provider.avatar}
                alt={service.provider.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <h4 className="font-medium text-white text-sm md:text-base">{service.provider.name}</h4>
                  {service.provider.verified && (
                    <Shield className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs md:text-sm text-gray-400">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" fill="currentColor" />
                  <span>{service.provider.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-400 space-y-1">
              <p>Member since {new Date(service.provider.joinedDate).getFullYear()}</p>
              <p>{service.provider.department} • Semester {service.provider.semester}</p>
              {service.provider.averageResponseTime && (
                <p>Usually responds within {service.provider.averageResponseTime} minutes</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {user?.id !== service.providerId && (
            <div className="flex space-x-2 md:space-x-3">
              <button
                onClick={onContactProvider}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-1 md:space-x-2 text-xs md:text-base"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span>Contact Provider</span>
              </button>
              <button className="px-4 md:px-6 py-2 md:py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-lg transition-colors text-xs md:text-base">
                Make Offer
              </button>
            </div>
          )}

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {service.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs md:text-sm hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Similar Services */}
        {similarServices.length > 0 && (
          <div className="border-t border-gray-700 p-3 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-4">Similar Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {similarServices.map((similarService) => (
                <div key={similarService.id} className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors cursor-pointer">
                  <div className="p-2 md:p-3">
                    <h4 className="text-xs md:text-sm font-medium text-white line-clamp-2 mb-1">
                      {similarService.title}
                    </h4>
                    <p className="text-base md:text-lg font-bold text-white">₹{similarService.price.toLocaleString()}</p>
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

export default ServiceModal;