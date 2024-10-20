import React, { useState, useEffect } from 'react';
import { usePrivy } from "@privy-io/react-auth";
import "./App.css";
import Header from './components/Header';
import PostArticle from './components/PostArticle';
import Profile from './components/Profile';
import NewsArticle from './components/NewsArticle';
import "react-mde/lib/styles/css/react-mde-all.css";
import ArticlesFeed from './components/ArticlesFeed';
import AddFaxx from './components/AddFaxx';

function App() {
  const { ready, authenticated, login } = usePrivy();
  const [currentPage, setCurrentPage] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const { articles, loading, error: articleError } = ArticlesFeed();
  const [isAddFaxxOpen, setIsAddFaxxOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  useEffect(() => {
    console.log("Auth state:", { ready, authenticated });
  }, [ready, authenticated]);

  if (error || articleError) {
    return <div>Error: {error ? error.message : articleError}</div>;
  }

  if (!ready || loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="App bg-black min-h-screen flex flex-col items-center justify-center">
        <button 
          onClick={login} 
          className="px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-gray-900 hover:to-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-70"
        >
          Log In
        </button>
      </div>
    );
  }

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
        return (
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl text-white mb-6">Recent Claims</h2>
            {articles.map((article, index) => (
              <div key={article.id} className="mb-6">
                <NewsArticle
                  title={article.title}
                  summary={article.summary}
                  author={article.author}
                  tags={article.tags}
                  onAddFaxx={() => handleAddFaxx(article)}
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="App bg-black min-h-screen flex flex-col">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
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
