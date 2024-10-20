import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import NewsPlatformABI from "./NewsPlatformABI.json";

const contractAddress = "0xC2D03F42240b1F99914d4e2131Ca214f969cFB3c";

const fetchFaxx = async (articleId) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, NewsPlatformABI, provider);

    // Fetch faxx for the article
    const faxx = await contract.getComments(articleId);
    return faxx.map((faxx) => ({
      evidence: faxx.evidence,
      referenceURL: faxx.referenceURL,
      evidenceType: faxx.evidenceType,
      faxxSource: faxx.source,
      commenter: faxx.commenter
    }));
  } catch (err) {
    console.error("Error fetching faxx:", err);
    return [];
  }
};
  
const FaxxFeed = ({ articleId }) => {
  const [faxxResponses, setFaxxResponses] = useState([]);
  const [showCommenterAddresses, setShowCommenterAddresses] = useState({});

  useEffect(() => {
    const loadFaxx = async () => {
      const fetchedFaxx = await fetchFaxx(articleId);
      setFaxxResponses(fetchedFaxx.map((faxx, index) => ({
        ...faxx,
        id: index + 1,
        timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0],
        upvotes: 0,
        downvotes: 0
      })));
    };

    loadFaxx();
  }, [articleId]);

  const getEvidenceTypeColor = (evidenceType) => {
    switch (evidenceType) {
      case 'supports':
        return 'bg-green-900 bg-opacity-20';
      case 'challenges':
        return 'bg-yellow-900 bg-opacity-20';
      case 'rejects':
        return 'bg-red-900 bg-opacity-20';
      case 'context':
        return 'bg-blue-900 bg-opacity-20';
      default:
        return 'bg-gray-800';
    }
  };

  const handleVote = (id, voteType) => {
    setFaxxResponses(prevResponses =>
      prevResponses.map(faxx =>
        faxx.id === id
          ? { ...faxx, [voteType]: faxx[voteType] + 1 }
          : faxx
      )
    );
  };

  const toggleCommenterAddress = (id) => {
    setShowCommenterAddresses(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6 text-gray-100 text-left">faxx</h3>
      {faxxResponses.length > 0 ? (
        faxxResponses.map((faxx) => (
          <div key={faxx.id} className={`${getEvidenceTypeColor(faxx.evidenceType)} rounded-lg p-4 mb-4 border border-gray-700`}>
            <p className="text-gray-300 mb-2 text-left">{faxx.evidence}</p>
            <div className="text-sm text-gray-400 text-left">
              <button
                onClick={() => toggleCommenterAddress(faxx.id)}
                className="flex items-center focus:outline-none"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {showCommenterAddresses[faxx.id] ? faxx.commenter : 'Show Address'}
              </button>
              <span> • {faxx.timestamp}</span>
            </div>
            <div className="text-sm text-gray-500 mt-2 text-left">
              <span>Source: {faxx.faxxSource} • </span>
              <a href={faxx.referenceURL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Reference</a>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <button 
                onClick={() => handleVote(faxx.id, 'upvotes')}
                className="flex items-center text-gray-400 hover:text-gray-300"
              >
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                {faxx.upvotes}
              </button>
              <button 
                onClick={() => handleVote(faxx.id, 'downvotes')}
                className="flex items-center text-gray-400 hover:text-gray-300"
              >
                <svg className="w-5 h-5 mr-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                {faxx.downvotes}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-left">No faxx yet. Be the first one to faxx-check!</p>
      )}
    </div>
  );
};

export default FaxxFeed;
