import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Service, Request, Chat, WishlistItem } from '../types';
import { mockProducts, mockServices, mockRequests, mockChats } from '../data/mockData';

interface MarketplaceContextType {
  products: Product[];
  services: Service[];
  requests: Request[];
  chats: Chat[];
  wishlist: WishlistItem[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addToWishlist: (itemId: string, itemType: 'product' | 'service') => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  addProduct: (product: Product) => void;
  addService: (service: Service) => void;
  addRequest: (request: Request) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [chats] = useState<Chat[]>(mockChats);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const savedWishlist = localStorage.getItem('blakmarket_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const addToWishlist = (itemId: string, itemType: 'product' | 'service') => {
    const newItem: WishlistItem = {
      id: Math.random().toString(36).substr(2, 9),
      userId: '1', // Current user ID
      itemId,
      itemType,
      dateAdded: new Date().toISOString()
    };

    const updatedWishlist = [...wishlist, newItem];
    setWishlist(updatedWishlist);
    localStorage.setItem('blakmarket_wishlist', JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (itemId: string) => {
    const updatedWishlist = wishlist.filter(item => item.itemId !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem('blakmarket_wishlist', JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (itemId: string) => {
    return wishlist.some(item => item.itemId === itemId);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const addService = (service: Service) => {
    setServices(prev => [service, ...prev]);
  };

  const addRequest = (request: Request) => {
    setRequests(prev => [request, ...prev]);
  };

  return (
    <MarketplaceContext.Provider value={{
      products,
      services,
      requests,
      chats,
      wishlist,
      searchQuery,
      selectedCategory,
      setSearchQuery,
      setSelectedCategory,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      addProduct,
      addService,
      addRequest
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};