import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addRequest } from '../redux/slices/requestsSlice';
import { motion } from 'framer-motion';
import { Clock, Tag, FileText } from 'lucide-react';

const CreateRequest: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now().toString(),
      title,
      description,
      category,
      estimatedHours: parseInt(estimatedHours),
      status: 'open' as const,
      bidCount: 0,
      userId: 'currentUser', // Should come from auth context
      createdAt: new Date().toISOString(),
    };
    
    dispatch(addRequest(newRequest));
    navigate('/search');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Service Request</h1>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              <FileText className="inline-block mr-2" />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter a clear title for your request"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              <Tag className="inline-block mr-2" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            >
              <option value="">Select a category</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              <Clock className="inline-block mr-2" />
              Estimated Hours
            </label>
            <input
              type="number"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Estimated hours needed"
              min="1"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-600 h-32"
              placeholder="Describe your request in detail"
              required
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Create Request
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate('/search')}
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;