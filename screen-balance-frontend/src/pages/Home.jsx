
import { Link } from "react-router-dom"; // For page navigation
import { Link as ScrollLink } from "react-scroll"; // For smooth in-page scrolling
import ActivitySuggestions from "../components/ActivitySuggestions";
import BreakNotification from "../components/BreakNotification";
import Timer from "../components/Timer";
import Dashboard from "../components/Dashboard";
import Stats from "../pages/Stats"; // Import Stats component

import "../App.css";

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">Screen Balance</div>
        <ul className="nav-links">
          {/* In-page scrolling */}
          <li>
            <ScrollLink to="welcome" smooth={true} duration={500}>
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="features" smooth={true} duration={500}>
              Features
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="about" smooth={true} duration={500}>
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact" smooth={true} duration={500}>
              Contact
            </ScrollLink>
          </li>
          {/* React Router Links for external routes */}
          <li><Link to="/login" className="btn-nav">Login</Link></li>
          <li><Link to="/register" className="btn-nav">Register</Link></li>
        </ul>
      </header>

      {/* Welcome Section */}
      <section id="welcome" className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome to Screen Balance</h1>
          <p>Your solution for managing screen time effectively!</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard">
        <Dashboard />
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Features</h2>
        <div className="feature">
          <h3>Track Screen Time</h3>
          <p>Monitor your daily screen usage effortlessly.</p>
        </div>
        <div className="feature">
          <ActivitySuggestions />
        </div>
        <div className="feature">
          <Timer />
        </div>
        <div className="feature">
          <h3>Break Notification</h3>
          <BreakNotification />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <Stats />
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          Screen Balance is dedicated to helping users manage their screen time
          effectively by providing tools to track usage, suggest breaks, and
          promote offline activities for a balanced lifestyle.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? We do love to hear from you!</p>
        <button className="cta-button">Contact Support</button>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Screen Balance. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
