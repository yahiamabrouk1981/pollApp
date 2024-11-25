import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowLeft } from 'lucide-react';
import { usePoll } from '../contexts/PollContext';
import { useAuth } from '../contexts/AuthContext';

export default function PollDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { polls, votePoll } = usePoll();
  const { user } = useAuth();

  const poll = polls.find(p => p.id === id);

  if (!poll) {
    return <div>Poll not found</div>;
  }

  const timeLeft = new Date(poll.endsAt).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  const handleVote = (optionId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    votePoll(poll.id, optionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Polls
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{poll.question}</h1>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {poll.totalVotes} votes
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {daysLeft} days left
            </div>
          </div>

          <div className="space-y-4">
            {poll.options.map((option) => (
              <motion.div
                key={option.id}
                className="relative"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  onClick={() => handleVote(option.id)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{option.text}</span>
                    <span className="text-sm text-gray-500">
                      {poll.totalVotes > 0
                        ? `${Math.round((option.votes / poll.totalVotes) * 100)}%`
                        : '0%'}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0}%`
                      }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Created by {poll.creator.name} · {new Date(poll.createdAt).toLocaleDateString()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}