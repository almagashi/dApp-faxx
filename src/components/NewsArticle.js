import React, { useState } from 'react';
import AddFaxx from './AddFaxx';
import FaxxFeed from './FaxxFeed';

const NewsArticle = ({ id, title, summary, author, tags }) => {
  const [showAddFaxx, setShowAddFaxx] = useState(false);

  const handleAddFaxx = () => {
    setShowAddFaxx(true);
  };

  const handleSubmitFaxx = () => {
    console.log('Faxx submitted for article:', id);
    setShowAddFaxx(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-gray-300">{summary}</p>
      <p className="text-gray-400">By: {author}</p>
      <div className="mt-2">
        {tags && tags.map((tag, index) => (
          <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm mr-2">
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={handleAddFaxx}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Faxx
      </button>

      {showAddFaxx && (
        <AddFaxx articleId={id} onSubmit={handleSubmitFaxx} />
      )}

      <FaxxFeed articleId={id} />
    </div>
  );
};

export default NewsArticle;
