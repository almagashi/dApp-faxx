import React, { useState } from 'react';
import Header from './components/Header';
import ArticlesFeed from './components/ArticlesFeed';
import AddFaxx from './components/AddFaxx';
import Profile from './components/Profile';
import PostArticle from './components/PostArticle';
import Login from './components/Login';
import useAuth from './components/useAuth';
import faxxLogo from "./faxx_dark.png";

function App() {
  const { authenticated, login } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAddFaxxOpen, setIsAddFaxxOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const handleAddFaxx = (article) => {
    setCurrentArticle(article);
    setIsAddFaxxOpen(true);
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile />;
      case 'postArticle':
        return <PostArticle />;
      default:
        return <ArticlesFeed />;
    }
  };

  if (!authenticated) {
    return (
      <div className="App bg-black min-h-screen flex flex-col items-center justify-center text-white">
        <img src={faxxLogo} alt="Faxx Logo" className="w-48 mb-8" />
        <h1 className="text-4xl font-bold mb-4">Welcome to Faxx</h1>
        <p className="text-xl mb-8">Get your facts checked and stay informed</p>
        <Login onLogin={login} />
      </div>
    );
  }

  return (
    <div className="App bg-black min-h-screen flex flex-col">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
      <main className="flex-grow w-full px-4 py-8">
        {renderMainContent()}
      </main>
      {isAddFaxxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg relative max-w-2xl w-full">
            <button
              onClick={() => setIsAddFaxxOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              ×
            </button>
            <AddFaxx article={currentArticle} onClose={() => setIsAddFaxxOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
