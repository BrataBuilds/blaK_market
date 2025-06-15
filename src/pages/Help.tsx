import React, { useState } from 'react';
import { Search, MessageCircle, Mail, Phone, ChevronDown, ChevronRight, HelpCircle, Book, Shield, AlertTriangle } from 'lucide-react';

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [supportForm, setSupportForm] = useState({
    subject: '',
    category: 'general',
    description: '',
    priority: 'medium'
  });

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      faqs: [
        {
          id: '1',
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Register" button and use your KIIT university email address. You\'ll need to verify your email before you can start using the platform.'
        },
        {
          id: '2',
          question: 'How do I post my first listing?',
          answer: 'After logging in, click the "Post Item" button in the marketplace. Fill in the required details including title, description, price, and upload images. Your listing will be live immediately after submission.'
        }
      ]
    },
    {
      id: 'buying-selling',
      title: 'Buying & Selling',
      icon: <MessageCircle className="w-5 h-5" />,
      faqs: [
        {
          id: '3',
          question: 'How do I contact a seller?',
          answer: 'Click on any listing and use the "Contact Seller" button to start a conversation. You can also message them directly through the chat system.'
        },
        {
          id: '4',
          question: 'Is it safe to buy from other students?',
          answer: 'Yes, all users are verified KIIT students. We also have a rating system and report functionality to ensure safe transactions. Always meet in public places on campus.'
        }
      ]
    },
    {
      id: 'account-security',
      title: 'Account & Security',
      icon: <Shield className="w-5 h-5" />,
      faqs: [
        {
          id: '5',
          question: 'How do I verify my account?',
          answer: 'Account verification is automatic when you register with your KIIT email. The verification badge appears once you complete your profile and have successful transactions.'
        },
        {
          id: '6',
          question: 'What should I do if I suspect fraud?',
          answer: 'Report the user immediately using the report button on their profile or listing. Our moderation team will investigate and take appropriate action.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.flatMap(category => 
    category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support form submission
    console.log('Support ticket submitted:', supportForm);
    alert('Support ticket submitted successfully!');
    setSupportForm({ subject: '', category: 'general', description: '', priority: 'medium' });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Help & Support</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            
            {searchQuery ? (
              <div className="space-y-4">
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-8">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredFAQs.map((faq) => (
                    <div key={faq.id} className="bg-gray-800 rounded-lg p-6">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {faqCategories.map((category) => (
                  <div key={category.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                      className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-600 rounded-lg">
                          {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                      </div>
                      {activeCategory === category.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {activeCategory === category.id && (
                      <div className="border-t border-gray-700">
                        {category.faqs.map((faq) => (
                          <div key={faq.id} className="border-b border-gray-700 last:border-b-0">
                            <button
                              onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                              className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-750 transition-colors"
                            >
                              <span className="text-white">{faq.question}</span>
                              {expandedFAQ === faq.id ? (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                            {expandedFAQ === faq.id && (
                              <div className="px-4 pb-4">
                                <p className="text-gray-300">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href="mailto:support@blakmarket.kiit.ac.in"
                  className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Email Support</div>
                    <div className="text-sm text-gray-400">support@blakmarket.kiit.ac.in</div>
                  </div>
                </a>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Live Chat</div>
                    <div className="text-sm text-gray-400">Available 9 AM - 6 PM</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Campus Help Desk</div>
                    <div className="text-sm text-gray-400">Library, Ground Floor</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Ticket */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Submit a Ticket</h3>
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={supportForm.category}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="general">General</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="payment">Payment Issue</option>
                    <option value="abuse">Report Abuse</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                  <select
                    value={supportForm.priority}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={supportForm.description}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Submit Ticket
                </button>
              </form>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold text-red-400">Emergency</h4>
              </div>
              <p className="text-sm text-red-300 mb-3">
                For urgent security issues or emergencies, contact campus security immediately.
              </p>
              <div className="text-sm text-red-400 font-medium">
                Campus Security: +91-674-2725-555
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;