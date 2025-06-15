import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Paperclip, Image, Smile, MoreVertical, Archive, Flag } from 'lucide-react';
import { Chat, Message, User } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ChatModalProps {
  chat: Chat;
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ chat, isOpen, onClose }) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const otherParticipant = chat.participants.find(p => p.id !== user?.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen || !otherParticipant) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user!.id,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Handle file upload logic here
    const message: Message = {
      id: Date.now().toString(),
      senderId: user!.id,
      content: `Shared a file: ${file.name}`,
      timestamp: new Date().toISOString(),
      type: 'file',
      read: false,
      attachments: [{
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }]
    };

    setMessages(prev => [...prev, message]);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    messages.forEach(message => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) groups[date] = [];
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={otherParticipant.avatar}
              alt={otherParticipant.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-white">{otherParticipant.name}</h3>
              <p className="text-sm text-gray-400">
                {otherParticipant.isOnline ? 'Online' : `Last seen ${formatTime(otherParticipant.lastSeen || '')}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg border border-gray-600 py-1 z-10">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Chat
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-600">
                    <Flag className="w-4 h-4 mr-2" />
                    Report User
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(messageGroups).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="flex justify-center mb-4">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                  {date}
                </span>
              </div>
              {dateMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user?.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {message.type === 'text' && (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                    {message.type === 'image' && message.attachments && (
                      <div>
                        <img
                          src={message.attachments[0].url}
                          alt="Shared image"
                          className="max-w-full h-auto rounded mb-2"
                        />
                        {message.content && <p>{message.content}</p>}
                      </div>
                    )}
                    {message.type === 'file' && message.attachments && (
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4" />
                        <div>
                          <p className="font-medium">{message.attachments[0].name}</p>
                          <p className="text-xs opacity-75">
                            {(message.attachments[0].size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    )}
                    <p className="text-xs opacity-75 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,application/pdf,.doc,.docx,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Image className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;