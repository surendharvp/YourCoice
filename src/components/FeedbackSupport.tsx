import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';

const FeedbackSupport: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { type: feedbackType, message });
    // Implement submission logic here
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Feedback & Support</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block mb-2">Type:</label>
          <div className="flex">
            <button
              className={`flex-1 py-2 px-4 rounded-l ${feedbackType === 'feedback' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFeedbackType('feedback')}
            >
              Feedback
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-r ${feedbackType === 'support' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setFeedbackType('support')}
            >
              Support
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2">Your Message:</label>
            <textarea
              id="message"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 flex items-center"
          >
            <Send className="mr-2" />
            Submit
          </motion.button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Need immediate assistance?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center"
          >
            <MessageCircle className="mr-2" />
            Start Live Chat
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSupport;