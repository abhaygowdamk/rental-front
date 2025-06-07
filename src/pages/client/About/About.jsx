import React from "react";
import Header from "../../../components/shared/Header";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <Header />
      <div className={styles.content}>
        <h1>About DriveSeva</h1>
        <div className={styles.aboutContent}>
          <section className={styles.section}>
            <h2>Our Mission</h2>
            <p>
              At DriveSeva, we're committed to providing convenient, reliable,
              and affordable car rental services to our customers. Our mission
              is to make car rental accessible to everyone while ensuring the
              highest standards of service and safety.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Why Choose Us?</h2>
            <div className={styles.features}>
              <div className={styles.feature}>
                <i className="fas fa-car"></i>
                <h3>Wide Selection</h3>
                <p>
                  Choose from our extensive fleet of well-maintained vehicles
                </p>
              </div>
              <div className={styles.feature}>
                <i className="fas fa-shield-alt"></i>
                <h3>Safe & Reliable</h3>
                <p>
                  All our cars undergo regular maintenance and safety checks
                </p>
              </div>
              <div className={styles.feature}>
                <i className="fas fa-wallet"></i>
                <h3>Best Prices</h3>
                <p>
                  Competitive rates and transparent pricing with no hidden fees
                </p>
              </div>
              <div className={styles.feature}>
                <i className="fas fa-headset"></i>
                <h3>24/7 Support</h3>
                <p>Our customer support team is always here to help you</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Our Story</h2>
            <p>
              Founded with a vision to revolutionize the car rental industry in
              India, DriveSeva has grown from a small local business to one of
              the most trusted names in car rentals. We take pride in our
              commitment to customer satisfaction and our contribution to making
              travel more accessible and enjoyable for everyone.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
