import React from 'react';
import { X, Calendar, MapPin, Clock, MessageCircle, AlertCircle } from 'lucide-react';
import { Request } from '../types';

interface RequestModalProps {
  request: Request;
  isOpen: boolean;
  onClose: () => void;
  onContactRequester?: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ request, isOpen, onClose, onContactRequester }) => {
  if (!isOpen) return null;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400 bg-green-400/10';
      case 'in-progress': return 'text-blue-400 bg-blue-400/10';
      case 'completed': return 'text-purple-400 bg-purple-400/10';
      case 'cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white truncate">{request.title}</h2>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getUrgencyColor(request.urgency)}`}>
              {request.urgency}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300 whitespace-pre-wrap">{request.description}</p>
          </div>

          {/* Budget and Deadline */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-white">Budget: ₹{request.budget.toLocaleString()}</span>
            </div>
            {request.deadline && (
              <div className="flex items-center space-x-1 text-sm text-orange-400">
                <Calendar className="w-4 h-4" />
                <span>Due: {new Date(request.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Location and Responses */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{request.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{request.responses} responses</span>
            </div>
          </div>

          {/* Requirements and Deliverables */}
          {request.requirements && request.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {request.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          {/* {request.deliverables && request.deliverables.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Deliverables</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {request.deliverables.map((del, idx) => (
                  <li key={idx}>{del}</li>
                ))}
              </ul>
            </div>
          )} */}

          {/* Requester Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Requester Information</h3>
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={request.requester.avatar}
                alt={request.requester.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-medium text-white">{request.requester.name}</h4>
                <div className="text-sm text-gray-400">{request.requester.department} • Semester {request.requester.semester}</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Member since {new Date(request.requester.joinedDate).getFullYear()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          {onContactRequester && (
            <div className="flex space-x-3 mt-4">
              <button
                onClick={onContactRequester}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact Requester</span>
              </button>
              <button className="px-6 py-3 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
                Make Offer
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RequestModal;