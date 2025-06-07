import React from "react";
import styles from "./AdminProfile.module.css";

const admin = {
  name: "Chetan Shetty",
  email: "cvshetty360@gmail.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  role: "Administrator",
};

const AdminProfile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileCard}>
        <img src={admin.avatar} alt="Admin Avatar" className={styles.avatar} />
        <h2 className={styles.name}>{admin.name}</h2>
        <p className={styles.email}>{admin.email}</p>
        <span className={styles.role}>{admin.role}</span>
      </div>
    </div>
  );
};

export default AdminProfile;
