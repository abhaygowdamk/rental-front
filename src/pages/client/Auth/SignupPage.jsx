import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
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
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started'); // Debug log
    setLoading(true);
    setError(""); // Reset error state at the start

    console.log('Form data:', formData); // Debug log

    // Basic validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      console.log('Validation failed: Missing fields'); // Debug log
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    console.log('Validation passed'); // Debug log

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log('Validation failed: Invalid email'); // Debug log
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      console.log('Validation failed: Passwords do not match'); // Debug log
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    console.log('All validations passed, submitting form'); // Debug log
    try {
      try {
const res = await fetch(`${baseURL}/api/auth/signup`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: 'include',
  body: JSON.stringify({
    username: formData.username,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword
  }),
});

        const data = await res.json();
        
        if (!res.ok) {
          console.error('Signup error response:', data); // Debug log
          setError(data.message || data.error || "Signup failed. Please try again.");
          setLoading(false);
          return;
        }

        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        
        navigate("/login", { 
          state: { 
            message: "Account created successfully! Please login to continue." 
          }
        });
      } catch (error) {
        setError(error.message || "Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
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
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.createButton}
            disabled={loading}
          >
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
