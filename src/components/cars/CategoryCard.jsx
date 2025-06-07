import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ name, price, image, route }) => {
  return (
    <Link to={route} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>Starting at ₹{price}/day</p>
        <span className={styles.explore}>
          Explore <span className={styles.arrow}>→</span>
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
