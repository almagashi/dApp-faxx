import React from 'react';
import AddFaxx from './AddFaxx';

function NewsArticle({ title, summary, author, tags }) {
  const [showAddFaxx, setShowAddFaxx] = React.useState(false);

  const handleAddFaxxClick = () => {
    setShowAddFaxx(true);
  };

  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 mb-6 w-full max-w-2xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
      <h2 className="text-xl text-white font-semibold mb-2">{title}</h2>
      <p className="text-gray-300 mb-4">{summary}</p>
      <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
        <span>{author}</span>
        {/* <span>{date}</span> */}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {/* {factCheckedBy}  */}
          3+
        </span>
        <button 
          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-xs hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={handleAddFaxxClick}
        >
          Add Faxx
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
      {showAddFaxx && <AddFaxx />}
    </div>
  );
}

export default NewsArticle;