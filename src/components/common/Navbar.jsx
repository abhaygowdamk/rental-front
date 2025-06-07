import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <span className={styles.brand}>DriveSeva</span>
        </Link>
      </div>

      <div className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className={styles.profile}>
        <button
          onClick={() => navigate("/profile")}
          className={styles.profileButton}
        >
          <i className="fas fa-user"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
