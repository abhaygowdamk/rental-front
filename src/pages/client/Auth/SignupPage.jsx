import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";

// Fallback to localhost if env is missing
const baseURL = process.env.REACT_APP_API_URL;
const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validations
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        console.error("JSON Parse Error:", err);
      }

      if (!response.ok) {
        setError(data.message || data.error || "Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      // Save token/user info if returned
      if (data.token && data.userId) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
      }

      navigate("/login", {
        state: {
          message: "Account created successfully! Please login to continue.",
        },
      });
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✉️</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.createButton} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className={styles.loginPrompt}>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
