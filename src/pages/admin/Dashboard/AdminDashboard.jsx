import React from "react";
import styles from "./AdminDashboard.module.css";

const summary = [
  {
    icon: "fas fa-car",
    label: "Total Cars",
    value: 24,
    color: "#4070f4",
    bg: "#f0f4ff",
  },
  {
    icon: "fas fa-calendar-alt",
    label: "Total Bookings",
    value: 156,
    color: "#27ae60",
    bg: "#eafaf1",
  },
  {
    icon: "fas fa-wallet",
    label: "Total Revenue",
    value: "₹11,12,450",
    color: "#a259ff",
    bg: "#f7f0ff",
  },
];

const activities = [
  "New booking received for BMW X5",
  "Payment confirmed for booking #1234",
  "New car added to fleet: Mercedes C-Class",
  "Booking #1233 status updated to completed",
];

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardWrapper}>
      <h2 className={styles.greeting}>Hello, DriveSevaAdmin</h2>
      <div className={styles.summaryCards}>
        {summary.map((item) => (
          <div
            key={item.label}
            className={styles.summaryCard}
            style={{ background: item.bg }}
          >
            <i
              className={item.icon}
              style={{ color: item.color, fontSize: "1.5rem" }}
            ></i>
            <div className={styles.summaryLabel}>{item.label}</div>
            <div className={styles.summaryValue}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.activitiesBox}>
        <div className={styles.activitiesTitle}>Recent Activities</div>
        <ul className={styles.activitiesList}>
          {activities.map((act, i) => (
            <li key={i} className={styles.activityItem}>
              <span className={styles.dot}></span>
              {act}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
