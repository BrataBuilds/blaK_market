import React, { useState } from 'react';
import { Search, Archive, MoreVertical, MessageCircle } from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useAuth } from '../contexts/AuthContext';
import ChatModal from '../components/ChatModal';

const Messages: React.FC = () => {
  const { chats } = useMarketplace();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const filteredChats = chats.filter(chat => {
    const otherParticipant = chat.participants.find(p => p.id !== user?.id);
    const matchesSearch = otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filter) {
      case 'unread':
        return matchesSearch && chat.unreadCount > 0;
      case 'archived':
        return matchesSearch && chat.archived;
      default:
        return matchesSearch && !chat.archived;
    }
  });

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400">Communicate with buyers and sellers</p>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex h-[600px]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-700 flex flex-col">
              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-700">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="flex space-x-1">
                  {(['all', 'unread', 'archived'] as const).map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                        filter === filterType
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {filterType}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto">
                {filteredChats.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-center">
                      {searchQuery ? 'No conversations found' : 'No messages yet'}
                    </p>
                  </div>
                ) : (
                  filteredChats.map((chat) => {
                    const otherParticipant = chat.participants.find(p => p.id !== user?.id);
                    if (!otherParticipant) return null;

                    return (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat.id)}
                        className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors ${
                          selectedChat === chat.id ? 'bg-gray-750' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <img
                              src={otherParticipant.avatar}
                              alt={otherParticipant.name}
                              className="w-12 h-12 rounded-full"
                            />
                            {otherParticipant.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-white truncate">
                                {otherParticipant.name}
                              </h4>
                              <span className="text-xs text-gray-400">
                                {formatTime(chat.lastMessage.timestamp)}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-400 truncate">
                              {chat.lastMessage.senderId === user?.id && 'You: '}
                              {chat.lastMessage.content}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                {chat.itemId && (
                                  <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                                    {chat.itemType}
                                  </span>
                                )}
                              </div>
                              {chat.unreadCount > 0 && (
                                <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                  {chat.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex items-center justify-center">
              {selectedChat ? (
                <div className="text-center text-gray-400">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Click on a conversation to view messages</p>
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Open Chat
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-white mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {selectedChatData && (
        <ChatModal
          chat={selectedChatData}
          isOpen={!!selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
};

export default Messages;