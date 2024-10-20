import { useState, useEffect } from 'react';
import { usePrivy } from "@privy-io/react-auth";

function useAuth() {
  const { ready, authenticated, login, logout } = usePrivy();
  const [showPostArticle, setShowPostArticle] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      setShowPostArticle(false);
      setShowProfile(false);
    }
  }, [authenticated]);

  const handleLogout = () => {
    setShowPostArticle(false);
    setShowProfile(false);
    logout();
  };

  return {
    ready,
    authenticated,
    login,
    logout: handleLogout,
    showPostArticle,
    setShowPostArticle,
    showProfile,
    setShowProfile
  };
}

export default useAuth;