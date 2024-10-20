import { useEffect, useState } from "react";
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
    console.log(articles);

    return articles.map((article) => ({
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      title: article.title,
      summary: article.body,
      author: article.author,
      tags: article.tags
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

  return { articles, loading, error };
};

export default ArticlesFeed;
