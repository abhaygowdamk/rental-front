import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <p className={styles.description}>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <div className={styles.social}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Information</h3>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/terms">Term and Conditions</Link>
            <Link to="/best-price">Best Price Guarantee</Link>
            <Link to="/privacy">Privacy & Cookies Policy</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h3>Customer Support</h3>
          <nav>
            <Link to="/faq">FAQ</Link>
            <Link to="/payment">Payment Option</Link>
            <Link to="/booking-tips">Booking Tips</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>

        <div className={styles.section}>
          <h3>Have a Questions?</h3>
          <div className={styles.contact}>
            <p>
              <strong>Address:</strong> Canara Engineering College, Mangaluru
            </p>
            <p>
              <strong>Phone:</strong> +91 8217598647
            </p>
            <p>
              <strong>Email:</strong> cvshetty360@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          Copyright ©2025 All rights reserved | This template is made with ♥ by
          Team Caed
        </p>
      </div>
    </footer>
  );
};

export default Footer;
