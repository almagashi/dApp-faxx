import React, { useState, useEffect } from 'react';
import { usePrivy } from "@privy-io/react-auth";
import "./App.css";
import Header from './components/Header';
import PostArticle from './components/PostArticle';
import Profile from './components/Profile';
import NewsArticle from './components/NewsArticle';
import "react-mde/lib/styles/css/react-mde-all.css";
import ArticlesFeed from './components/ArticlesFeed';

function App() {
  const { ready, authenticated, login } = usePrivy();
  const [currentPage, setCurrentPage] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const { articles, loading, error: articleError } = ArticlesFeed();

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

  const renderMainContent = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile />;
      case 'postArticle':
        return <PostArticle />;
      default:
        return (
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl text-white mb-6">Latest News</h2>
            {articles.map(article => (
              <NewsArticle
                key={article.id}
                title={article.title}
                summary={article.summary}
                author={article.author}
                tags={article.tags}
              />
            ))}
          </div>
        );
    }
  };

  try {
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
      </div>
    );
  } catch (err) {
    console.error("Render error:", err);
    setError(err);
    return null;
  }
}

export default App;
