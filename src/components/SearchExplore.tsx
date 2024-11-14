import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchRequests } from '../redux/slices/requestsSlice';
import { Search, Filter, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchExplore: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: requests, loading, error } = useAppSelector((state) => state.requests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const filteredRequests = requests.filter(request =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Browse Service Requests</h1>
        <Link
          to="/create-request"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Post New Request
        </Link>
      </div>

      <div className="flex mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search requests..."
            className="w-full p-3 pr-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-3 text-gray-400" />
        </div>
        <button
          className="ml-4 bg-red-600 text-white p-3 rounded-lg flex items-center hover:bg-red-700 transition duration-300"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter className="mr-2" />
          Filters
        </button>
      </div>

      {filterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-800 p-4 rounded-lg shadow-md mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="bg-gray-700 text-white p-2 rounded">
              <option>Category</option>
              <option>Development</option>
              <option>Design</option>
              <option>Writing</option>
            </select>
            <select className="bg-gray-700 text-white p-2 rounded">
              <option>Budget Range</option>
              <option>1-2 hours</option>
              <option>2-5 hours</option>
              <option>5+ hours</option>
            </select>
            <select className="bg-gray-700 text-white p-2 rounded">
              <option>Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </motion.div>
      )}

      {loading ? (
        <p className="text-white">Loading requests...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <Link key={request.id} to={`/request/${request.id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <span className={`inline-block px-3 py-1 rounded-full text-sm mb-3 ${
                  request.status === 'open' ? 'bg-green-600' : 
                  request.status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-600'
                }`}>
                  {request.status.replace('_', ' ').toUpperCase()}
                </span>
                <h3 className="text-xl font-semibold mb-2 text-white">{request.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{request.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{request.estimatedHours} hours</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{request.bidCount} bids</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchExplore;