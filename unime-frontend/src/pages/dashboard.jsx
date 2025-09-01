// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch current user
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUser(false);
      }
    };

    // Fetch matches
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setLoadingMatches(false);
      }
    };

    fetchUser();
    fetchMatches();
  }, []);

  if (loadingUser) return <p>Loading user...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.username}</h1>
      <p>Email: {user?.email}</p>

      <hr />

      <h2>Your Matches</h2>
      {loadingMatches ? (
        <p>Loading matches...</p>
      ) : matches.length === 0 ? (
        <p>No matches found yet.</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match._id}>
              {match.username} ({match.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
