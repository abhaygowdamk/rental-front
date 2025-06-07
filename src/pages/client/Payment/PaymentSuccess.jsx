import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './PaymentSuccess.module.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // If page is accessed directly without state, redirect to home
  React.useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  const { bookingId, transactionId, amount } = state;

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.icon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p className={styles.message}>Your booking has been confirmed. Thank you for choosing our service!</p>
        
        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Booking ID:</span>
            <span className={styles.value}>{bookingId}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Transaction ID:</span>
            <span className={styles.value}>{transactionId}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Amount Paid:</span>
            <span className={styles.amount}>₹{amount}</span>
          </div>
        </div>
        
        <button 
          className={styles.button}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
        
        <p className={styles.note}>
          A confirmation has been sent to your email. Please bring your ID proof when picking up the car.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
