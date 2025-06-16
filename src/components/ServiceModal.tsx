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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white truncate">{service.title}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleWishlistClick}
              className={`p-2 rounded-lg transition-colors ${
                isInWishlist(service.id)
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
              }`}
            >
              <Heart className="w-5 h-5" fill={isInWishlist(service.id) ? 'currentColor' : 'none'} />
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

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
              {service.images && service.images.length > 0 ? (
                <img
                  src={service.images[currentImageIndex]}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              {service.images && service.images.length > 1 && (
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
                    {service.images.map((_, index) => (
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
            {service.images && service.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-purple-500' : 'border-gray-600'
                    }`}
                  >
                    <img src={image} alt={`${service.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            {/* Price and Duration */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-white">₹{service.price.toLocaleString()}</span>
                  {service.negotiable && (
                    <span className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">
                      Negotiable
                    </span>
                  )}
                </div>
                <span className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full font-medium capitalize">
                  {service.duration}
                </span>
              </div>
              <div className="text-right text-sm text-gray-400">
                <div className="flex items-center space-x-1 mb-1">
                  <Eye className="w-4 h-4" />
                  <span>{service.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{service.saves} saves</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <div className="text-gray-300">
                {showFullDescription ? (
                  <p className="whitespace-pre-wrap">{service.description}</p>
                ) : (
                  <p className="line-clamp-3">{service.description}</p>
                )}
                {service.description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-purple-400 hover:text-purple-300 text-sm mt-2"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>

            {/* Location and Duration */}
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{service.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Provider Information</h3>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={service.provider.avatar}
                  alt={service.provider.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-white">{service.provider.name}</h4>
                    {service.provider.verified && (
                      <Shield className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span>{service.provider.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Member since {new Date(service.provider.joinedDate).getFullYear()}</p>
                <p>{service.provider.department} • Semester {service.provider.semester}</p>
                {service.provider.averageResponseTime && (
                  <p>Usually responds within {service.provider.averageResponseTime} minutes</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {user?.id !== service.providerId && (
              <div className="flex space-x-3">
                <button
                  onClick={onContactProvider}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Provider</span>
                </button>
                <button className="px-6 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-lg transition-colors">
                  Make Offer
                </button>
              </div>
            )}

            {/* Tags */}
            {service.tags && service.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
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

        {/* Similar Services */}
        {similarServices.length > 0 && (
          <div className="border-t border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Similar Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarServices.map((similarService) => (
                <div key={similarService.id} className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors cursor-pointer">
                  <img
                    src={similarService.images[0]}
                    alt={similarService.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-white line-clamp-2 mb-1">
                      {similarService.title}
                    </h4>
                    <p className="text-lg font-bold text-white">₹{similarService.price.toLocaleString()}</p>
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