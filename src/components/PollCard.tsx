import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import type { Poll } from '../types';

interface PollCardProps {
  poll: Poll;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function PollCard({ poll }: PollCardProps) {
  const timeLeft = new Date(poll.endsAt).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {poll.question}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {poll.totalVotes} votes
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {daysLeft} days left
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {poll.options.slice(0, 2).map((option) => (
          <div key={option.id} className="relative">
            <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: `${poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0}%`,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                className="h-full bg-indigo-500"
              />
            </div>
            <span className="absolute inset-y-0 left-3 flex items-center text-sm text-white font-medium">
              {option.text}
            </span>
          </div>
        ))}
      </div>

      <Link
        to={`/poll/${poll.id}`}
        className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
      >
        Vote Now
      </Link>
    </motion.div>
  );
}