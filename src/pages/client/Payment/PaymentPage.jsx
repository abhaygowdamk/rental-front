import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/Header";
import styles from "./PaymentPage.module.css";

const summary = {
  car: "Tesla Model 3",
  bookingId: "BK12345",
  pickup: "123 Main Street, New York",
  duration: "Aug 15, 2023, 10:00 AM - Aug 18, 2023, 10:00 AM",
  pricePerDay: 7500,
  days: 3,
  total: 22500,
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    card: "",
    expiry: "",
    cvv: "",
    save: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (
      !form.name.trim() ||
      !/^\d{16}$/.test(form.card.replace(/\s/g, "")) ||
      !/^\d{2}\/\d{2}$/.test(form.expiry) ||
      !/^\d{3}$/.test(form.cvv)
    ) {
      setError("Please fill all fields correctly.");
      return;
    }
    setError("");
    // Simulate payment success
    setTimeout(() => {
      navigate("/booking-success");
    }, 800);
  };

  return (
    <>
      <Header />
      <div className={styles.paymentPage}>
        <div className={styles.container}>
          <div className={styles.summaryBox}>
            <h2>Complete Your Payment</h2>
            <div className={styles.summaryCard}>
              <h3>{summary.car}</h3>
              <div className={styles.summaryRow}>
                <span>Booking ID</span>
                <span className={styles.summaryValue}>
                  #{summary.bookingId}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Pickup Location</span>
                <span className={styles.summaryValue}>{summary.pickup}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Duration</span>
                <span className={styles.summaryValue}>{summary.duration}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Price per day</span>
                <span className={styles.summaryValue}>
                  ₹{summary.pricePerDay.toFixed(2)}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Duration</span>
                <span className={styles.summaryValue}>{summary.days} days</span>
              </div>
              <div className={styles.summaryRowTotal}>
                <span>Total Price</span>
                <span className={styles.totalPrice}>
                  ₹{summary.total.toLocaleString()}
                </span>
              </div>
            </div>
            <a href="/booking" className={styles.backLink}>
              &larr; Go back to Booking Page
            </a>
          </div>
          <form
            className={styles.paymentForm}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <h3>Payment Method</h3>
            <div className={styles.formGroup}>
              <label>Cardholder Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name on card"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input
                type="text"
                name="card"
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                value={form.card.replace(/[^\d]/g, "")}
                onChange={handleChange}
                required
                inputMode="numeric"
                pattern="\d{16}"
              />
              <span className={styles.cardIcons}>
                <img
                  src="https://img.icons8.com/color/32/000000/visa.png"
                  alt="Visa"
                />
                <img
                  src="https://img.icons8.com/color/32/000000/mastercard-logo.png"
                  alt="Mastercard"
                />
              </span>
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={form.expiry}
                  onChange={handleChange}
                  required
                  pattern="\d{2}/\d{2}"
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  CVV{" "}
                  <span className={styles.cvvInfo} title="3-digit code">
                    &#9432;
                  </span>
                </label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  maxLength={3}
                  value={form.cvv}
                  onChange={handleChange}
                  required
                  pattern="\d{3}"
                />
              </div>
            </div>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                name="save"
                checked={form.save}
                onChange={handleChange}
                id="save"
              />
              <label htmlFor="save">Save card for future bookings</label>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.payBtn}>
              Pay Now
            </button>
            <div className={styles.secureInfo}>
              <span className={styles.lockIcon}>🔒</span> Payments are securely
              processed
            </div>
            <div className={styles.paymentLogos}>
              <img
                src="https://img.icons8.com/ios-filled/32/000000/qr-code.png"
                alt="QR"
              />
              <img
                src="https://img.icons8.com/color/48/000000/upi.png"
                alt="UPI"
              />
            </div>
          </form>
        </div>
        <footer className={styles.footer}>
          © 2024 CarRent. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default PaymentPage;
