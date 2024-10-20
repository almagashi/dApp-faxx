import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import ReactMarkdown from 'react-markdown';
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

function AddFaxx() {
  const { authenticated, user } = usePrivy();
  const [evidence, setEvidence] = useState('');
  const [references, setReferences] = useState(['']);
  const [evidenceType, setEvidenceType] = useState('supports');
  const [selectedTab, setSelectedTab] = useState("write");
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authenticated) {
      setStatus('Please log in to add evidence.');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('faxx submitted:', { evidence, references, evidenceType, author: user.id });

    // Clear the form fields
    setEvidence('');
    setReferences(['']);
    setEvidenceType('supports');
    setStatus('faxx submitted successfully!');
  };

  const handleReferenceChange = (index, value) => {
    const newReferences = [...references];
    newReferences[index] = value;
    setReferences(newReferences);
  };

  const addReference = () => {
    setReferences([...references, '']);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h5 className="text-lg text-white mb-4">Add your faxx to this story</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ReactMde
          value={evidence}
          onChange={setEvidence}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
          }
          className="bg-white bg-opacity-20 rounded-md overflow-hidden"
        />
        {references.map((reference, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Reference"
              value={reference}
              onChange={(e) => handleReferenceChange(index, e.target.value)}
              className="flex-grow p-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-400"
            />
            {index === references.length - 1 && (
              <button
                type="button"
                onClick={addReference}
                className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
        <div className="space-y-2">
          <p className="text-white">How does your evidence relate to the current news?</p>
          <select
            value={evidenceType}
            onChange={(e) => setEvidenceType(e.target.value)}
            className="w-full p-2 rounded-md bg-white bg-opacity-20 text-white"
          >
            <option value="supports">Supports</option>
            <option value="challenges">Challenges</option>
            <option value="rejects">Rejects</option>
            <option value="context">Provides Context</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-700"
        >
          Submit Evidence
        </button>
      </form>
      {status && <p className="mt-4 text-white">{status}</p>}
    </div>
  );
}

export default AddFaxx;