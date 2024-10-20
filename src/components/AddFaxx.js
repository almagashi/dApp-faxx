import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

function AddFaxx({ onClose }) {
  const { authenticated, user } = usePrivy();
  const [evidence, setEvidence] = useState('');
  const [reference, setReference] = useState('');
  const [evidenceType, setEvidenceType] = useState('supports');
  const [faxxSource, setFaxxSource] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authenticated) {
      setStatus('Please log in to add evidence.');
      return;
    }

    console.log('faxx submitted:', { evidence, reference, evidenceType, faxxSource, author: user.id });

    setEvidence('');
    setReference('');
    setEvidenceType('supports');
    setFaxxSource('');
    setStatus('faxx submitted successfully!');

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded-lg border border-gray-800">
      <div>
        <label htmlFor="evidence" className="block text-sm font-medium text-gray-300 mb-2">Add your faxx here.</label>
        <textarea
          id="evidence"
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="Enter your thought here..."
          className="w-full p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 resize-y min-h-[150px] border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Reference (URL)"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="flex-grow p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        />
      </div>
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">How do your faxx relate to the claim?</p>
        <select
          value={evidenceType}
          onChange={(e) => setEvidenceType(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        >
          <option value="supports">Supports the claim</option>
          <option value="challenges">Challenges the claim </option>
          <option value="rejects">Rejects the claim </option>
          <option value="context">Provides additional context</option>
        </select>
      </div>
      <div className="space-y-2">
        <p className="text-gray-300 text-sm">Where does this faxx come from?</p>
        <select
          value={faxxSource}
          onChange={(e) => setFaxxSource(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-900 text-white border border-gray-800 focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition duration-300"
        >
          <option value="">Select a source</option>
          <option value="media_outlet">Media Outlet</option>
          <option value="scientific_journal">Scientific Journal</option>
          <option value="social_media">Social Media</option>
          <option value="subject_matter_expert">Subject Matter Expert</option>
          <option value="official_document">Official Document</option>
          <option value="first_hand_experience">First-hand Experience</option>
          <option value="book">Book</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold rounded-md shadow-lg transition duration-300 ease-in-out hover:from-gray-600 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transform hover:scale-105"
      >
        faxx-check it
      </button>
    </form>
  );
}

export default AddFaxx;
