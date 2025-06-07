import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";
import Header from "../../../components/shared/Header";

import axios from "axios";

// We'll fetch from the backend instead


const SUV = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get("http://localhost:5000/api/suv-cars").then(res => setCars(res.data));
  }, []);

  const handleRentNow = (car) => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to rent the car.");
      navigate("/login");
      return;
    }
    navigate("/profile", {
      state: { notification: `Booking request sent for ${car.name}` },
    });
  };

  const toggleFavorite = (carId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(carId)) {
        newFavorites.delete(carId);
      } else {
        newFavorites.add(carId);
      }
      return newFavorites;
    });
  };

  return (
    <>
      <Header />
      <div className={styles.categoryPage}>
        <div className={styles.content}>
          <h1>SUV Cars</h1>
          <p className={styles.subtitle}>
            Spacious and powerful SUVs for every adventure
          </p>
          <div className={styles.carGrid}>
            {cars.map((car) => (
              <div key={car.carId} className={styles.carCard}>
                <div className={styles.imageContainer}>
                  <img src={car.carImage} alt={car.carName} />
                  <button
                    className={`${styles.favoriteButton} ${
                      favorites.has(car.id) ? styles.favorited : ""
                    }`}
                    onClick={() => toggleFavorite(car.id)}
                  >
                    <i className={`fas fa-heart`}></i>
                  </button>
                </div>
                <div className={styles.carInfo}>
                  <div className={styles.namePrice}>
                    <h3>{car.carName}</h3>
                    <p className={styles.price}>
                      ₹{car.pricePerDay}
                      <span>/day</span>
                    </p>
                  </div>
                  <div className={styles.specs}>
                    <div className={styles.spec}>
                      <i className="fas fa-gas-pump"></i>
                      <span>{car.fuelType}</span>
                    </div>
                    <div className={styles.spec}>
                      <i className="fas fa-cog"></i>
                      <span>{car.transmission}</span>
                    </div>
                    <div className={styles.spec}>
                      <i className="fas fa-users"></i>
                      <span>{car.seats}</span>
                    </div>
<div className={styles.spec}>
  <i className="fas fa-cog"></i>
  <span>{car.transmission}</span>
</div>
<div className={styles.spec}>
  <i className="fas fa-users"></i>
  <span>{car.seats}</span>
</div>
                  </div>
                  <button
                    className={styles.rentButton}
                    onClick={() => navigate('/address-form', { state: { car: { ...car, _id: car._id } } })}
                  >
                    Pick Up Location
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SUV;
