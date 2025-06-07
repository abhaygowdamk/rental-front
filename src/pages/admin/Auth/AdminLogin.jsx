import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email !== ADMIN_EMAIL || form.password !== ADMIN_PASSWORD) {
      setError("Invalid admin credentials.");
      return;
    }
    setError("");
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 500);
  };

  return (
    <div className={styles.adminLoginPage}>
      <div className={styles.centerBox}>
        <div className={styles.iconBox}>
          <span className={styles.adminIcon}>🟦</span>
        </div>
        <h2 className={styles.heading}>Admin Login</h2>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="on">
          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.loginBtn}>
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
