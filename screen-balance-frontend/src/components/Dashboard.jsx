import { useState, useEffect } from "react";
import instance from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [screenTime, setScreenTime] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token
    } else {
      // Fetch user data
      instance
        .get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }, // Send token in header
        })
        .then((response) => {
          setUser(response.data); // Set user data
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          setLoading(false);
          if (error.response?.status === 401) {
            setError("Session expired. Please log in again.");
            localStorage.removeItem("token"); // Remove token if expired
            navigate("/login"); // Redirect to login
          } else {
            setError("Error fetching user data, please try again.");
            console.error("Error fetching user data:", error);
          }
        });

      // Fetch screen time stats
      instance
        .get("/api/users/stats", {
          headers: { Authorization: `Bearer ${token}` }, // Send token in header
        })
        .then((response) => {
          setScreenTime(response.data.screenTime); // Update screen time
        })
        .catch((error) => {
          setError("Error fetching screen time, please try again.");
          console.error("Error fetching screen time:", error);
        });
    }
  }, [navigate]);

  const handleIncrease = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in.");
      navigate("/login");
      return;
    }

    instance
      .put(
        "/api/users/stats", // Ensure the correct endpoint path
        { screenTime: screenTime + 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setScreenTime(response.data.updatedScreenTime);
      })
      .catch((error) => {
        setError("Error updating screen time, please try again.");
        console.error("Error updating screen time:", error.response?.data || error.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login on logout
  };

  if (loading) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className="container">
      <h1>Screen Balance</h1>
      {error && <div className="error">{error}</div>}
      {user ? (
        <div>
          <h3>Welcome, {user.name}!</h3>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
      <h2>Todays Screen Time: {screenTime} hours</h2>
      <button className="button add-time" onClick={handleIncrease}>Add Screen Time</button>
      <button className="button logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
