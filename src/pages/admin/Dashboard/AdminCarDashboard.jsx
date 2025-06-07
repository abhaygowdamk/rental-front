import React, { useState, useEffect } from 'react';
import AddEditCarModal from '../Cars/AddEditCarModal';
import CarCard from './CarCard';
import styles from './AdminCarDashboard.module.css';
import { FaMapMarkerAlt, FaCarSide } from 'react-icons/fa';

const CITIES = ['Udupi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai'];
const CATEGORIES = [
  { key: 'econ', label: 'Economical', endpoint: '/api/econ-cars' },
  { key: 'suv', label: 'SUV', endpoint: '/api/suv-cars' },
  { key: 'lux', label: 'Luxury', endpoint: '/api/lux-cars' },
  { key: 'conv', label: 'Convertible', endpoint: '/api/conv-cars' },
];

export default function AdminCarDashboard() {
  // State for city cars and category cars
  const [cityCars, setCityCars] = useState({});
  const [categoryCars, setCategoryCars] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [modalContext, setModalContext] = useState({}); // { city, category, car }

  // Fetch cars by city
  useEffect(() => {
    CITIES.forEach(async (city) => {
      const res = await fetch(`/api/search/cars?pickUpLocation=${city}`);
      const cars = await res.json();
      setCityCars((prev) => ({ ...prev, [city]: cars }));
    });
  }, []);

  // Fetch cars by category
  useEffect(() => {
    CATEGORIES.forEach(async (cat) => {
      const res = await fetch(cat.endpoint);
      const cars = await res.json();
      setCategoryCars((prev) => ({ ...prev, [cat.key]: cars }));
    });
  }, []);

  // Helper to refresh cars by city
  const refreshCityCars = async (city) => {
    const res = await fetch(`/api/search/cars?pickUpLocation=${city}`);
    const cars = await res.json();
    setCityCars((prev) => ({ ...prev, [city]: cars }));
  };
  // Helper to refresh cars by category
  const refreshCategoryCars = async (catKey, endpoint) => {
    const res = await fetch(endpoint);
    const cars = await res.json();
    setCategoryCars((prev) => ({ ...prev, [catKey]: cars }));
  };

  // Handler functions for add/edit/delete
  const handleAddCar = (context) => {
    setModalMode('add');
    setModalContext(context);
    setModalOpen(true);
  };
  const handleEditCar = (context) => {
    setModalMode('edit');
    setModalContext(context);
    setModalOpen(true);
  };
  const handleDeleteCar = async (context) => {
    if (context.city) {
      // City-based: SearchCar
      await fetch(`/api/search/cars/${context.carId}`, { method: 'DELETE' });
      refreshCityCars(context.city);
    } else if (context.category) {
      // Category-based
      const cat = CATEGORIES.find((c) => c.key === context.category);
      if (cat) {
        await fetch(`${cat.endpoint}/${context.carId}`, { method: 'DELETE' });
        refreshCategoryCars(cat.key, cat.endpoint);
      }
    }
  };

  // Save handler for modal
  const handleSaveCar = async (form) => {
    try {
      if (modalContext.city) {
        // City-based: SearchCar
        if (modalMode === 'add') {
          // Generate unique carId
          if (!form.carId) {
            form.carId = 'car-' + Date.now();
          }
          // Ensure carCategory is present (default to 'Economy' if not set)
          if (!form.carCategory) {
            form.carCategory = 'Economy';
          }
          // Debug: log final form data
          console.log('Submitting city-based car:', form);
          const res = await fetch('/api/search/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
          const data = await res.json().catch(() => ({}));
          console.log('Add car response:', data);
          if (!res.ok) throw new Error(data.error || 'Failed to add car');
          window.alert('Car added successfully!');
        } else if (modalMode === 'edit') {
          const res = await fetch(`/api/search/cars/${form._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
          if (!res.ok) throw new Error('Failed to edit car');
          window.alert('Car updated successfully!');
        }
        await refreshCityCars(modalContext.city);
      } else if (modalContext.category) {
        // Category-based
        const cat = CATEGORIES.find((c) => c.key === modalContext.category);
        if (cat) {
          if (modalMode === 'add') {
            // Ensure carId is present
            if (!form.carId) {
              form.carId = 'car-' + Date.now();
            }
            // Map frontend cat.key to backend carCategory
            const catKeyToBackend = {
              econ: 'Economy',
              suv: 'SUV',
              lux: 'Luxury',
              conv: 'Convertible',
            };
            form.carCategory = catKeyToBackend[cat.key];
            const res = await fetch(cat.endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form),
            });
            const data = await res.json().catch(() => ({}));
            console.log('Add car response:', data);
            if (!res.ok) throw new Error(data.error || 'Failed to add car');
            window.alert('Car added successfully!');
          } else if (modalMode === 'edit') {
            const res = await fetch(`${cat.endpoint}/${form._id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed to edit car');
            window.alert('Car updated successfully!');
          }
          await refreshCategoryCars(cat.key, cat.endpoint);
        }
      }
    } catch (err) {
      window.alert(err.message || 'Something went wrong while saving car.');
    }
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Manage Cars by City</h2>
      <div className={styles.grid}>
        {CITIES.map((city) => (
          <div className={styles.cityCard} key={city}>
            <div className={styles.cityHeader}>
              <FaMapMarkerAlt color="#3CB371" /> {city}
            </div>
            <div className={styles.carsList}>
              {(cityCars[city] || []).map((car) => (
                <CarCard
                  key={car._id || car.id}
                  car={car}
                  onEdit={() => handleEditCar({ city, car })}
                  onDelete={() => handleDeleteCar({ city, carId: car._id || car.id })}
                />
              ))}
            </div>
            <button className={styles.addBtn} onClick={() => handleAddCar({ city })}>
              + Add Car in {city}
            </button>
          </div>
        ))}
      </div>
      <h2 className={styles.sectionTitle}>Manage Cars by Category</h2>
      <div className={styles.grid}>
        {CATEGORIES.map((cat) => (
          <div className={styles.categoryCard} key={cat.key}>
            <div className={
              styles.categoryHeader + ' ' +
              (cat.key === 'econ' ? styles.headerEconomical :
                cat.key === 'suv' ? styles.headerSUV :
                cat.key === 'lux' ? styles.headerLuxury :
                cat.key === 'conv' ? styles.headerConvertible :
                '')
            }>
              <FaCarSide /> {cat.label}
            </div>
            <div className={styles.carsList}>
              {(categoryCars[cat.key] || []).map((car) => (
                <CarCard
                  key={car._id || car.id}
                  car={car}
                  onEdit={() => handleEditCar({ category: cat.key, car })}
                  onDelete={() => handleDeleteCar({ category: cat.key, carId: car._id || car.id })}
                />
              ))}
            </div>
            <button
              className={
                styles.addBtn + ' ' +
                (cat.key === 'econ' ? '' :
                  cat.key === 'suv' ? styles.addBtnSUV :
                  cat.key === 'lux' ? styles.addBtnLuxury :
                  cat.key === 'conv' ? styles.addBtnConvertible :
                  '')
              }
              onClick={() => handleAddCar({ category: cat.key })}
            >
              + Add Car in {cat.label}
            </button>
          </div>
        ))}
      </div>
      {modalOpen && (
        <AddEditCarModal
          open={modalOpen}
          mode={modalMode}
          context={modalContext}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveCar}
        />
      )}
    </div>
  );
}
