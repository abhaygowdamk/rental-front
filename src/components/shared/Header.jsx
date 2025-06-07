import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mock authentication state (replace with real auth logic)
  const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
  const userAvatar =
    localStorage.getItem("userAvatar") ||
    "https://randomuser.me/api/portraits/men/32.jpg";

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleProfileClick = () => {
    navigate("/Dashboard");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <span className={styles.carIcon}>🚗</span>
          DriveSeva
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <a
          href="/#category"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname !== "/") {
              navigate("/", { state: { scrollToCategory: true } });
            } else {
              scrollToSection("category");
            }
          }}
        >
          Category
        </a>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className={styles.auth}>
    
        {isLoggedIn ? (
          <img
            src={userAvatar}
            alt="User Profile"
            className={styles.userAvatar}
            onClick={handleProfileClick}
            title="Profile"
            style={{
              cursor: "pointer",
              width: 38,
              height: 38,
              borderRadius: "50%",
            }}
          />
        ) : (
          <Link to="/login" className={styles.login}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
