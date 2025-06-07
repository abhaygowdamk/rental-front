import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CarForm.module.css";

const CarForm = ({ onSave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes("/edit/");
  const carToEdit = location.state?.car;

  const [formData, setFormData] = useState({
    name: "",
    category: "Economical",
    price: "",
    status: "Available",
    image: "",
    description: "",
    features: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: "4",
    luggage: "2",
  });

  useEffect(() => {
    if (isEdit && carToEdit) {
      setFormData(carToEdit);
    }
  }, [isEdit, carToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    navigate("/admin/manage-cars");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{isEdit ? "Edit Car" : "Add New Car"}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Car Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Economical">Economical</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price per Day (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="features">Features (comma separated)</label>
          <input
            type="text"
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="transmission">Transmission</label>
          <select
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fuelType">Fuel Type</label>
          <select
            id="fuelType"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            required
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="seats">Number of Seats</label>
          <input
            type="number"
            id="seats"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
            min="2"
            max="8"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="luggage">Luggage Capacity (bags)</label>
          <input
            type="number"
            id="luggage"
            name="luggage"
            value={formData.luggage}
            onChange={handleChange}
            required
            min="1"
            max="5"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>
            {isEdit ? "Update Car" : "Add Car"}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate("/admin/manage-cars")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
