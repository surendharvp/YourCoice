import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Plus } from 'lucide-react';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/userSlice';

const ProfileManagement: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleSaveProfile = () => {
    dispatch(setUser({
      ...user,
      name,
      email,
      // Add other fields as needed
    }));
    // Here you would typically make an API call to update the user profile
    console.log('Profile saved');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Profile Management</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block mb-2">Name:</label>
          <div className="flex items-center">
            <User className="mr-2 text-gray-400" />
            <input
              type="text"
              className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Email:</label>
          <div className="flex items-center">
            <Mail className="mr-2 text-gray-400" />
            <input
              type="email"
              className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Phone:</label>
          <div className="flex items-center">
            <Phone className="mr-2 text-gray-400" />
            <input
              type="tel"
              className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Location:</label>
          <div className="flex items-center">
            <MapPin className="mr-2 text-gray-400" />
            <input
              type="text"
              className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2">Skills:</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-red-600 text-white px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-l text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button
              className="bg-red-600 text-white p-2 rounded-r hover:bg-red-700 transition duration-300"
              onClick={handleAddSkill}
            >
              <Plus />
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          onClick={handleSaveProfile}
        >
          Save Profile
        </motion.button>
      </div>
    </div>
  );
};

export default ProfileManagement;