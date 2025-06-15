import React, { useState } from 'react';
import { X, Star, Shield, MapPin, Clock, Calendar, MessageCircle, Flag, Award, TrendingUp } from 'lucide-react';
import { User, Review } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user: profileUser, isOpen, onClose, onStartChat }) => {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'listings'>('about');

  // Mock data - in real app this would come from API
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      reviewerId: '2',
      reviewer: {
        id: '2',
        name: 'Priya Patel',
        email: 'priya.patel@kiit.ac.in',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
        studentId: '210520002',
        department: 'Electronics',
        semester: 4,
        points: 1200,
        rating: 4.9,
        reviewCount: 28,
        verified: true,
        joinedDate: '2023-07-20T00:00:00.000Z'
      },
      revieweeId: profileUser.id,
      rating: 5,
      comment: 'Excellent seller! The laptop was exactly as described and the transaction was smooth.',
      date: '2024-01-10T00:00:00.000Z',
      transactionId: 'tx1',
      helpful: 3,
      reported: false
    }
  ]);

  if (!isOpen) return null;

  const isOwnProfile = currentUser?.id === profileUser.id;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-800"
              />
              
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-white">{profileUser.name}</h1>
                  {profileUser.verified && (
                    <Shield className="w-6 h-6 text-blue-400" title="Verified Student" />
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <span>{profileUser.department}</span>
                  <span>•</span>
                  <span>Semester {profileUser.semester}</span>
                  <span>•</span>
                  <span>{profileUser.points} points</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    <span className="text-white font-medium">{profileUser.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({profileUser.reviewCount} reviews)</span>
                  </div>
                  
                  {profileUser.averageResponseTime && (
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Responds in ~{profileUser.averageResponseTime}min</span>
                    </div>
                  )}
                </div>

                {!isOwnProfile && (
                  <div className="flex space-x-3">
                    <button
                      onClick={onStartChat}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-sm text-gray-400">Items Sold</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{profileUser.points}</div>
              <div className="text-sm text-gray-400">Points Earned</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {new Date().getFullYear() - new Date(profileUser.joinedDate).getFullYear()}y
              </div>
              <div className="text-sm text-gray-400">Member Since</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-700">
          <div className="flex space-x-1 p-1 mx-6 mt-6 bg-gray-700 rounded-lg">
            {(['about', 'reviews', 'listings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                {profileUser.bio && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                    <p className="text-gray-300">{profileUser.bio}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">{profileUser.location || 'KIIT Campus'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">
                        Joined {new Date(profileUser.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                    {profileUser.operatingHours && (
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300">
                          Available {profileUser.operatingHours.start} - {profileUser.operatingHours.end}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {profileUser.contactPreferences && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Email notifications</span>
                        <span className={`text-sm ${profileUser.contactPreferences.email ? 'text-green-400' : 'text-red-400'}`}>
                          {profileUser.contactPreferences.email ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Chat messages</span>
                        <span className={`text-sm ${profileUser.contactPreferences.chat ? 'text-green-400' : 'text-red-400'}`}>
                          {profileUser.contactPreferences.chat ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <h3 className="text-lg font-semibold text-white mb-2">No reviews yet</h3>
                    <p className="text-gray-400">Reviews will appear here after completed transactions</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-white">{review.reviewer.name}</h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                                    }`}
                                    fill="currentColor"
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-400">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">{review.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <button className="hover:text-white transition-colors">
                              Helpful ({review.helpful})
                            </button>
                            <button className="hover:text-red-400 transition-colors">
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Active Listings</h3>
                  <p>This user's active listings will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;