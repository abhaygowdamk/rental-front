import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirmPage.module.css";

const API_BASE_URL = 'http://localhost:5000/api';

async function fetchBookingDetails(bookingId) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/user-activity/${bookingId}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch booking details');
    }
    return await res.json();
  } catch (error) {
    console.error('Error in fetchBookingDetails:', error);
    throw error;
  }
}

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId || "";
  const [booking, setBooking] = useState(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided");
      setLoading(false);
      return;
    }
    
    const loadBooking = async () => {
      try {
        const data = await fetchBookingDetails(bookingId);
        // If booking is already paid, redirect to success page
        if (data.paymentStatus === 'paid') {
          navigate('/payment-success', { 
            state: { 
              bookingId: data.bookingId,
              transactionId: data.paymentId,
              amount: data.totalAmount 
            } 
          });
          return;
        }
        setBooking(data);
      } catch (e) {
        setError(e.message || 'Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    
    loadBooking();
  }, [bookingId, navigate]);

  const handleProceed = async () => {
    if (!agree) return;
    
    setPaymentProcessing(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/process-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response');
      }

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Payment processing failed');
      }
      
      if (result.success) {
        // Redirect to success page with payment details
        navigate('/payment-success', { 
          state: { 
            bookingId: result.bookingId,
            transactionId: result.transactionId,
            amount: result.amount 
          } 
        });
      } else {
        throw new Error(result.message || 'Payment processing failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred during payment. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Debug: Show bookingId from location.state
  if (!bookingId) {
    return (
      <div className={styles.error}>
        No bookingId received from navigation state.<br/>
        Please check how you navigated to this page.
      </div>
    );
  }
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!booking) return <div className={styles.error}>Booking not found for bookingId: {bookingId}</div>;

  const {
    userId,
    bookingId: bId,
    carName,
    carCategory,
    carId,
    pricePerDay,
    duration,
    numberOfDays,
    pickUpLocation,
    returnLocation,
    bookingStatus,
    carImage,
    totalAmount,
  } = booking;

  return (
    <div className={styles.container}>
      {/* Left Section: Confirm Your Booking */}
      <div className={styles.leftSection}>
        <h2>Confirm Your Booking</h2>
        <form className={styles.form}>
          <label>User ID</label>
          <input value={userId} readOnly />
          <label>Booking ID</label>
          <input value={bId} readOnly />
          <label>Car Name</label>
          <input value={carName} readOnly />
          <label>Car Category</label>
          <input value={carCategory} readOnly />
          <label>Car ID</label>
          <input value={carId} readOnly />
          <label>Price Per Day</label>
          <input value={pricePerDay} readOnly />
          <label>Duration</label>
          <input value={duration} readOnly />
          <label>Number of Days</label>
          <input value={numberOfDays} readOnly />
          <label>Pick-Up Location</label>
          <input value={pickUpLocation} readOnly />
          <label>Return Location</label>
          <input value={returnLocation} readOnly />
          <label>Booking Status</label>
          <input value={bookingStatus} readOnly />
          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={paymentProcessing}
            />
            <label htmlFor="agree">
              I confirm that I will provide my Aadhar Card and Driving License during pickup.
            </label>
          </div>
          
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <button
            className={styles.proceedBtn}
            onClick={handleProceed}
            disabled={!agree || paymentProcessing}
          >
            {paymentProcessing ? (
              <>
                <span className={styles.spinner}></span>
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </button>
        </form>
      </div>

      {/* Right Section: Car Details */}
      <div className={styles.rightSection}>
        <div className={styles.carCard}>
          <img src={carImage || "https://via.placeholder.com/330x180?text=No+Image"} alt={carName} className={styles.carImage} />
          <div className={styles.carInfo}>
            <h3>{carName}</h3>
            <p>{carCategory}</p>
            <div className={styles.carDetailsRow}>
              <span>₹{pricePerDay} <small>/day</small></span>
              <span>Duration: {numberOfDays} Days</span>
              <span>Pick-up Location: {pickUpLocation}</span>
            </div>
            <div className={styles.totalAmountBox}>
              <div>Total Amount</div>
              <div className={styles.totalAmount}>₹{totalAmount}</div>
              <div className={styles.amountNote}>
                {numberOfDays} days × ₹{pricePerDay}/day
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
