import React from 'react';
import WishlistModal from '../components/WishlistModal';

const Wishlist: React.FC = () => {
  return <WishlistModal isOpen={true} onClose={() => window.history.back()} />;
};

export default Wishlist;