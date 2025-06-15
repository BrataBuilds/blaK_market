import React from 'react';
import { Clock, MapPin, AlertCircle, MessageCircle, Calendar } from 'lucide-react';
import { Request } from '../types';

interface RequestCardProps {
  request: Request;
  onClick: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onClick }) => {
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
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-blue-500"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
          {request.title}
        </h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getUrgencyColor(request.urgency)}`}>
            {request.urgency}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
            {request.status}
          </span>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {request.description}
      </p>

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

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <img
            src={request.requester.avatar}
            alt={request.requester.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-300">{request.requester.name}</span>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{new Date(request.datePosted).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;