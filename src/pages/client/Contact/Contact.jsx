import React, { useState } from "react";
import Header from "../../../components/shared/Header";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className={styles.contactPage}>
      <Header />
      <div className={styles.content}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>

        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <i className="fas fa-map-marker-alt"></i>
              <h3>Address</h3>
              <p>123 Car Street, Auto Nagar</p>
              <p>Bengaluru, Karnataka 560001</p>
            </div>
            <div className={styles.infoCard}>
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
              <p>+91 98765 43211</p>
            </div>
            <div className={styles.infoCard}>
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>info@driveseva.com</p>
              <p>support@driveseva.com</p>
            </div>
            <div className={styles.infoCard}>
              <i className="fas fa-clock"></i>
              <h3>Working Hours</h3>
              <p>Monday - Saturday</p>
              <p>9:00 AM - 8:00 PM</p>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
