import React, { useState, useEffect } from "react";
import styles from "./ViewBookings.module.css";
import { deleteBooking } from '../../../services/bookingService';

// const initialBookings = [...]; // Static data removed for dynamic fetch

const statusColors = {
  Pending: styles.statusPending,
  Approved: styles.statusApproved,
  Rejected: styles.statusRejected,
};

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All Status");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setBookings([]);
      }
    };
    fetchBookings();
  }, []);

  const [loadingId, setLoadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleStatusChange = async (bookingId, newStatus) => {
    setLoadingId(bookingId + newStatus);
    try {
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingStatus: newStatus, paymentStatus: newStatus === 'Approved' ? 'Pending' : '-' }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      const result = await response.json();
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId
            ? { ...b, bookingStatus: newStatus, paymentStatus: newStatus === 'Approved' ? 'Pending' : '-' }
            : b
        )
      );
    } catch (err) {
      // Optionally show error
    }
    setLoadingId(null);
  };


  const filteredBookings =
    filter === "All Status"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    setDeletingId(bookingId);
    try {
      await deleteBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    } catch (err) {
      alert('Failed to delete booking');
    }
    setDeletingId(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h1>Booking Management</h1>
        <select
          className={styles.statusFilter}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Booking ID</th>
              <th>Car ID</th>
<th>Car Name</th>
              <th>Car Category</th>
              <th>Price Per Day</th>
              <th>Duration</th>
              <th>Number of Days</th>
              <th>Pick-Up Location</th>
              <th>Return Location</th>
              <th>Payment ID</th>
              <th>Total Amount</th>
              <th>Booking Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.bookingId}>
                <td>{b.userId}</td>
                <td>{b.bookingId}</td>
                <td>{b.carId}
                  </td>
                  <td>
                    {b.carName}</td>
                <td>{b.carCategory}</td>
                <td>{b.pricePerDay}</td>
                <td>{b.duration}</td>
                <td>{b.numberOfDays}</td>
                <td>{b.pickUpLocation}</td>
                <td>{b.returnLocation}</td>
                <td>{b.paymentId || '-'}</td>
                <td>{b.totalAmount}</td>
                <td>
                  <span
                    className={
                      b.bookingStatus === "Pending"
                        ? styles.statusPending
                        : b.bookingStatus === "Approved"
                        ? styles.statusApproved
                        : styles.statusRejected
                    }
                  >
                    {b.bookingStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      b.paymentStatus === "Paid"
                        ? styles.statusApproved
                        : styles.statusPending
                    }
                  >
                    {b.paymentStatus}
                  </span>
                </td>
                <td className={styles.actionButtons}>
                  <button
                    className={styles.approveBtn}
                    disabled={b.bookingStatus === "Approved"}
                    onClick={() => handleStatusChange(b.bookingId, "Approved")}
                  >
                    <i className="fas fa-check-circle"></i>
                    Approve
                  </button>
                  <button
                    className={styles.rejectBtn}
                    disabled={b.bookingStatus === "Rejected"}
                    onClick={() => handleStatusChange(b.bookingId, "Rejected")}
                  >
                    <i className="fas fa-times-circle"></i>
                    Reject
                  </button>
                  <button
                    className={styles.deleteBtn}
                    disabled={deletingId === b.bookingId}
                    onClick={() => handleDelete(b.bookingId)}
                    title="Delete Booking"
                  >
                    {deletingId === b.bookingId ? (
                      <span>Deleting...</span>
                    ) : (
                      <>
                        <i className="fas fa-trash"></i> Delete
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBookings;
