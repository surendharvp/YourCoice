import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { addTransaction } from '../redux/slices/transactionsSlice';
import { updateTimeBalance } from '../redux/slices/userSlice';

const BookingExchange: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const skillId = searchParams.get('skillId');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBooking = () => {
    // Simulating booking process
    const bookingCost = 2; // hours
    dispatch(updateTimeBalance(-bookingCost));
    dispatch(addTransaction({
      id: Date.now().toString(),
      type: 'spent',
      amount: bookingCost,
      skill: 'Web Development', // This should be dynamic based on the selected skill
      date: new Date().toISOString(),
    }));

    // Here you would typically make an API call to confirm the booking
    console.log('Booking confirmed for skill:', skillId, 'on', selectedDate, 'at', selectedTime);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Book Skill Exchange</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Select Date and Time</h2>
        <div className="mb-4">
          <label className="block mb-2">Date:</label>
          <input
            type="date"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Time:</label>
          <input
            type="time"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">BookingSummary</h2>
        <div className="flex items-center mb-2">
          <Calendar className="mr-2 text-red-600" />
          <span>Date: {selectedDate || 'Not selected'}</span>
        </div>
        <div className="flex items-center mb-4">
          <Clock className="mr-2 text-green-500" />
          <span>Time: {selectedTime || 'Not selected'}</span>
        </div>
        <p className="text-gray-300">Time Bank Balance: 24 hours</p>
        <p className="text-gray-300">Cost: 2 hours</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 flex items-center"
        onClick={handleBooking}
      >
        <CheckCircle className="mr-2" />
        Confirm Booking
      </motion.button>
    </div>
  );
};

export default BookingExchange;