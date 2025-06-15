import { Product, Service, Request, User, Chat, Message } from '../types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@kiit.ac.in',
    studentId: '210520001',
    department: 'Computer Science',
    semester: 6,
    points: 850,
    rating: 4.8,
    reviewCount: 32,
    verified: true,
    joinedDate: '2023-08-15T00:00:00.000Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aarav'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@kiit.ac.in',
    studentId: '210520002',
    department: 'Electronics',
    semester: 4,
    points: 1200,
    rating: 4.9,
    reviewCount: 28,
    verified: true,
    joinedDate: '2023-07-20T00:00:00.000Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya'
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    email: 'rohit.kumar@kiit.ac.in',
    studentId: '210520003',
    department: 'Mechanical',
    semester: 8,
    points: 640,
    rating: 4.6,
    reviewCount: 15,
    verified: true,
    joinedDate: '2023-06-10T00:00:00.000Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rohit'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'MacBook Air M2 - Barely Used',
    description: 'Excellent condition MacBook Air with M2 chip. Used for only 3 months. Comes with original charger and box. Perfect for coding and design work.',
    price: 85000,
    negotiable: true,
    category: 'electronics',
    subcategory: 'laptops',
    condition: 'like-new',
    images: ['https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg'],
    sellerId: '1',
    seller: mockUsers[0],
    availability: 'available',
    location: 'Hostel Block A',
    datePosted: '2024-01-15T10:30:00.000Z',
    views: 234,
    saves: 45,
    tags: ['laptop', 'apple', 'macbook', 'programming']
  },
  {
    id: '2',
    title: 'Data Structures & Algorithms Book Bundle',
    description: 'Complete set of DSA books including Cormen, Sedgewick, and competitive programming guides. All books in excellent condition with minimal highlighting.',
    price: 2500,
    negotiable: true,
    category: 'books',
    subcategory: 'textbooks',
    condition: 'good',
    images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'],
    sellerId: '2',
    seller: mockUsers[1],
    availability: 'available',
    location: 'Academic Block',
    datePosted: '2024-01-14T14:20:00.000Z',
    views: 89,
    saves: 12,
    tags: ['books', 'dsa', 'programming', 'competitive']
  },
  {
    id: '3',
    title: 'Nike Air Force 1 - Size 9',
    description: 'Classic white Nike Air Force 1 sneakers in great condition. Size 9 US. Minor wear on soles but overall excellent condition.',
    price: 4500,
    negotiable: false,
    category: 'apparel',
    subcategory: 'shoes',
    condition: 'good',
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
    sellerId: '3',
    seller: mockUsers[2],
    availability: 'available',
    location: 'Hostel Block C',
    datePosted: '2024-01-13T16:45:00.000Z',
    views: 156,
    saves: 23,
    tags: ['shoes', 'nike', 'sneakers', 'fashion']
  },
  {
    id: '4',
    title: 'Gaming Setup - Monitor + Keyboard + Mouse',
    description: '24" 144Hz gaming monitor with mechanical keyboard and gaming mouse. Perfect setup for gaming and productivity. Selling due to hostel restrictions.',
    price: 12000,
    negotiable: true,
    category: 'electronics',
    subcategory: 'gaming',
    condition: 'good',
    images: ['https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg'],
    sellerId: '1',
    seller: mockUsers[0],
    availability: 'available',
    location: 'Hostel Block B',
    datePosted: '2024-01-12T12:15:00.000Z',
    views: 198,
    saves: 34,
    tags: ['gaming', 'monitor', 'keyboard', 'mouse']
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Web Development - React & Node.js',
    description: 'Professional web development services using modern technologies. Can build responsive websites, web apps, and backends. Portfolio available on request.',
    price: 5000,
    negotiable: true,
    category: 'technical',
    subcategory: 'development',
    duration: '1-2 weeks',
    providerId: '1',
    provider: mockUsers[0],
    availability: 'available',
    location: 'Online/Campus',
    datePosted: '2024-01-15T09:00:00.000Z',
    views: 167,
    saves: 28,
    tags: ['web development', 'react', 'nodejs', 'programming']
  },
  {
    id: '2',
    title: 'Math & Physics Tutoring',
    description: 'Expert tutoring in Mathematics and Physics for engineering students. 3+ years experience. Can help with assignments, exam prep, and concept clarification.',
    price: 500,
    negotiable: false,
    category: 'tutoring',
    subcategory: 'stem',
    duration: 'Per hour',
    providerId: '2',
    provider: mockUsers[1],
    availability: 'available',
    location: 'Library/Online',
    datePosted: '2024-01-14T11:30:00.000Z',
    views: 143,
    saves: 19,
    tags: ['tutoring', 'math', 'physics', 'engineering']
  },
  {
    id: '3',
    title: 'Assignment Writing & Research',
    description: 'Professional assignment writing and research services. Specialized in technical subjects. Plagiarism-free content with proper citations.',
    price: 800,
    negotiable: true,
    category: 'academic',
    subcategory: 'writing',
    duration: '2-5 days',
    providerId: '3',
    provider: mockUsers[2],
    availability: 'available',
    location: 'Online',
    datePosted: '2024-01-13T13:45:00.000Z',
    views: 201,
    saves: 31,
    tags: ['writing', 'research', 'assignments', 'academic']
  }
];

