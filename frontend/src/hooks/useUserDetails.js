import { useState, useEffect } from "react";

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);

      const user = localStorage.getItem("user-threads");
      if (!user) {
        setLoading(false);
        setError("No user data found.");
        return;
      }

      try {
        const { _id: id } = JSON.parse(user);
        const res = await fetch(`/api/users/profile/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await res.json();
        // console.log("userdetails", data);
        setUserDetails(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();

    // Set up a listener for changes in localStorage
    const handleStorageChange = () => {
      fetchUserDetails();
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return { userDetails, loading, error };
};

export default useUserDetails;
