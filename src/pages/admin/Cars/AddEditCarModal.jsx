import React, { useState, useRef, useEffect } from 'react';
import styles from './AddEditCarModal.module.css';

export default function AddEditCarModal({ open, mode, context, onClose, onSave }) {
  const [form, setForm] = useState(context.car || {
    carName: '',
    pricePerDay: '',
    carImage: '',
    status: 'Available',
    description: '',
    pickUpLocation: context.city || '',
    carCategory: context.category || '',
  });
  const inputRef = useRef();
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}
        >
          ×
        </button>
        <div className={styles.modalTitle}>{mode === 'add' ? 'Add Car' : 'Edit Car'}</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="carName">Car Name</label>
            <input ref={inputRef} id="carName" name="carName" className={styles.formInput} value={form.carName} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pricePerDay">Price Per Day</label>
            <input id="pricePerDay" name="pricePerDay" className={styles.formInput} value={form.pricePerDay} onChange={handleChange} type="number" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="carImage">Image URL</label>
            <input id="carImage" name="carImage" className={styles.formInput} value={form.carImage} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" className={styles.formSelect} value={form.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <input id="description" name="description" className={styles.formInput} value={form.description} onChange={handleChange} required />
          </div>
          {/* Car Category dropdown for city-based add */}
          {context.city && !context.category && (
            <div className={styles.formGroup}>
              <label htmlFor="carCategory">Category</label>
              <select
                id="carCategory"
                name="carCategory"
                className={styles.formSelect}
                value={form.carCategory || 'Economy'}
                onChange={handleChange}
                required
              >
                <option value="Economy">Economy</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>
          )}
          {context.city && (
            <input name="pickUpLocation" value={context.city} type="hidden" />
          )}
          {context.category && (
            <input name="carCategory" value={context.category} type="hidden" />
          )}
          <div className={styles.formActions}>
            <button className={styles.saveBtn} type="submit">{mode === 'add' ? 'Add Car' : 'Save Changes'}</button>
            <button className={styles.cancelBtn} type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
