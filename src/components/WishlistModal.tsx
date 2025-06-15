import React, { useState } from 'react';
import { X, Heart, Plus, Trash2, Share2, Bell, BellOff } from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useAuth } from '../contexts/AuthContext';
import { Wishlist, WishlistItem } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose }) => {
  const { products, services, wishlist } = useMarketplace();
  const { user } = useAuth();
  const [selectedWishlist, setSelectedWishlist] = useState<string>('default');
  const [showCreateWishlist, setShowCreateWishlist] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState('');

  // Mock wishlists data - in real app this would come from context
  const [wishlists, setWishlists] = useState<Wishlist[]>([
    {
      id: 'default',
      userId: user?.id || '',
      name: 'My Wishlist',
      description: 'Default wishlist',
      items: wishlist,
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  if (!isOpen) return null;

  const currentWishlist = wishlists.find(w => w.id === selectedWishlist);
  const wishlistItems = currentWishlist?.items || [];

  const getItemDetails = (item: WishlistItem) => {
    if (item.itemType === 'product') {
      return products.find(p => p.id === item.itemId);
    } else {
      return services.find(s => s.id === item.itemId);
    }
  };

  const createWishlist = () => {
    if (!newWishlistName.trim()) return;

    const newWishlist: Wishlist = {
      id: Date.now().toString(),
      userId: user?.id || '',
      name: newWishlistName.trim(),
      description: '',
      items: [],
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setWishlists(prev => [...prev, newWishlist]);
    setNewWishlistName('');
    setShowCreateWishlist(false);
    setSelectedWishlist(newWishlist.id);
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlists(prev => prev.map(wishlist => 
      wishlist.id === selectedWishlist
        ? { ...wishlist, items: wishlist.items.filter(item => item.itemId !== itemId) }
        : wishlist
    ));
  };

  const togglePriceAlert = (itemId: string) => {
    setWishlists(prev => prev.map(wishlist => 
      wishlist.id === selectedWishlist
        ? {
            ...wishlist,
            items: wishlist.items.map(item =>
              item.itemId === itemId
                ? { ...item, priceAlert: item.priceAlert ? undefined : 100 }
                : item
            )
          }
        : wishlist
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white">My Wishlists</h2>
            <select
              value={selectedWishlist}
              onChange={(e) => setSelectedWishlist(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {wishlists.map(wishlist => (
                <option key={wishlist.id} value={wishlist.id}>
                  {wishlist.name} ({wishlist.items.length})
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowCreateWishlist(true)}
              className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Create Wishlist Form */}
        {showCreateWishlist && (
          <div className="p-4 border-b border-gray-700 bg-gray-750">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
                placeholder="Wishlist name..."
                className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && createWishlist()}
              />
              <button
                onClick={createWishlist}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateWishlist(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        <div className="p-6">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
              <p className="text-gray-400">Start adding items you love to keep track of them</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => {
                const itemDetails = getItemDetails(item);
                if (!itemDetails) return null;

                return (
                  <div key={item.id} className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-650 transition-colors">
                    <div className="relative">
                      <img
                        src={itemDetails.images?.[0] || '/placeholder-image.jpg'}
                        alt={itemDetails.title}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeFromWishlist(item.itemId)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">
                        {itemDetails.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-white">
                          ₹{itemDetails.price?.toLocaleString() || 'N/A'}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">
                          {item.itemType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          Added {new Date(item.dateAdded).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => togglePriceAlert(item.itemId)}
                          className={`p-1 rounded transition-colors ${
                            item.priceAlert
                              ? 'text-yellow-400 hover:text-yellow-300'
                              : 'text-gray-400 hover:text-yellow-400'
                          }`}
                          title={item.priceAlert ? 'Disable price alerts' : 'Enable price alerts'}
                        >
                          {item.priceAlert ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                        </button>
                      </div>

                      {item.priceAlert && (
                        <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
                          Price alert set for ₹{item.priceAlert.toLocaleString()}
                        </div>
                      )}

                      {item.notes && (
                        <div className="mt-2 p-2 bg-gray-600 rounded text-sm text-gray-300">
                          {item.notes}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;