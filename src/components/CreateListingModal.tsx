import React, { useState } from 'react';
import { X, Upload, MapPin, Tag, DollarSign, Camera, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { Product, Service, Request } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'product' | 'service' | 'request';
}

const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, type }) => {
  const { user } = useAuth();
  const { addProduct, addService, addRequest } = useMarketplace();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'INR',
    negotiable: false,
    category: '',
    subcategory: '',
    condition: 'good',
    location: '',
    tags: [] as string[],
    specifications: {} as Record<string, string>,
    warranty: '',
    returnPolicy: '',
    duration: '',
    requirements: [] as string[],
    deliverables: [] as string[],
    urgency: 'medium',
    deadline: '',
    budget: ''
  });
  const [newTag, setNewTag] = useState('');
  const [newSpec, setNewSpec] = useState({ key: '', value: '' });
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const categories = {
    product: [
      { value: 'electronics', label: 'Electronics', subcategories: ['Laptops', 'Phones', 'Accessories', 'Gaming'] },
      { value: 'books', label: 'Books', subcategories: ['Textbooks', 'Novels', 'Reference', 'Study Guides'] },
      { value: 'apparel', label: 'Apparel', subcategories: ['Clothing', 'Shoes', 'Accessories', 'Bags'] },
      { value: 'furniture', label: 'Furniture', subcategories: ['Study Table', 'Chair', 'Storage', 'Decor'] },
      { value: 'sports', label: 'Sports', subcategories: ['Equipment', 'Clothing', 'Accessories', 'Fitness'] }
    ],
    service: [
      { value: 'academic', label: 'Academic', subcategories: ['Assignment Help', 'Research', 'Proofreading', 'Translation'] },
      { value: 'tutoring', label: 'Tutoring', subcategories: ['Math', 'Science', 'Programming', 'Languages'] },
      { value: 'technical', label: 'Technical', subcategories: ['Web Development', 'App Development', 'Design', 'IT Support'] },
      { value: 'creative', label: 'Creative', subcategories: ['Graphic Design', 'Writing', 'Photography', 'Video Editing'] }
    ],
    request: [
      { value: 'products', label: 'Products', subcategories: ['Electronics', 'Books', 'Furniture', 'Clothing'] },
      { value: 'services', label: 'Services', subcategories: ['Academic', 'Technical', 'Creative', 'Personal'] },
      { value: 'academic', label: 'Academic', subcategories: ['Study Group', 'Notes', 'Project Help', 'Exam Prep'] }
    ]
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Clear the input
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (images.length + imageFiles.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    // Process dropped files similar to file input
    const validFiles = imageFiles.filter(file => {
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidSize) {
        alert(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addSpecification = () => {
    if (newSpec.key.trim() && newSpec.value.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpec.key.trim()]: newSpec.value.trim()
        }
      }));
      setNewSpec({ key: '', value: '' });
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Validation
    if (type === 'product' && images.length === 0) {
      alert('Please add at least one image for your product');
      return;
    }

    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (!formData.category) {
      alert('Please select a category');
      return;
    }

    if (!formData.location.trim()) {
      alert('Please enter a location');
      return;
    }

    if ((type === 'product' || type === 'service') && (!formData.price || parseFloat(formData.price) <= 0)) {
      alert('Please enter a valid price');
      return;
    }

    if (type === 'request' && (!formData.budget || parseFloat(formData.budget) <= 0)) {
      alert('Please enter a valid budget');
      return;
    }

    const baseData = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
      location: formData.location,
      datePosted: new Date().toISOString(),
      views: 0,
      saves: 0,
      tags: formData.tags,
    };

    try {
      if (type === 'product') {
        const newProduct: Product = {
          ...baseData,
          price: parseFloat(formData.price),
          currency: formData.currency as 'INR',
          negotiable: formData.negotiable,
          condition: formData.condition as any,
          images: images,
          sellerId: user.id,
          seller: user,
          availability: 'available' as const,
          specifications: formData.specifications,
          warranty: formData.warranty,
          returnPolicy: formData.returnPolicy,
        };
        addProduct(newProduct);
      } else if (type === 'service') {
        const newService: Service = {
          ...baseData,
          price: parseFloat(formData.price),
          currency: formData.currency as 'INR',
          negotiable: formData.negotiable,
          duration: formData.duration,
          providerId: user.id,
          provider: user,
          availability: 'available' as const,
          images: images,
          requirements: formData.requirements,
          deliverables: formData.deliverables,
        };
        addService(newService);
      } else if (type === 'request') {
        const newRequest: Request = {
          ...baseData,
          budget: parseFloat(formData.budget),
          currency: formData.currency as 'INR',
          urgency: formData.urgency as any,
          requesterId: user.id,
          requester: user,
          status: 'open' as const,
          deadline: formData.deadline,
          responses: 0,
          requirements: formData.requirements,
        };
        addRequest(newRequest);
      }

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        price: '',
        currency: 'INR',
        negotiable: false,
        category: '',
        subcategory: '',
        condition: 'good',
        location: '',
        tags: [] as string[],
        specifications: {} as Record<string, string>,
        warranty: '',
        returnPolicy: '',
        duration: '',
        requirements: [] as string[],
        deliverables: [] as string[],
        urgency: 'medium',
        deadline: '',
        budget: ''
      });
      setImages([]);
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    }
  };

  const selectedCategory = categories[type].find(cat => cat.value === formData.category);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Create {type === 'product' ? 'Product Listing' : type === 'service' ? 'Service Listing' : 'Request'}
            </h2>
            <p className="text-sm text-gray-400">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {type === 'product' ? 'Product' : type === 'service' ? 'Service' : 'Request'} Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={`Enter ${type} title...`}
                  className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a detailed description..."
                  rows={4}
                  className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value, subcategory: '' }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select category</option>
                    {categories[type].map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subcategory</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={!selectedCategory}
                  >
                    <option value="">Select subcategory</option>
                    {selectedCategory?.subcategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {type === 'product' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Condition *</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="used">Used</option>
                    <option value="for-parts">For Parts</option>
                  </select>
                </div>
              )}

              {type === 'request' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Urgency</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Pricing and Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {type === 'request' ? 'Budget' : 'Price'} *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={type === 'request' ? formData.budget : formData.price}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        [type === 'request' ? 'budget' : 'price']: e.target.value 
                      }))}
                      placeholder="0"
                      className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              {type !== 'request' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="negotiable"
                    checked={formData.negotiable}
                    onChange={(e) => setFormData(prev => ({ ...prev, negotiable: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="negotiable" className="text-sm text-gray-300">
                    Price is negotiable
                  </label>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location..."
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {type === 'service' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 2-3 days, 1 week, per hour"
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {type === 'request' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                  <input
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <div className="flex space-x-2 mb-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tags..."
                      className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Images and Additional Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Images ({images.length}/5)
                  {type === 'product' && (
                    <>
                      <span className="text-red-400 ml-1">*</span>
                      {images.length === 0 && (
                        <span className="text-red-400 ml-1">At least 1 image required</span>
                      )}
                    </>
                  )}
                  {type === 'service' && (
                    <span className="text-gray-400 ml-1">(Optional - showcase your work)</span>
                  )}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden group">
                      <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex space-x-1">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => moveImage(index, index - 1)}
                              className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                              title="Move left"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                          )}
                          {index < images.length - 1 && (
                            <button
                              type="button"
                              onClick={() => moveImage(index, index + 1)}
                              className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                              title="Move right"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                        {index === 0 ? 'Main' : index + 1}
                      </div>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label 
                      className={`aspect-square bg-gray-700 rounded-lg border-2 border-dashed transition-colors cursor-pointer flex flex-col items-center justify-center group ${
                        isDragging 
                          ? 'border-purple-400 bg-purple-900/20' 
                          : 'border-gray-600 hover:border-purple-500'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Upload className={`w-8 h-8 mb-2 transition-colors ${
                        isDragging 
                          ? 'text-purple-400' 
                          : 'text-gray-400 group-hover:text-purple-400'
                      }`} />
                      <span className={`text-sm text-center transition-colors ${
                        isDragging 
                          ? 'text-purple-400' 
                          : 'text-gray-400 group-hover:text-purple-400'
                      }`}>
                        {isDragging 
                          ? 'Drop images here' 
                          : images.length === 0 
                            ? 'Add Images' 
                            : 'Add More'
                        }
                        <br />
                        <span className="text-xs">
                          {isDragging ? 'Release to upload' : 'Drag & drop or click • Max 5MB each'}
                        </span>
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                {images.length > 0 && (
                  <p className="text-xs text-gray-400">
                    💡 Tip: The first image will be used as the main product image
                  </p>
                )}
              </div>

              {/* Specifications for Products */}
              {type === 'product' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Specifications</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={newSpec.key}
                      onChange={(e) => setNewSpec(prev => ({ ...prev, key: e.target.value }))}
                      placeholder="Specification name"
                      className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      value={newSpec.value}
                      onChange={(e) => setNewSpec(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="Value"
                      className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={addSpecification}
                      className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(formData.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <span className="font-medium text-white capitalize">{key.replace('_', ' ')}</span>
                          <span className="text-gray-400 ml-2">{value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSpecification(key)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional fields for products */}
              {type === 'product' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Warranty</label>
                    <input
                      type="text"
                      value={formData.warranty}
                      onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
                      placeholder="e.g., 1 year manufacturer warranty"
                      className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Return Policy</label>
                    <input
                      type="text"
                      value={formData.returnPolicy}
                      onChange={(e) => setFormData(prev => ({ ...prev, returnPolicy: e.target.value }))}
                      placeholder="e.g., 7 days return policy"
                      className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-700 mt-6">
            <button
              type="button"
              onClick={() => currentStep > 1 ? setCurrentStep(prev => prev - 1) : onClose()}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              {currentStep > 1 ? 'Previous' : 'Cancel'}
            </button>
            
            <div className="flex space-x-3">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300"
                >
                  Create Listing
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;