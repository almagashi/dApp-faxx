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
  
const FaxxItem = ({ faxx, onVote, showCommenterAddress, onToggleCommenterAddress }) => {
  const [showFullEvidence, setShowFullEvidence] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const toggleEvidence = () => setShowFullEvidence(!showFullEvidence);

  const evidencePreview = faxx.evidence.slice(0, 150);
  const isLongEvidence = faxx.evidence.length > 150;

  const getEvidenceTypeColor = (evidenceType) => {
    const colors = {
      supports: 'bg-green-900 border-green-700',
      challenges: 'bg-yellow-900 border-yellow-700',
      rejects: 'bg-red-900 border-red-700',
      context: 'bg-blue-900 border-blue-700'
    };
    return colors[evidenceType] || 'bg-gray-800 border-gray-700';
  };

  const handleVote = async (voteType) => {
    setIsVoting(true);
    await onVote(faxx.id, voteType);
    setIsVoting(false);
  };

  // Function to convert source value to a readable string
  const getSourceString = (source) => {
    const sourceMap = {
      media_outlet: "Media Outlet",
      scientific_journal: "Scientific Journal",
      social_media: "Social Media",
      subject_matter_expert: "Subject Matter Expert",
      official_document: "Official Document",
      first_hand_experience: "First-hand Experience",
      book: "Book"
    };
    return sourceMap[source] || "Other";
  };

  return (
    <div className={`${getEvidenceTypeColor(faxx.evidenceType)} bg-opacity-20 rounded-lg p-4 mb-4 border transition-all duration-300 hover:bg-opacity-30`}>
      <p className="text-gray-300 mb-2 text-left">
        {showFullEvidence ? faxx.evidence : evidencePreview}
        {isLongEvidence && (
          <button
            onClick={toggleEvidence}
            className="text-blue-400 hover:text-blue-300 focus:outline-none ml-2 transition-colors duration-200"
          >
            {showFullEvidence ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <button
          onClick={() => onToggleCommenterAddress(faxx.id)}
          className="flex items-center focus:outline-none hover:text-gray-300 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          {showCommenterAddress ? `${faxx.commenter.slice(0, 6)}...${faxx.commenter.slice(-4)}` : 'Show Address'}
        </button>
        <span>{new Date(faxx.timestamp).toLocaleString()}</span>
      </div>
      <div className="text-sm text-gray-500 mt-2 flex justify-between items-center">
        <span>Source: {getSourceString(faxx.faxxSource)}</span>
        <a href={faxx.referenceURL} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline transition-colors duration-200">
          Reference <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <button 
          onClick={() => handleVote('upvotes')}
          disabled={isVoting}
          className={`flex items-center text-gray-400 hover:text-green-400 transition-colors duration-200 ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
          {faxx.upvotes}
        </button>
        <button 
          onClick={() => handleVote('downvotes')}
          disabled={isVoting}
          className={`flex items-center text-gray-400 hover:text-red-400 transition-colors duration-200 ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <svg className="w-5 h-5 mr-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
          {faxx.downvotes}
        </button>
      </div>
    </div>
  );
};

const FaxxFeed = ({ articleId }) => {
  const [faxxResponses, setFaxxResponses] = useState([]);
  const [showCommenterAddresses, setShowCommenterAddresses] = useState({});
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadFaxx = async () => {
      const fetchedFaxx = await fetchFaxx(articleId);
      setFaxxResponses(fetchedFaxx.map((faxx, index) => ({
        ...faxx,
        id: index + 1,
        timestamp: new Date().toISOString(),
        upvotes: Math.floor(Math.random() * 100),
        downvotes: Math.floor(Math.random() * 50)
      })));
    };

    loadFaxx();
  }, [articleId]);

  const handleVote = async (id, voteType) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
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

  const sortedFaxxResponses = [...faxxResponses].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.timestamp) - new Date(a.timestamp);
    if (sortBy === 'oldest') return new Date(a.timestamp) - new Date(b.timestamp);
    if (sortBy === 'mostVoted') return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    return 0;
  });

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-100">faxx</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 text-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostVoted">Most Voted</option>
        </select>
      </div>
      {sortedFaxxResponses.length > 0 ? (
        sortedFaxxResponses.map((faxx) => (
          <FaxxItem
            key={faxx.id}
            faxx={faxx}
            onVote={handleVote}
            showCommenterAddress={showCommenterAddresses[faxx.id]}
            onToggleCommenterAddress={toggleCommenterAddress}
          />
        ))
      ) : (
        <p className="text-gray-400 text-left">No faxx yet. Be the first one to faxx-check!</p>
      )}
    </div>
  );
};

export default FaxxFeed;
