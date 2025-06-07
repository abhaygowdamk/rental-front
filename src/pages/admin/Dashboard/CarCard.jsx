import React from 'react';
import styles from './AdminCarDashboard.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function CarCard({ car, onEdit, onDelete }) {
  const carName = car.name || car.carName;
  const carCategory = car.category || car.carCategory;
  const price = car.price || car.pricePerDay;
  const status = car.status;
  const image = car.image || car.carImage;
  const specs = car.features || car.specs || car.description;

  return (
    <div className={styles.carCard}>
      <img src={image} alt={carName} className={styles.carImage} />
      <div className={styles.carDetails}>
        <div className={styles.carName}>{carName}</div>
        <div className={styles.carCategory}>Category: {carCategory}</div>
        <div className={styles.carPrice}>₹{price} per day</div>
        <div className={status === 'Available' ? styles.carStatus : styles.statusUnavailable}>
          {status}
        </div>
        <div className={styles.carSpecs}>{specs}</div>
      </div>
      <div className={styles.actionBtns}>
        <button className={styles.editBtn} title="Edit" onClick={onEdit}><FaEdit /></button>
        <button className={styles.deleteBtn} title="Delete" onClick={onDelete}><FaTrash /></button>
      </div>
    </div>
  );
}
