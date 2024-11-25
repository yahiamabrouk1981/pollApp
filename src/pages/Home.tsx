import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePoll } from '../contexts/PollContext';
import PollCard from '../components/PollCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { user } = useAuth();
  const { polls } = usePoll();

  const activePolls = polls.filter(
    poll => new Date(poll.endsAt) > new Date()
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Active Polls</h1>
            <p className="mt-2 text-lg text-gray-600">
              Vote on trending topics or create your own poll
            </p>
          </div>
          {user && (
            <Link
              to="/create"
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Poll
            </Link>
          )}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activePolls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
          {activePolls.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No active polls. Be the first to create one!
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}