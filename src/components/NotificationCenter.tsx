import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Bell, MessageCircle, Calendar, Star } from 'lucide-react';
import { RootState } from '../redux/store';
import { markAllAsRead } from '../redux/slices/notificationsSlice';

const NotificationCenter: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.list);

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="text-blue-500" />;
      case 'booking':
        return <Calendar className="text-green-500" />;
      case 'review':
        return <Star className="text-yellow-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notification Center</h1>
        <button
          onClick={handleMarkAllAsRead}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Mark All as Read
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700"
          >
            <div className="mr-4">{getIcon(notification.type)}</div>
            <div className="flex-grow">
              <p className="font-semibold">{notification.content}</p>
              <p className="text-sm text-gray-400">{notification.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;