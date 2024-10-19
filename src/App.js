import React, { useState, useEffect } from 'react';
import { usePrivy } from "@privy-io/react-auth";
import "./App.css";
import PostArticle from './components/PostArticle'; // Adjust this import path if necessary
import faxxLogo from "./faxx_dark.png";

function App() {
  const { ready, authenticated, login, logout } = usePrivy();
  const [showPostArticle, setShowPostArticle] = useState(false);

  // Reset showPostArticle when authentication state changes
  useEffect(() => {
    if (!authenticated) {
      setShowPostArticle(false);
    }
  }, [authenticated]);

  if (!ready) {
    return null;
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
    logout();
  };

  return (
    <div className="App bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <img src={faxxLogo} alt="Faxx Logo" className="w-24" />
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Log Out
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {showPostArticle ? (
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
}

export default App;