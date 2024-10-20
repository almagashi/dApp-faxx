import React, { useState } from 'react';
import AddFaxx from './AddFaxx';
import FaxxFeed from './FaxxFeed';
import Popup from './Popup';

const NewsArticle = ({ id, title, summary, author, tags }) => {
  const [showAddFaxx, setShowAddFaxx] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAuthorId, setShowAuthorId] = useState(false);
  const [showFullSummary, setShowFullSummary] = useState(false);

  const handleAddFaxx = () => {
    setShowAddFaxx(true);
  };

  const handleSubmitFaxx = () => {
    console.log('Faxx submitted for article:', id);
    setShowAddFaxx(false);
  };

  const handleReadMore = () => {
    setShowPopup(true);
  };

  const tagColors = [
    'bg-red-900 bg-opacity-20',
    'bg-blue-900 bg-opacity-20',
    'bg-green-900 bg-opacity-20',
    'bg-yellow-900 bg-opacity-20',
    'bg-purple-900 bg-opacity-20',
  ];

  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 mb-6 w-full border border-gray-800 hover:border-gray-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold text-white mb-2 text-left">{title}</h3>
      <div className="text-gray-300 mb-4 text-left">
        {showFullSummary ? summary : `${summary.slice(0, 150)}...`}
        {summary.length > 150 && (
          <button
            onClick={handleReadMore}
            className="text-blue-400 hover:text-blue-300 focus:outline-none ml-2"
          >
            {showFullSummary ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
        <span className="flex items-center">
          <button
            onClick={() => setShowAuthorId(!showAuthorId)}
            className="flex items-center focus:outline-none"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {showAuthorId ? author : 'Show Address'}
          </button>
        </span>
        <button 
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={handleAddFaxx}
        >
          Add faxx
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags && tags.map((tag, index) => (
          <span key={index} className={`${tagColors[index % tagColors.length]} text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-600`}>
            {tag}
          </span>
        ))}
      </div>

      {showAddFaxx && (
        <Popup onClose={() => setShowAddFaxx(false)}>
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl">
            <AddFaxx articleId={id} onSubmit={handleSubmitFaxx} />
          </div>
        </Popup>
      )}

      <FaxxFeed articleId={id} />

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <div className="text-white bg-gray-900 p-6 rounded-xl w-full">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-300 mb-4">{summary}</p>
            {/* Add more details here if needed */}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default NewsArticle;
