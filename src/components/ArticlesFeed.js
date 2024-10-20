import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NewsPlatformABI from "./NewsPlatformABI.json"; // Import the ABI of your contract

const contractAddress = "0x083dD231FD734ba528BDf82969E70317c139A806";

const fetchArticles = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask to interact with this feature.");
    return [];
  }

  try {
    // Connect to the Ethereum provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, NewsPlatformABI, signer);

    // Fetch articles from the contract
    const articles = await contract.getArticles();
    
    // Format articles (since arrays and strings come in hex from the blockchain)
    return articles.map((article) => ({
      title: article.title,
      body: article.body,
      tags: article.tags.join(", "), // Convert tags array into a string
      author: article.author
    }));
  } catch (err) {
    console.error("Error fetching articles:", err);
    if (err.code === 'CALL_EXCEPTION') {
      alert("There was an error calling the smart contract. Please make sure you're connected to the correct network and the contract is deployed.");
    } else {
      alert("An error occurred while fetching articles. Please try again later.");
    }
    return [];
  }
};

const ArticlesFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
        setError(null);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div>
      <h2>Submitted Articles</h2>
      {loading ? (
        <p>Loading articles...</p>
      ) : error ? (
        <p>{error}</p>
      ) : articles.length === 0 ? (
        <p>No articles have been submitted yet.</p>
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <p><strong>Tags:</strong> {article.tags}</p>
              <p><strong>Author:</strong> {article.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticlesFeed;
