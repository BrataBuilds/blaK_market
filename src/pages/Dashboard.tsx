import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, MessageCircle,Gift,Star,CheckCircle,Eye, Heart, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMarketplace } from '../contexts/MarketplaceContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, services } = useMarketplace();
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'sales' | 'analytics'>('overview');
  const handleRedeem = (rewardId: number) => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_blank");
    // setRedeemed(rewardId);
    // In a real app, call API to redeem and update points
  };
  // Mock user's listings
  const userListings = [...products, ...services].filter(item => 
    'sellerId' in item ? item.sellerId === user?.id : 'providerId' in item ? item.providerId === user?.id : false
  );

  const stats = {
    totalListings: userListings.length,
    totalViews: userListings.reduce((sum, item) => sum + item.views, 0),
    totalSaves: userListings.reduce((sum, item) => sum + item.saves, 0),
    totalEarnings: 15420, // Mock data
    activeChats: 8, // Mock data
    completedSales: 12 // Mock data
  };
  
  const rewards = [
  {
    id: 1,
    name: 'Steam Gift Card ₹500',
    points: 500,
    image: 'https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016', // Example image
    description: 'Redeem for a ₹500 Steam Gift Card code.',
  },
  {
    id: 2,
    name: 'Amazon Gift Card ₹250',
    points: 250,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Redeem for a ₹250 Amazon Gift Card code.',
  },
  {
    id: 3,
    name: 'Spotify Premium 1 Month',
    points: 150,
    image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png',
    description: 'Get 1 month of Spotify Premium.',
  },
];
const RedeemPoints: React.FC = () => {
  const { user } = useAuth();
  // Mock points, replace with user.points if available
  const points = user?.points ?? 420;

  const [redeemed, setRedeemed] = useState<number | null>(null);

  
}

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your listings and track your performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">₹{stats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400">+12.5%</span>
              <span className="text-gray-400 ml-1">from last month</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Listings</p>
                <p className="text-2xl font-bold text-white">{stats.totalListings}</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-400">
                {userListings.filter(item => item.availability === 'available').length} available
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-400">{stats.totalSaves} saves</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Chats</p>
                <p className="text-2xl font-bold text-white">{stats.activeChats}</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-400">3 unread messages</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
          {(['overview', 'listings', 'sales', 'analytics'] as const).map((tab) => (
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">MacBook Air M2 sold for ₹85,000</p>
                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">New message from Priya Patel</p>
                    <p className="text-sm text-gray-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">Gaming Setup listing viewed 15 times</p>
                    <p className="text-sm text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            {/* Redeem Points Section */}
<div className="bg-gray-800 rounded-lg p-6">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-3">
      <Gift className="w-7 h-7 text-yellow-400" />
      <h3 className="text-lg font-semibold text-white">Redeem BlaK Points</h3>
    </div>
    <div className="flex items-center space-x-2">
      <Star className="w-6 h-6 text-yellow-400" />
      <span className="text-2xl font-bold text-yellow-400">{user?.points ?? 420}</span>
    </div>
  </div>
  <div>
    <h4 className="text-md font-semibold text-white mb-2">Available Rewards</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          id: 1,
          name: 'Steam Gift Card ₹500',
          points: 500,
          image: 'https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016',
          description: 'Redeem for a ₹500 Steam Gift Card code.',
        },
        {
          id: 2,
          name: 'Amazon Gift Card ₹250',
          points: 250,
          image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
          description: 'Redeem for a ₹250 Amazon Gift Card code.',
        },
        {
          id: 3,
          name: 'Spotify Premium 1 Month',
          points: 150,
          image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png',
          description: 'Get 1 month of Spotify Premium.',
        },
      ].map((reward) => (
        <div key={reward.id} className="bg-gray-700 rounded-lg p-4 flex items-center space-x-4">
          <img src={reward.image} alt={reward.name} className="w-12 h-12 object-contain rounded" />
          <div className="flex-1">
            <h5 className="text-white font-semibold">{reward.name}</h5>
            <p className="text-gray-400 text-sm mb-1">{reward.description}</p>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">{reward.points} points</span>
            </div>
          </div>
          <div>
            {(user?.points ?? 420) >= reward.points ? (
              <button
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
                onClick={() => handleRedeem(reward.id)} // Implement redeem logic if needed
              >
                Redeem
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-2 rounded-lg bg-gray-600 text-gray-400 font-semibold cursor-not-allowed"
              >
                Not enough points
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
            {/* Performance Chart */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Performance Overview</h3>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Analytics chart would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">My Listings</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Listing</span>
              </button>
            </div>

            <div className="grid gap-6">
              {userListings.map((listing) => (
                <div key={listing.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gray-700 flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{listing.title}</h4>
                          <p className="text-gray-400 text-sm mb-2 line-clamp-2">{listing.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{listing.views} views</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{listing.saves} saves</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>3 inquiries</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-white mb-2">₹{listing.price.toLocaleString()}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              listing.availability === 'available'
                                ? 'bg-green-500/10 text-green-400'
                                : listing.availability === 'sold'
                                ? 'bg-red-500/10 text-red-400'
                                : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {listing.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-700">
                    <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sales History</h3>
            <div className="text-center py-8 text-gray-400">
              <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Sales history will be displayed here</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Analytics</h3>
            <div className="text-center py-8 text-gray-400">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Detailed analytics will be displayed here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;