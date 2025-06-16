import React, { useState } from 'react';
import { Camera, Edit, Save, X, Shield, Star, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    contactPreferences: {
      email: user?.contactPreferences?.email || true,
      chat: user?.contactPreferences?.chat || true,
      phone: user?.contactPreferences?.phone || ''
    },
    operatingHours: {
      start: user?.operatingHours?.start || '09:00',
      end: user?.operatingHours?.end || '18:00',
      timezone: user?.operatingHours?.timezone || 'IST'
    }
  });

  if (!user) return null;

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio || '',
      location: user.location || '',
      contactPreferences: user.contactPreferences || { email: true, chat: true, phone: '' },
      operatingHours: user.operatingHours || { start: '09:00', end: '18:00', timezone: 'IST' }
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>
            <div className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-800"
                  />
                  <button className="absolute bottom-2 right-2 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                        {user.verified && (
                          <Shield className="w-6 h-6 text-blue-400" title="Verified Student" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <span>{user.department}</span>
                        <span>•</span>
                        <span>Semester {user.semester}</span>
                        <span>•</span>
                        <span>{user.points} points</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                          <span className="text-white font-medium">{user.rating.toFixed(1)}</span>
                          <span className="text-gray-400">({user.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-sm text-gray-400">Items Sold</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{user.points}</div>
              <div className="text-sm text-gray-400">Points Earned</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{user.rating.toFixed(1)}</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Profile Information</h3>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-white">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <p className="text-gray-400">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                <p className="text-gray-400">{user.department}</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell others about yourself..."
                  />
                ) : (
                  <p className="text-white">{user.bio || 'No bio added yet'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your location..."
                  />
                ) : (
                  <p className="text-white">{user.location || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                {isEditing ? (
                  <input
                    type="checkbox"
                    checked={formData.contactPreferences.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contactPreferences: { ...prev.contactPreferences, email: e.target.checked }
                    }))}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                ) : (
                  <span className={`text-sm ${user.contactPreferences?.email ? 'text-green-400' : 'text-red-400'}`}>
                    {user.contactPreferences?.email ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Chat Messages</h4>
                  <p className="text-sm text-gray-400">Allow direct messages from other users</p>
                </div>
                {isEditing ? (
                  <input
                    type="checkbox"
                    checked={formData.contactPreferences.chat}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      contactPreferences: { ...prev.contactPreferences, chat: e.target.checked }
                    }))}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                ) : (
                  <span className={`text-sm ${user.contactPreferences?.chat ? 'text-green-400' : 'text-red-400'}`}>
                    {user.contactPreferences?.chat ? 'Enabled' : 'Disabled'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          {isEditing && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Operating Hours</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={formData.operatingHours.start}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      operatingHours: { ...prev.operatingHours, start: e.target.value }
                    }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
                  <input
                    type="time"
                    value={formData.operatingHours.end}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      operatingHours: { ...prev.operatingHours, end: e.target.value }
                    }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;