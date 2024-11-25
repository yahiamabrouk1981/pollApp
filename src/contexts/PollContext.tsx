import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Poll, PollOption, User } from '../types';
import { useAuth } from './AuthContext';

interface PollContextType {
  polls: Poll[];
  createPoll: (question: string, options: string[], durationDays: number) => void;
  votePoll: (pollId: string, optionId: string) => void;
}

const PollContext = createContext<PollContextType | null>(null);

export function usePoll() {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePoll must be used within a PollProvider');
  }
  return context;
}

export function PollProvider({ children }: { children: React.ReactNode }) {
  const [polls, setPolls] = useState<Poll[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedPolls = localStorage.getItem('polls');
    if (storedPolls) {
      setPolls(JSON.parse(storedPolls));
    }
  }, []);

  const createPoll = (question: string, optionTexts: string[], durationDays: number) => {
    if (!user) return;

    const newPoll: Poll = {
      id: Date.now().toString(),
      question,
      options: optionTexts.map((text, index) => ({
        id: `${Date.now()}-${index}`,
        text,
        votes: 0
      })),
      creator: user,
      createdAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString(),
      totalVotes: 0
    };

    const updatedPolls = [newPoll, ...polls];
    setPolls(updatedPolls);
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
  };

  const votePoll = (pollId: string, optionId: string) => {
    const updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(option => {
          if (option.id === optionId) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });
        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    });

    setPolls(updatedPolls);
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
  };

  return (
    <PollContext.Provider value={{ polls, createPoll, votePoll }}>
      {children}
    </PollContext.Provider>
  );
}