import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AddressForm.module.css";
import { createBooking } from "../services/bookingService";

const LOCATIONS = [
  "Udupi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai"
];

const AddressForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let car = location.state?.car;
  if (!car) {
    try {
      car = JSON.parse(localStorage.getItem('selectedCar'));
    } catch (e) {
      car = undefined;
    }
  }
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupLocation || !pickupDate || !pickupTime || !returnLocation || !returnDate || !returnTime) {
      setError("Please fill in all fields.");
      return;
    }
    if (!car || !car._id) {
      setError("Car data missing or invalid. Please go back and select a car again.");
      console.error("Invalid car object:", car);
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Calculate number of days and duration
      const start = new Date(`${pickupDate}T${pickupTime}`);
      const end = new Date(`${returnDate}T${returnTime}`);
      const msPerDay = 1000 * 60 * 60 * 24;
      const numberOfDays = Math.max(1, Math.ceil((end - start) / msPerDay));
      const duration = `${pickupDate} to ${returnDate}`;
      const totalAmount = (car.pricePerDay || car.price) * numberOfDays;
      // Compose booking data
      const bookingData = {
        userId: localStorage.getItem("userId") || "USER123",
        carId: car._id || car.carId || car.id,
        carName: car.carName || car.name,
        carCategory: car.carCategory || car.category,
        pricePerDay: car.pricePerDay || car.price,
        pickUpLocation: pickupLocation,
        returnLocation: returnLocation,
        duration,
        numberOfDays,
        totalAmount,
        carId: car._id // Use MongoDB ObjectId for backend lookup
      };
      console.log("Booking Data to send:", bookingData);
      await createBooking(bookingData);
      localStorage.removeItem('selectedCar');
      navigate("/Dashboard");
    } catch (err) {
      setError("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.formWrapper}>
      <h2>Enter Pickup & Return Details</h2>
      <form className={styles.addressForm} onSubmit={handleSubmit}>
        <label>
          Pickup Location
          <select value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} required>
            <option value="">Select Location</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </label>
        <label>
          Pickup Date
          <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} required />
        </label>
        <label>
          Pickup Time
          <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} required />
        </label>
        <label>
          Return Location
          <select value={returnLocation} onChange={e => setReturnLocation(e.target.value)} required>
            <option value="">Select Location</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </label>
        <label>
          Return Date
          <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} required />
        </label>
        <label>
          Return Time
          <input type="time" value={returnTime} onChange={e => setReturnTime(e.target.value)} required />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.rentBtn} type="submit">Rent Now</button>
      </form>
    </div>
  );
};

export default AddressForm;
