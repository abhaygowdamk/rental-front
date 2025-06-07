import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin session/token
    navigate("/admin/login");
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>DriveSeva Admin</h2>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/admin/dashboard">
                <i className="fas fa-home"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/manage-cars">
                <i className="fas fa-car"></i> Manage Cars
              </Link>
            </li>
            <li>
              <Link to="/admin/bookings">
                <i className="fas fa-calendar"></i> View Bookings
              </Link>
            </li>
            <li>
              <Link to="/admin/payments">
                <i className="fas fa-credit-card"></i> Manage Payments
              </Link>
            </li>
            <li>
              <Link to="/admin/profile">
                <i className="fas fa-user"></i> Admin Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <button className={styles.homeButton} onClick={() => navigate("/")}>
              Go to Home
            </button>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
