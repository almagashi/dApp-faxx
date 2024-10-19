import React from 'react';
import PostArticle from './PostArticle';
import Profile from './Profile';

function MainContent({ showProfile, showPostArticle, onShowPostArticle }) {
  if (showProfile) {
    return <Profile />;
  }

  if (showPostArticle) {
    return <PostArticle />;
  }

  return (
    <>
      <div className="bg-white bg-opacity-10 rounded-xl p-8 mb-8 w-full max-w-2xl">
        <h2 className="text-2xl text-white mb-4">News Feed Placeholder</h2>
        <p className="text-gray-300">Your news feed will appear here.</p>
      </div>
      <button
        onClick={onShowPostArticle}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Post News
      </button>
    </>
  );
}

export default MainContent;