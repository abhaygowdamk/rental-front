import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CarFilter.module.css";

const CarFilter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: "",
    pickupDateTime: "",
    returnLocation: "",
    returnDateTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Split the datetime into date and time for consistency with the backend
    const [pickupDate, pickupTime] = (formData.pickupDateTime || "").split("T");
    const [returnDate, returnTime] = (formData.returnDateTime || "").split("T");

    navigate("/search", {
      state: {
        pickupLocation: formData.pickupLocation,
        pickupDate,
        pickupTime,
        returnLocation: formData.returnLocation,
        returnDate,
        returnTime,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.filterContainer}>
      <form className={styles.filterForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>Pick-up Location</label>
            <input
              type="text"
              name="pickupLocation"
              placeholder="Select pick-up location"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Pick-up Date & Time</label>
            <input
              type="datetime-local"
              name="pickupDateTime"
              value={formData.pickupDateTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label>Return Location</label>
            <input
              type="text"
              name="returnLocation"
              placeholder="Select return location"
              value={formData.returnLocation}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Return Date & Time</label>
            <input
              type="datetime-local"
              name="returnDateTime"
              value={formData.returnDateTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.searchButton}>
          Search Available Cars
        </button>
      </form>
    </div>
  );
};

export default CarFilter;
