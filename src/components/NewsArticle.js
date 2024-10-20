import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Popup from './Popup';

function NewsArticle({ title, summary, author, tags, onAddFaxx }) {
  const [expanded, setExpanded] = useState(false);
  const [showAuthorId, setShowAuthorId] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  // Mock faxx responses
  const [faxxResponses] = useState([
    {
      id: 1,
      content: "Recent studies show that renewable energy costs have decreased by 82% since 2010, making it cheaper than fossil fuels in many regions.",
      author: "EnergyExpert",
      timestamp: "2023-05-15 14:30",
      evidenceType: "supports",
      source: "Scientific Journal",
      url: "https://www.nature.com/articles/s41560-023-01209-8"
    },
    {
      id: 2,
      content: "While renewable energy is becoming more competitive, it's not universally cheaper than fossil fuels yet. Costs vary significantly by region and energy type.",
      author: "EconomistJane",
      timestamp: "2023-05-16 09:45",
      evidenceType: "challenges",
      source: "Media Outlet",
      url: "https://www.economist.com/special-report/2023/04/24/the-energy-transition-is-running-into-supply-problems"
    },
    {
      id: 3,
      content: "The claim doesn't account for the intermittency of renewable energy sources and the current costs of energy storage, which can make fossil fuels more reliable in some contexts.",
      author: "PowerSystemsEngineer",
      timestamp: "2023-05-17 11:20",
      evidenceType: "rejects",
      source: "Subject Matter Expert",
      url: "https://www.linkedin.com/pulse/true-cost-intermittent-renewables-paul-martin"
    },
    {
      id: 4,
      content: "Government policies and subsidies play a significant role in the relative costs of renewable vs. fossil fuel energy sources.",
      author: "PolicyAnalyst",
      timestamp: "2023-05-18 16:05",
      evidenceType: "context",
      source: "Official Document",
      url: "https://www.iea.org/reports/energy-subsidies-2023"
    }
  ]);

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

  const getEvidenceTypeColor = (evidenceType) => {
    switch (evidenceType) {
      case 'supports':
        return 'bg-green-900 bg-opacity-30';
      case 'challenges':
        return 'bg-yellow-900 bg-opacity-30';
      case 'rejects':
        return 'bg-red-900 bg-opacity-30';
      case 'context':
        return 'bg-blue-900 bg-opacity-30';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <>
      <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 mb-6 w-full max-w-2xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
        <h3 className="text-xl font-semibold text-white mb-2 text-left">{title}</h3>
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
          <div className="text-white bg-gray-900 p-6 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-100 text-left">{title}</h2>
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
            <div className="text-gray-300 mb-8 leading-relaxed text-left">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
            
            {/* Faxx Responses Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 text-gray-100 text-left">Faxx Responses</h3>
              {faxxResponses.length > 0 ? (
                faxxResponses.map((faxx) => (
                  <div key={faxx.id} className={`${getEvidenceTypeColor(faxx.evidenceType)} rounded-lg p-4 mb-4 border border-gray-700`}>
                    <p className="text-gray-300 mb-2 text-left">{faxx.content}</p>
                    <div className="text-sm text-gray-400 text-left">
                      <span>{faxx.author} • {faxx.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 text-left">
                      <span>Source: {faxx.source} • </span>
                      <a href={faxx.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Reference</a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-left">No faxx yet. Be the first one to faxx-check!</p>
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
