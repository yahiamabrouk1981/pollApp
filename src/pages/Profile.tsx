import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATAR_OPTIONS[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      await updateProfile(name, selectedAvatar);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={selectedAvatar}
                  alt={name}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setShowAvatarOptions(!showAvatarOptions)}
                  className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>

              {showAvatarOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  {AVATAR_OPTIONS.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setShowAvatarOptions(false);
                      }}
                      className={`relative rounded-full overflow-hidden h-16 w-16 ${
                        selectedAvatar === avatar ? 'ring-2 ring-indigo-600' : ''
                      }`}
                    >
                      <img src={avatar} alt="Avatar option" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="input dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn btn-secondary dark:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}