import React, { useState, useMemo } from 'react';
import { Filter, Plus, Grid, List } from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import RequestCard from '../components/RequestCard';
import ProductModal from '../components/ProductModal';
import CreateListingModal from '../components/CreateListingModal';
import ChatModal from '../components/ChatModal';
import RequestModal  from '../components/RequestModal';
import ServiceModal from '../components/ServiceModal';
import { Product, Service, Request, Chat } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Marketplace: React.FC = () => {
  const { 
    products, 
    services, 
    requests, 
    chats,
    searchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useMarketplace();
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'requests'>('products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [createListingType, setCreateListingType] = useState<'product' | 'service' | 'request'>('product');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = {
    products: ['all', 'electronics', 'books', 'apparel', 'consumables', 'rentals'],
    services: ['all', 'academic', 'tutoring', 'skills', 'technical'],
    requests: ['all', 'products', 'services', 'academic', 'general']
  };

  const filteredItems = useMemo(() => {
    let items: any[] = [];
    
    switch (activeTab) {
      case 'products':
        items = products;
        break;
      case 'services':
        items = services;
        break;
      case 'requests':
        items = requests;
        break;
    }

    // Filter by search query
    if (searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange.min || priceRange.max) {
      items = items.filter(item => {
        const price = item.price || item.budget || 0;
        const min = parseFloat(priceRange.min) || 0;
        const max = parseFloat(priceRange.max) || Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort items
    switch (sortBy) {
      case 'newest':
        items.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
        break;
      case 'oldest':
        items.sort((a, b) => new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime());
        break;
      case 'price-low':
        items.sort((a, b) => (a.price || a.budget || 0) - (b.price || b.budget || 0));
        break;
      case 'price-high':
        items.sort((a, b) => (b.price || b.budget || 0) - (a.price || a.budget || 0));
        break;
      case 'popular':
        items.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }

    return items;
  }, [activeTab, products, services, requests, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleCreateListing = (type: 'product' | 'service' | 'request') => {
    setCreateListingType(type);
    setShowCreateListing(true);
  };

  // const handleContactSeller = (item: Product | Service | Request) => {
  //   // Find existing chat or create new one
  //   const sellerId = 'sellerId' in item ? item.sellerId : 'providerId' in item ? item.providerId : '';
  //   const existingChat = chats.find(chat => 
  //     chat.participants.some(p => p.id === sellerId) && 
  //     chat.participants.some(p => p.id === user?.id)
  //   );

  //   if (existingChat) {
  //     setSelectedChat(existingChat);
  //   } else {
  //     // Create new chat (in real app, this would be an API call)
  //     const seller = 'seller' in item ? item.seller : 'provider' in item ? item.provider : null;
  //     if (seller && user) {
  //       const newChat: Chat = {
  //         id: Date.now().toString(),
  //         participants: [user, seller],
  //         messages: [],
  //         lastMessage: {
  //           id: '1',
  //           senderId: user.id,
  //           content: `Hi! I'm interested in your ${item.title}`,
  //           timestamp: new Date().toISOString(),
  //           type: 'text',
  //           read: false
  //         },
  //         unreadCount: 0,
  //         itemId: item.id,
  //         itemType: 'sellerId' in item ? 'product' : 'service',
  //         archived: false,
  //         createdAt: new Date().toISOString(),
  //         updatedAt: new Date().toISOString()
  //       };
  //       setSelectedChat(newChat);
  //     }
  //   }
  // };
  const handleContactSeller = (item: Product | Service | Request) => {
  // Determine the contact user and type
  let contactId = '';
  let contactUser = null;
  let itemType = '';

  if ('sellerId' in item) {
    contactId = item.sellerId;
    contactUser = item.seller;
    itemType = 'product';
  } else if ('providerId' in item) {
    contactId = item.providerId;
    contactUser = item.provider;
    itemType = 'service';
  } else if ('requesterId' in item) {
    contactId = item.requesterId;
    contactUser = item.requester;
    itemType = 'request';
  }

  if (!contactId || !contactUser || !user) return;

  const existingChat = chats.find(chat =>
    chat.participants.some(p => p.id === contactId) &&
    chat.participants.some(p => p.id === user.id)
  );

  if (existingChat) {
    setSelectedChat(existingChat);
  } else {
    const newChat: Chat = {
      id: Date.now().toString(),
      participants: [user, contactUser],
      messages: [],
      lastMessage: {
        id: '1',
        senderId: user.id,
        content: `Hi! I'm interested in your ${item.title}`,
        timestamp: new Date().toISOString(),
        type: 'text',
        read: false
      },
      unreadCount: 0,
      itemId: item.id,
      itemType,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedChat(newChat);
  }
};

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
            <p className="text-gray-400">Discover amazing deals from your fellow KIIT students</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button 
              onClick={() => handleCreateListing('product')}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Sell Item</span>
            </button>
            <button 
              onClick={() => handleCreateListing('service')}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Offer Service</span>
            </button>
            <button 
              onClick={() => handleCreateListing('request')}
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Request</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
          {(['products', 'services', 'requests'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories[activeTab].map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-300 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="flex space-x-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="₹0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="₹∞"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-end space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredItems.length} {activeTab} {filteredItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Items Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredItems.map((item) => {
            switch (activeTab) {
              case 'products':
                return (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onClick={() => setSelectedProduct(item)}
                  />
                );
              case 'services':
                return (
                  <ServiceCard
                    key={item.id}
                    service={item}
                    onClick={() => setSelectedService(item)}
                  />
                );
              case 'requests':
                return (
                  <RequestCard
                    key={item.id}
                    request={item}
                    onClick={() => setSelectedRequest(item)}
                  />
                );
              default:
                return null;
            }
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onContactSeller={() => handleContactSeller(selectedProduct)}
        />
      )}

      {showCreateListing && (
        <CreateListingModal
          isOpen={showCreateListing}
          onClose={() => setShowCreateListing(false)}
          type={createListingType}
        />
      )}

      {selectedChat && (
        <ChatModal
          chat={selectedChat}
          isOpen={!!selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      )}

      {selectedRequest && (
      <RequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onContactRequester={() => {
          handleContactSeller(selectedRequest);
          setSelectedRequest(null);

        }}
  />
)}
  {selectedService && (
    <ServiceModal
      service={selectedService}
      isOpen={!!selectedService}
      onClose={() => setSelectedService(null)}
      onContactProvider={() => {handleContactSeller(selectedService);
        setSelectedService(null);
      }}
    />
  )}
    </div>
  );
};

export default Marketplace;