import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/Header";
import styles from "./Categories.module.css";

import axios from "axios";

const Economy = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [cars, setCars] = useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:5000/api/econ-cars").then(res => setCars(res.data));
  }, []);

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

  return (
    <>
      <Header />
      <div className={styles.categoryPage}>
        <div className={styles.content}>
          <h1>Economical Cars</h1>
          <p className={styles.subtitle}>
            Affordable and fuel-efficient vehicles for everyday use
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

export default Economy;
