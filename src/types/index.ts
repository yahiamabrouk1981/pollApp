export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  creator: User;
  createdAt: string;
  endsAt: string;
  totalVotes: number;
}