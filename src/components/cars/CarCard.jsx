import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CarCard.module.css";

import { createBooking } from "../../services/bookingService";

const CarCard = ({ name, price, image, status, description, category, carId, _id, pickUpLocation, returnLocation, pickUpDate, returnDate, isSearchResult }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const handleRentNow = async () => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to rent the car.");
      navigate("/login");
      return;
    }
    if (isSearchResult) {
      // Compose booking data
      const userId = localStorage.getItem("userId") || "USER123"; // fallback for demo
      // Calculate number of days between pickUpDate and returnDate
      let numberOfDays = 1;
      if (pickUpDate && returnDate) {
        const start = new Date(pickUpDate);
        const end = new Date(returnDate);
        numberOfDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      }
      const pricePerDay = parseInt(price, 10);
      const totalAmount = pricePerDay * numberOfDays;
      // Ensure carId is always set (fallback to _id if carId missing)
      const bookingData = {
        userId,
        carId: _id, // Always send MongoDB _id as carId
        carName: name,
        carCategory: category,
        pricePerDay,
        pickUpLocation,
        returnLocation,
        duration: `${pickUpDate} to ${returnDate}`,
        numberOfDays,
        totalAmount
      };
      console.log('BookingData sent:', bookingData);

      try {
        await createBooking(bookingData);
        navigate("/dashboard");
      } catch (err) {
        alert("Failed to create booking. Please try again.");
      }
      return;
    }
    navigate("/booking", {
      state: { car: { name, price, image, category } },
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
  src={image}
  alt={name}
  className={styles.image}
  onError={e => {
    e.target.onerror = null;
    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/2018_Maruti_Suzuki_Swift_DZire_VXi_1.2_Front.jpg';
  }}
/>
        <button
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.active : ""
          }`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <div
          className={`${styles.statusBadge} ${styles[status.toLowerCase()]}`}
        >
          {status}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{name}</h3>
          <p className={styles.price}>
            ₹{price}
            <span>/day</span>
          </p>
        </div>
        <div className={styles.category}>
          <span className={styles.categoryBadge}>{category}</span>
        </div>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <button
          className={styles.rentButton}
          onClick={handleRentNow}
          disabled={status !== "Available"}
        >
          {status === "Available" ? "Rent Now" : "Not Available"}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
