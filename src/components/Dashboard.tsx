import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../hooks/useAppSelector';
import { Clock, Book, Bell, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const notifications = useAppSelector((state) => state.notifications.list);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Welcome, {user.name}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <Clock className="text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-white">Time Bank Balance</h2>
            </div>
            <p className="text-3xl font-bold text-red-600">{user.timeBalance} hours</p>
            <p className="text-sm text-gray-400 mt-2">Available to spend</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <Book className="text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-white">Upcoming Bookings</h2>
            </div>
            <p className="text-3xl font-bold text-green-500">3</p>
            <p className="text-sm text-gray-400 mt-2">Scheduled this week</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <Bell className="text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>
            <p className="text-3xl font-bold text-yellow-500">{notifications.length}</p>
            <p className="text-sm text-gray-400 mt-2">New messages</p>
          </motion.div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkillCard title="Web Development" rating={4.5} />
            <SkillCard title="Graphic Design" rating={4.0} />
            <SkillCard title="Language Tutoring" rating={4.8} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillCard: React.FC<{ title: string; rating: number }> = ({ title, rating }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 p-4 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <div className="flex items-center">
        <Star className="text-yellow-500 mr-1" />
        <span className="text-gray-300">{rating.toFixed(1)}</span>
      </div>
    </motion.div>
  );
};

export default Dashboard;