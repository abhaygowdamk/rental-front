import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnLocation: "",
    returnDate: "",
    returnTime: "",
  });
  const [errors, setErrors] = useState({});

  const cityOptions = ["Mumbai", "Udupi", "Bengaluru", "Hyderabad", "Chennai"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
      ...prev,
      [name]: value,
      };

      // Synchronize return location with pickup location if it's empty
      if (name === "pickupLocation" && !prev.returnLocation) {
        newData.returnLocation = value;
      }

      return newData;
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Set minimum date as today for pickup date
  const today = new Date().toISOString().split("T")[0];

  // Update return date min value when pickup date changes
  const getMinReturnDate = () => {
    return formData.pickupDate || today;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check pickup location
    if (!formData.pickupLocation) {
      newErrors.pickupLocation = "Please select pickup location";
      isValid = false;
    }

    // Check pickup date
    if (!formData.pickupDate) {
      newErrors.pickupDate = "Please select pickup date";
      isValid = false;
    }

    // Check pickup time
    if (!formData.pickupTime) {
      newErrors.pickupTime = "Please select pickup time";
      isValid = false;
    }

    // Check return location
    if (!formData.returnLocation) {
      newErrors.returnLocation = "Please select return location";
      isValid = false;
    }

    // Check return date
    if (!formData.returnDate) {
      newErrors.returnDate = "Please select return date";
      isValid = false;
    }

    // Check return time
    if (!formData.returnTime) {
      newErrors.returnTime = "Please select return time";
      isValid = false;
    }

    // Validate dates only if they are not empty
    if (
      formData.pickupDate &&
      formData.returnDate &&
      formData.pickupTime &&
      formData.returnTime
    ) {
      const pickup = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
      const returnDate = new Date(
        `${formData.returnDate}T${formData.returnTime}`
      );

      if (returnDate <= pickup) {
        newErrors.returnDate =
          "Return date & time must be after pickup date & time";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    navigate("/search-results", { state: formData });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
      <div className={styles.formGroup}>
          <label htmlFor="pickupLocation">Pick-up Location</label>
          <select
          id="pickupLocation"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          className={errors.pickupLocation ? styles.error : ""}
          >
            <option value="">Select pick-up location</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        {errors.pickupLocation && (
          <span className={styles.errorMessage}>{errors.pickupLocation}</span>
        )}
      </div>

      <div className={styles.formGroup}>
          <label htmlFor="pickupDateTime">Pick-up Date & Time</label>
          <div className={styles.dateTimeGroup}>
        <input
          type="date"
          id="pickupDate"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
              min={today}
          className={errors.pickupDate ? styles.error : ""}
        />
        <input
          type="time"
          id="pickupTime"
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          className={errors.pickupTime ? styles.error : ""}
        />
          </div>
          {(errors.pickupDate || errors.pickupTime) && (
            <span className={styles.errorMessage}>
              {errors.pickupDate || errors.pickupTime}
            </span>
        )}
        </div>
      </div>

      <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label htmlFor="returnLocation">Return Location</label>
          <select
          id="returnLocation"
          name="returnLocation"
          value={formData.returnLocation}
          onChange={handleChange}
          className={errors.returnLocation ? styles.error : ""}
          >
            <option value="">Select return location</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        {errors.returnLocation && (
          <span className={styles.errorMessage}>{errors.returnLocation}</span>
        )}
      </div>

      <div className={styles.formGroup}>
          <label htmlFor="returnDateTime">Return Date & Time</label>
          <div className={styles.dateTimeGroup}>
        <input
          type="date"
          id="returnDate"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
              min={getMinReturnDate()}
          className={errors.returnDate ? styles.error : ""}
        />
        <input
          type="time"
          id="returnTime"
          name="returnTime"
          value={formData.returnTime}
          onChange={handleChange}
          className={errors.returnTime ? styles.error : ""}
        />
          </div>
          {(errors.returnDate || errors.returnTime) && (
            <span className={styles.errorMessage}>
              {errors.returnDate || errors.returnTime}
            </span>
        )}
        </div>
      </div>

      <button type="submit" className={styles.searchButton}>
        Search Available Cars
      </button>
    </form>
  );
};

export default SearchForm;
