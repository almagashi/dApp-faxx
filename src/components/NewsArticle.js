import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Popup from './Popup';

function NewsArticle({ title, summary, author, tags, onAddFaxx }) {
  const [expanded, setExpanded] = useState(false);
  const [showAuthorId, setShowAuthorId] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [faxxComments, setFaxxComments] = useState([]);

  const tagColors = [
    'bg-gray-900',
    'bg-gray-800',
    'bg-gray-700',
    'bg-zinc-900',
    'bg-zinc-800',
    'bg-zinc-700',
    'bg-slate-900',
    'bg-slate-800'
  ];

  const handleReadMore = () => {
    setShowPopup(true);
  };

  const handleAddFaxx = () => {
    onAddFaxx(); // Call the onAddFaxx prop function
  };

  return (
    <>
      <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 mb-6 w-full max-w-2xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <div className="text-gray-300 mb-4 text-left">
          <ReactMarkdown>{`${summary.slice(0, 150)}...`}</ReactMarkdown>
          {summary.length > 150 && (
            <button
              onClick={handleReadMore}
              className="text-blue-400 hover:text-blue-300 focus:outline-none"
            >
              Read more
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
          {tags.map((tag, index) => (
            <span key={index} className={`${tagColors[index % tagColors.length]} text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-600`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6 text-gray-100">{title}</h2>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-400">
                <span>Author: {author}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className={`${tagColors[index % tagColors.length]} text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-600`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-gray-300 mb-8 leading-relaxed">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
            
            {/* Faxx Comments Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-100">Faxx Comments</h3>
              {faxxComments.length > 0 ? (
                faxxComments.map((faxx) => (
                  <div key={faxx.id} className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
                    <p className="text-gray-300 mb-2">{faxx.content}</p>
                    <div className="text-sm text-gray-400">
                      <span>{faxx.author} • {faxx.timestamp}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No faxx comments yet. Be the first to add one!</p>
              )}
            </div>
            
            {/* Add Faxx Button */}
            <button 
              className="mt-6 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              onClick={handleAddFaxx}
            >
              Add faxx
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

export default NewsArticle;
