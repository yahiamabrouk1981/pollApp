import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Vote, PlusSquare, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 dark:bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Vote className="h-8 w-8" />
            <span className="font-bold text-xl">Poll App</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-indigo-500 dark:bg-gray-700 hover:bg-indigo-400 dark:hover:bg-gray-600 transition-colors"
                >
                  <PlusSquare className="h-5 w-5" />
                  <span>Create Poll</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 hover:opacity-80"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-indigo-500 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-indigo-500 dark:bg-gray-700 hover:bg-indigo-400 dark:hover:bg-gray-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
