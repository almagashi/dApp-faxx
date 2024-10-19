import React, { useState, useEffect } from 'react';
import { usePrivy } from "@privy-io/react-auth";
import "./App.css";
import PostArticle from './components/PostArticle'; // Make sure this path is correct
import Profile from './components/Profile'; // Make sure this path is correct
import faxxLogo from "./faxx_dark.png"; // Make sure this path is correct

function App() {
  const { ready, authenticated, login, logout } = usePrivy();
  const [showPostArticle, setShowPostArticle] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Auth state:", { ready, authenticated });
  }, [ready, authenticated]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="App bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen flex flex-col items-center justify-center">
        <button 
          onClick={login} 
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-blue-700 hover:to-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 backdrop-filter backdrop-blur-sm bg-opacity-70"
        >
          Log In
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    setShowPostArticle(false);
    setShowProfile(false);
    setShowDropdown(false);
    logout();
  };

  try {
    return (
      <div className="App bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <img src={faxxLogo} alt="Faxx Logo" className="w-24" />
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-blue-600 rounded-full text-white flex items-center justify-center focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button 
                  onClick={() => {setShowProfile(true); setShowDropdown(false); setShowPostArticle(false);}}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4">
          {showProfile ? (
            <Profile />
          ) : showPostArticle ? (
            <PostArticle />
          ) : (
            <>
              <div className="bg-white bg-opacity-10 rounded-xl p-8 mb-8 w-full max-w-2xl">
                <h2 className="text-2xl text-white mb-4">News Feed Placeholder</h2>
                <p className="text-gray-300">Your news feed will appear here.</p>
              </div>
              <button
                onClick={() => setShowPostArticle(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Post News
              </button>
            </>
          )}
        </main>
      </div>
    );
  } catch (err) {
    console.error("Render error:", err);
    setError(err);
    return null;
  }
}

export default App;