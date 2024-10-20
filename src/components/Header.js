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

  const showPostClaimButton = currentPage === 'home' || currentPage === 'profile';

  return (
    <div>
      <header className="p-4 flex justify-between items-center">
        <img 
          src={faxxLogo} 
          alt="Faxx Logo" 
          className="w-24 cursor-pointer" 
          onClick={() => setCurrentPage('home')}
        />
        <div className="flex items-center">
          {showPostClaimButton && (
            <button
              onClick={() => setCurrentPage('postArticle')}
              className="mr-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              get faxx-checked
            </button>
          )}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-gray-800 rounded-full text-gray-300 flex items-center justify-center focus:outline-none hover:bg-gray-700 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-1 overflow-hidden border border-gray-800">
                <button 
                  onClick={() => {setCurrentPage('profile'); setShowDropdown(false);}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
