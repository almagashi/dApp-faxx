import React from 'react';
import { usePrivy } from "@privy-io/react-auth";
import faxxLogo from "../faxx_dark.png";

function Header({ currentPage, setCurrentPage, showDropdown, setShowDropdown }) {
  const { logout } = usePrivy();

  const handleLogout = () => {
    setCurrentPage('home');
    setShowDropdown(false);
    logout();
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <img 
        src={faxxLogo} 
        alt="Faxx Logo" 
        className="w-24 cursor-pointer" 
        onClick={() => setCurrentPage('home')}
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentPage('postArticle')}
          className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          Post News
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 bg-gray-700 rounded-full text-white flex items-center justify-center focus:outline-none hover:bg-gray-800 transition duration-300 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
              <button 
                onClick={() => {setCurrentPage('profile'); setShowDropdown(false);}}
                className="block w-full text-left px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
              >
                Profile
              </button>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-6 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;