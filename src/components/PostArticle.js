import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import ReactMarkdown from 'react-markdown';
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

function PostArticle() {
  const { authenticated, user } = usePrivy();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [selectedTab, setSelectedTab] = useState("write");
  const [status, setStatus] = useState('');
  const [references, setReferences] = useState([{ name: '', url: '' }]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authenticated) {
      setStatus('Please log in to post an article.');
      return;
    }

    // Process tags
    const processedTags = tags.split(',').map(tag => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`);

    // For now, we'll just log the article data
    console.log('Article submitted:', { title, body, tags: processedTags, author: user.id, references });

    // Clear the form fields
    setTitle('');
    setBody('');
    setTags('');
    setReferences([{ name: '', url: '' }]);
    setStatus('Article submitted successfully!');
  };

  const handleReferenceChange = (index, field, value) => {
    const newReferences = [...references];
    newReferences[index][field] = value;
    setReferences(newReferences);
  };

  const addReference = () => {
    setReferences([...references, { name: '', url: '' }]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl text-white mb-4">Post a New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ReactMde
          value={body}
          onChange={setBody}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
          }
          className="bg-white bg-opacity-20 rounded-md overflow-hidden"
        />
        <input
          type="text"
          placeholder="Add tags (comma-separated, e.g. #crypto, AI, blockchain)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="space-y-2">
          <h3 className="text-white">References</h3>
          {references.map((reference, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                placeholder="Reference Name"
                value={reference.name}
                onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                required
                className="flex-1 p-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="Reference URL"
                value={reference.url}
                onChange={(e) => handleReferenceChange(index, 'url', e.target.value)}
                required
                className="flex-1 p-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addReference}
            className="w-8 h-8 bg-white bg-opacity-20 text-white font-bold rounded-full transition duration-300 ease-in-out hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 flex items-center justify-center"
          >
            +
          </button>
        </div>
        <button 
          type="submit" 
          className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          Submit Article
        </button>
      </form>
      {status && <p className="mt-4 text-white">{status}</p>}
    </div>
  );
}

export default PostArticle;