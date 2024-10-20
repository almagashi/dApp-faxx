import React from 'react';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NewsPlatformABI from "./NewsPlatformABI.json"; // Import the ABI of your contract
import FaxxFeed from "./FaxxFeed";
import AddFaxx from "./AddFaxx";
import NewsArticle from "./NewsArticle";
import Profile from './Profile';
import PostArticle from './PostArticle';

const contractAddress = "0x34a773530e3A2D5baf2B1b96761086Bc81EA9C4D";

const fetchArticles = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask to interact with this feature.");
    return [];
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, NewsPlatformABI, signer);

    const articles = await contract.getArticles();
    console.log(articles);

    return articles.map((article, index) => ({
      articleId: index,
      title: article.title,
      summary: article.body,
      author: article.author,
      tags: article.tags
    }));
  } catch (err) {
    console.error("Error fetching articles:", err);
    const errorMessage = err.code === 'CALL_EXCEPTION'
      ? "There was an error calling the smart contract. Please make sure you're connected to the correct network and the contract is deployed."
      : "An error occurred while fetching articles. Please try again later.";
    alert(errorMessage);
    return [];
  }
};

const fetchFaxx = async (articleId) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, NewsPlatformABI, provider);

    const faxx = await contract.getComments(articleId);
    return faxx.map(({ evidence, referenceURL, evidenceType, source: faxxSource, commenter }) => 
      ({ evidence, referenceURL, evidenceType, faxxSource, commenter })
    );
  } catch (err) {
    console.error("Error fetching faxx:", err);
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

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {articles.map(article => (
        <NewsArticle
          key={article.articleId}
          id={article.articleId}
          title={article.title}
          summary={article.summary}
          author={article.author}
          tags={article.tags}
        />
      ))}
    </div>
  );
};

export default ArticlesFeed;
