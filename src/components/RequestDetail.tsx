import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { motion } from 'framer-motion';
import { Clock, Calendar, User, DollarSign, MessageSquare } from 'lucide-react';

const RequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const request = useAppSelector(state => 
    state.requests.list.find(r => r.id === id)
  );
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching bids
    setBids([
      {
        id: '1',
        providerId: 'provider1',
        providerName: 'John Doe',
        amount: 15,
        message: 'I can help you with this project. I have 5 years of experience in similar projects.',
        rating: 4.8,
      },
      {
        id: '2',
        providerId: 'provider2',
        providerName: 'Jane Smith',
        amount: 18,
        message: 'Available to start immediately. Expert in this domain with proven track record.',
        rating: 4.5,
      },
    ]);
  }, [id]);

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    // Add bid submission logic here
    console.log('Bid submitted:', { amount: bidAmount, message: bidMessage });
    setBidAmount('');
    setBidMessage('');
  };

  if (!request) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">Request not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{request.title}</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              request.status === 'open' ? 'bg-green-600' : 
              request.status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-600'
            }`}>
              {request.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className="flex items-center text-gray-300">
              <Clock className="w-4 h-4 mr-1" />
              {request.estimatedHours} hours
            </span>
            <span className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-1" />
              Posted {new Date(request.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-300 mb-6">{request.description}</p>
        </div>

        {request.status === 'open' && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Submit Your Bid</h2>
            <form onSubmit={handleSubmitBid}>
              <div className="mb-4">
                <label className="block mb-2">Bid Amount (hours)</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white"
                  min="1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Message to Client</label>
                <textarea
                  value={bidMessage}
                  onChange={(e) => setBidMessage(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white h-32"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
              >
                Submit Bid
              </motion.button>
            </form>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Current Bids ({bids.length})</h2>
          <div className="space-y-4">
            {bids.map((bid) => (
              <div key={bid.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{bid.providerName}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-1" />
                    <span className="font-semibold">{bid.amount} hours</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-2">{bid.message}</p>
                {request.status === 'open' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition duration-300"
                    onClick={() => {
                      // Add logic to accept bid
                      console.log('Accepting bid:', bid.id);
                    }}
                  >
                    Accept Bid
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;