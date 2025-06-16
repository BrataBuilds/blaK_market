import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Shield, Zap, Star, TrendingUp } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">BLA<span className="text-green-400">K</span>MARKET</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The exclusive marketplace for KIIT University students. Buy, sell, trade, and request anything you need for your academic journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/marketplace"
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose BLA<span className="text-green-400">K</span>MARKET?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built exclusively for KIIT students, with features designed to make campus trading safe, simple, and rewarding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Verified</h3>
              <p className="text-gray-400">
                Only KIIT students can join. Every user is verified with their university email for a safe trading environment.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Campus Community</h3>
              <p className="text-gray-400">
                Connect with fellow students, build relationships, and support each other's academic and personal needs.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Points & Rewards</h3>
              <p className="text-gray-400">
                Earn points through trading activities and redeem them for discounts and exclusive services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Can You Find?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From textbooks to tutoring, electronics to apparel - everything a student needs.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', icon: '💻', description: 'Laptops, phones, gadgets' },
              { name: 'Books', icon: '📚', description: 'Textbooks, novels, study guides' },
              { name: 'Services', icon: '🎓', description: 'Tutoring, academic help' },
              { name: 'Apparel', icon: '👕', description: 'Clothing, shoes, accessories' }
            ].map((category, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">1,200+</div>
              <div className="text-gray-400">Items Listed</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white">4.8</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Community?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Sign up with your KIIT email and start trading with your fellow students today.
          </p>
          <Link
            to="/register"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;