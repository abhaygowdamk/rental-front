import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ManageCars.module.css";

const statusColors = {
  Available: styles.statusAvailable,
  Booked: styles.statusBooked,
  Maintenance: styles.statusMaintenance,
};

const ManageCars = ({ cars, onDeleteCar }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredCars = (cars || []).filter((car) => {
    const carName = car?.name || car?.carName || '';
    return carName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerRow}>
        <h1>Manage Cars</h1>
        <button
          className={styles.addBtn}
          onClick={() => navigate("/admin/manage-cars/add")}
        >
          + Add New Car
        </button>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Search cars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Category</th>
              <th>Price/Day</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id || car._id}>
                <td>{car.name || car.carName}</td>
                <td>{car.category || car.carCategory}</td>
                <td>₹{car.price || car.pricePerDay}</td>
                <td>
                  <span
                    className={statusColors[car.status] || styles.statusDefault}
                  >
                    {car.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.editBtn}
                    title="Edit"
                    onClick={() =>
                      navigate(`/admin/manage-cars/edit/${car.id || car._id}`, {
                        state: { car },
                      })
                    }
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    className={styles.deleteBtn}
                    title="Delete"
                    onClick={() => onDeleteCar(car.id || car._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
