import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar } from 'lucide-react';

const SkillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [skill, setSkill] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setSkill({
        id,
        title: 'Web Development',
        provider: 'John Doe',
        rating: 4.5,
        description: 'Learn web development from an experienced professional. Covers HTML, CSS, JavaScript, and modern frameworks.',
        duration: 2,
        availability: ['Mon', 'Wed', 'Fri'],
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 p-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">{skill.title}</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl">Offered by: {skill.provider}</p>
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-1" />
            <span>{skill.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-300 mb-4">{skill.description}</p>
        <div className="flex items-center mb-2">
          <Clock className="mr-2 text-red-600" />
          <span>Duration: {skill.duration} hours</span>
        </div>
        <div className="flex items-center">
          <Calendar className="mr-2 text-green-500" />
          <span>Available on: {skill.availability.join(', ')}</span>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={`/booking?skillId=${id}`}
          className="bg-red-600 text-white px-6 py-3 rounded-lg inline-block font-semibold hover:bg-red-700 transition duration-300"
        >
          Book This Skill
        </Link>
      </motion.div>
    </div>
  );
};

export default SkillDetail;