export const mockRequests: Request[] = [
  {
    id: '1',
    title: 'Need iPhone Charger (Lightning Cable)',
    description: 'Urgently need an iPhone lightning cable. Mine broke and I have an important call tomorrow. Will pay well for quick delivery.',
    budget: 800,
    category: 'products',
    subcategory: 'electronics',
    urgency: 'high',
    requesterId: '2',
    requester: mockUsers[1],
    status: 'open',
    location: 'Hostel Block A',
    datePosted: '2024-01-15T18:30:00.000Z',
    deadline: '2024-01-16T08:00:00.000Z',
    responses: 5,
    tags: ['iphone', 'charger', 'urgent', 'electronics']
  },
  {
    id: '2',
    title: 'Looking for Study Partner - Machine Learning',
    description: 'Need a study partner for Machine Learning course. Want to form a group for assignments and exam preparation. Should be from CSE/IT branch.',
    budget: 0,
    category: 'academic',
    subcategory: 'study group',
    urgency: 'medium',
    requesterId: '3',
    requester: mockUsers[2],
    status: 'open',
    location: 'Campus',
    datePosted: '2024-01-14T20:15:00.000Z',
    responses: 8,
    tags: ['study group', 'machine learning', 'cse', 'academic']
  },
  {
    id: '3',
    title: 'Graphic Design for Fest Poster',
    description: 'Need a creative graphic designer to design posters for our upcoming technical fest. Looking for modern, eye-catching designs.',
    budget: 2000,
    category: 'services',
    subcategory: 'design',
    urgency: 'medium',
    requesterId: '1',
    requester: mockUsers[0],
    status: 'open',
    location: 'Online',
    datePosted: '2024-01-13T15:20:00.000Z',
    deadline: '2024-01-20T23:59:00.000Z',
    responses: 3,
    tags: ['graphic design', 'poster', 'fest', 'creative']
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    content: 'Hi! Is the MacBook still available?',
    timestamp: '2024-01-15T14:30:00.000Z',
    type: 'text',
    read: true
  },
  {
    id: '2',
    senderId: '1',
    content: 'Yes, it\'s still available! Would you like to see it?',
    timestamp: '2024-01-15T14:35:00.000Z',
    type: 'text',
    read: true
  },
  {
    id: '3',
    senderId: '2',
    content: 'Definitely! When can we meet?',
    timestamp: '2024-01-15T14:40:00.000Z',
    type: 'text',
    read: false
  }
];

export const mockChats: Chat[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    messages: mockMessages,
    lastMessage: mockMessages[2],
    unreadCount: 1,
    itemId: '1',
    itemType: 'product'
  },
  {
    id: '2',
    participants: [mockUsers[1], mockUsers[2]],
    messages: [],
    lastMessage: {
      id: '4',
      senderId: '3',
      content: 'Thanks for the tutoring session!',
      timestamp: '2024-01-14T16:20:00.000Z',
      type: 'text',
      read: true
    },
    unreadCount: 0,
    itemId: '2',
    itemType: 'service'
  }
];