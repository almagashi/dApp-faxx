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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authenticated) {
      setStatus('Please log in to post an article.');
      return;
    }

    // Process tags
    const processedTags = tags.split(',').map(tag => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`);

    // For now, we'll just log the article data
    console.log('Article submitted:', { title, body, tags: processedTags, author: user.id });

    // Clear the form fields
    setTitle('');
    setBody('');
    setTags('');
    setStatus('Article submitted successfully!');
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