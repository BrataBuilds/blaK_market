export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studentId: string;
  department: string;
  semester: number;
  points: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  joinedDate: string;
  bio?: string;
  contactPreferences: {
    email: boolean;
    chat: boolean;
    phone?: string;
  };
  operatingHours?: {
    start: string;
    end: string;
    timezone: string;
  };
  location?: string;
  averageResponseTime?: number; // in minutes
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'INR' | 'USD';
  negotiable: boolean;
  category: ProductCategory;
  subcategory: string;
  condition: 'new' | 'like-new' | 'good' | 'used' | 'for-parts';
  images: string[];
  sellerId: string;
  seller: User;
  availability: 'available' | 'sold' | 'reserved';
  location?: string;
  datePosted: string;
  views: number;
  saves: number;
  tags: string[];
  specifications?: Record<string, string>;
  warranty?: string;
  returnPolicy?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: 'INR';
  negotiable: boolean;
  category: ServiceCategory;
  subcategory: string;
  duration: string;
  providerId: string;
  provider: User;
  availability: 'available' | 'busy' | 'unavailable';
  location: string;
  datePosted: string;
  views: number;
  saves: number;
  tags: string[];
  requirements?: string[];
  deliverables?: string[];
  revisions?: number;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  budget: number;
  currency?: 'INR';
  category: RequestCategory;
  subcategory: string;
  urgency: 'low' | 'medium' | 'high';
  requesterId: string;
  requester: User;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  location: String;
  datePosted: string;
  deadline?: string;
  responses: number;
  tags: string[];
  requirements?: string[];
  attachments?: string[];
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
  itemId?: string;
  itemType?: 'product' | 'service' | 'request';
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'offer' | 'system';
  read: boolean;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
    size: number;
  }[];
  replyTo?: string;
  edited?: boolean;
  editedAt?: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewer: User;
  revieweeId: string;
  rating: number;
  comment: string;
  date: string;
  transactionId: string;
  helpful: number;
  reported: boolean;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  itemId: string;
  itemType: 'product' | 'service';
  amount: number;
  pointsUsed: number;
  status: 'pending' | 'completed' | 'cancelled' | 'disputed';
  date: string;
  paymentMethod: 'cash' | 'digital' | 'points';
  deliveryMethod?: 'pickup' | 'delivery' | 'digital';
  notes?: string;
}

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  description?: string;
  items: WishlistItem[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  itemId: string;
  itemType: 'product' | 'service';
  dateAdded: string;
  notes?: string;
  priceAlert?: number;
  stockAlert?: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'price_drop' | 'stock_alert' | 'review' | 'transaction' | 'system';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  data?: Record<string, any>;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  query: string;
  filters: {
    category?: string;
    priceRange?: { min: number; max: number };
    location?: string;
    condition?: string;
    tags?: string[];
  };
  notifications: boolean;
  createdAt: string;
}

export type ProductCategory = 'electronics' | 'books' | 'apparel' | 'consumables' | 'rentals' | 'furniture' | 'sports' | 'automotive';
export type ServiceCategory = 'academic' | 'tutoring' | 'skills' | 'technical' | 'creative' | 'personal' | 'business';
export type RequestCategory = 'products' | 'services' | 'academic' | 'general' | 'urgent';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  tags: string[];
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  category: 'technical' | 'account' | 'payment' | 'abuse' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    senderId: string;
    message: string;
    timestamp: string;
    attachments?: string[];
  }[];
}