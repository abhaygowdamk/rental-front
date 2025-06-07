import React, { useState } from "react";
import styles from "./ManagePayments.module.css";

const initialPayments = [
  {
    paymentId: "PID001",
    bookingId: "BID001",
    userId: "USER123",
    carId: "SC001",
    totalAmount: "₹24000",
    duration: "Jan 15 - Jan 20",
    paymentStatus: "Completed",
  },
  {
    paymentId: "PID002",
    bookingId: "BID002",
    userId: "USER124",
    carId: "SC002",
    totalAmount: "₹17500",
    duration: "Jan 18 - Jan 22",
    paymentStatus: "Pending",
  },
  {
    paymentId: "PID003",
    bookingId: "BID003",
    userId: "USER125",
    carId: "SC003",
    totalAmount: "₹27000",
    duration: "Jan 20 - Jan 25",
    paymentStatus: "Failed",
  },
];

const statusColors = {
  Completed: styles.statusCompleted,
  Pending: styles.statusPending,
  Failed: styles.statusFailed,
};

const ManagePayments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [filter, setFilter] = useState("");

  const filteredPayments = payments.filter(
    (p) =>
      p.paymentId.toLowerCase().includes(filter.toLowerCase()) ||
      p.bookingId.toLowerCase().includes(filter.toLowerCase()) ||
      p.userId.toLowerCase().includes(filter.toLowerCase()) ||
      p.paymentStatus.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h1>Payment Management</h1>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search by Payment ID, Booking ID, User, Status..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>Car ID</th>
              <th>Total Amount</th>
              <th>Duration</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p.paymentId}>
                <td>{p.paymentId}</td>
                <td>{p.bookingId}</td>
                <td>{p.userId}</td>
                <td>{p.carId}</td>
                <td>{p.totalAmount}</td>
                <td>{p.duration}</td>
                <td>
                  <span
                    className={
                      p.paymentStatus === "Completed"
                        ? styles.statusCompleted
                        : p.paymentStatus === "Pending"
                        ? styles.statusPending
                        : styles.statusFailed
                    }
                  >
                    {p.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayments;
