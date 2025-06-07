import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CarCard from "../../../components/cars/CarCard";
import styles from "./SearchResults.module.css";
import Header from "../../../components/shared/Header";
import { fetchAvailableCars } from "../../../services/carService";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || {};
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      if (!searchParams.pickupLocation) {
        setError("Please select a pickup location");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchAvailableCars({
          pickupLocation: searchParams.pickupLocation,
          returnLocation: searchParams.returnLocation,
          pickupDate: searchParams.pickupDate,
          returnDate: searchParams.returnDate,
        });
        setCars(data);
        setLoading(false);
      } catch (err) {
        console.error("Error in SearchResults:", err);
        setError(err.message || "Failed to fetch cars. Please try again.");
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchParams]);

  const formatDateTime = (date, time) => {
    if (!date || !time) return "Not specified";
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleString();
  };

  if (!searchParams.pickupLocation) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.noResults}>
            <p>Please select a pickup location to search for cars.</p>
            <button
              className={styles.searchButton}
              onClick={() => navigate("/")}
            >
              Go to Search
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Available Cars in {searchParams.pickupLocation}</h1>
          <p>
            {loading ? (
              "Loading cars..."
            ) : error ? (
              <span className={styles.error}>{error}</span>
            ) : (
              `Showing ${cars.length} cars available ${
                searchParams.pickupDate &&
                searchParams.pickupTime &&
                searchParams.returnDate &&
                searchParams.returnTime
                  ? `from ${formatDateTime(
                      searchParams.pickupDate,
                      searchParams.pickupTime
                    )} to ${formatDateTime(
                      searchParams.returnDate,
                      searchParams.returnTime
                    )}`
                  : "for your selected dates"
              }`
            )}
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading cars...</div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <button
              className={styles.searchButton}
              onClick={() => navigate("/")}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {cars.map((car) => (
  <CarCard
    key={car._id}
    carId={car.carId}
    _id={car._id}
    name={car.carName}
    price={car.pricePerDay}
    image={car.carImage}
    status={car.available ? "Available" : "Not Available"}
    description={car.description}
    category={car.carCategory}
    pickUpLocation={searchParams.pickupLocation}
    returnLocation={searchParams.returnLocation}
    pickUpDate={searchParams.pickupDate}
    returnDate={searchParams.returnDate}
    isSearchResult={true}
  />
))}
            </div>

            {cars.length === 0 && (
              <div className={styles.noResults}>
                <p>
                  No cars available in {searchParams.pickupLocation} for the
                  selected dates.
                </p>
                <p>Please try different dates or locations.</p>
                <button
                  className={styles.searchButton}
                  onClick={() => navigate("/")}
                >
                  Modify Search
                </button>
              </div>
            )}
          </>
        )}

        <div className={styles.howItWorks}>
          <h2>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>🚗</div>
              <h3>Selfdrives Rent A Car</h3>
              <p>
                Just select your Duration, Location and Car. All on the site!
                It's all super easy.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>🔑</div>
              <h3>Delivery</h3>
              <p>
                We deliver your selected rental car on your visit to our rental
                location in {searchParams.pickupLocation}.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>🛣️</div>
              <h3>Drive Anywhere</h3>
              <p>
                Enjoy the freedom to self drive your rental car to any
                destination across INDIA.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>↩️</div>
              <h3>Return Car</h3>
              <p>
                You can return the car back after completing your trip at our
                provided location in{" "}
                {searchParams.returnLocation || searchParams.pickupLocation}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
