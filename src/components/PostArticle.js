import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

function PostArticle() {
  const { authenticated, user } = usePrivy();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authenticated) {
      setStatus('Please log in to post an article.');
      return;
    }

    // For now, we'll just log the article data
    console.log('Article submitted:', { title, body, author: user.id });

    // Clear the form fields
    setTitle('');
    setBody('');
    setStatus('Article submitted successfully!');
  };

  return (
    <div>
      <h2>Post a New Article</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px' }}
        />
        <textarea
          placeholder="Article Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{
            width: '100%',
            height: '200px',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
          }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Submit Article
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default PostArticle;
