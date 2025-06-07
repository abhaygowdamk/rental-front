import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/Header";
import styles from "./BookingSuccess.module.css";

const booking = {
  car: "Tesla Model 3",
  bookingId: "BK284756",
  pickup: "Downtown Car Rental Center",
  duration: "July 15, 2024, 10:00 AM – July 17, 2024, 10:00 AM",
  total: 22500,
  status: "Confirmed",
};

const BookingSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.successPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <span className={styles.checkIcon}>✔</span>
        </div>
        <h2 className={styles.heading}>Your booking has been confirmed!</h2>
        <div className={styles.card}>
          <div className={styles.detailRow}>
            <span>
              <i className="fas fa-car"></i> Car Name
            </span>
            <span>{booking.car}</span>
          </div>
          <div className={styles.detailRow}>
            <span>
              <i className="fas fa-receipt"></i> Booking ID
            </span>
            <span>#{booking.bookingId}</span>
          </div>
          <div className={styles.detailRow}>
            <span>
              <i className="fas fa-map-marker-alt"></i> Pickup Location
            </span>
            <span>{booking.pickup}</span>
          </div>
          <div className={styles.detailRow}>
            <span>
              <i className="fas fa-calendar-alt"></i> Duration
            </span>
            <span>{booking.duration}</span>
          </div>
          <div className={styles.detailRow}>
            <span>
              <i className="fas fa-money-bill"></i> Total Amount Paid
            </span>
            <span>₹{booking.total}</span>
          </div>
          <div className={styles.detailRow}>
            <span>
              <i className="fas fa-check-circle"></i> Status
            </span>
            <span className={styles.confirmed}>Confirmed</span>
          </div>
        </div>
        <div className={styles.messageBox}>
          Thank you for choosing CarRent! You'll receive an email and SMS
          confirmation shortly. Please carry your Aadhar and Driving License at
          the time of pickup.
        </div>
        <button
          className={styles.profileBtn}
          onClick={() => navigate("/profile")}
        >
          Go to My Profile
        </button>
        <div className={styles.supportBox}>
          Need help?{" "}
          <span
            className={styles.supportLink}
            onClick={() => navigate("/contact")}
          >
            Contact Support
          </span>
        </div>
      </div>
      <footer className={styles.footer}>
        © 2024 CarRent. All rights reserved.
      </footer>
    </div>
  );
};

export default BookingSuccess;
