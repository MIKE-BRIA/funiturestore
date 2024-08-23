import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user-threads");
      setIsAuthenticated(!!user);
    };

    // Check authentication on mount
    checkAuth();

    // Set up a listener to check authentication status when localStorage changes
    window.addEventListener("storage", checkAuth);

    // Clean up the listener on component unmount
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return isAuthenticated;
};

export default useAuth;
