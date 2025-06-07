import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/shared/Header";
import styles from "./UserDashboard.module.css";

const user = {
  name: "Vignesh nayak",
  email: "anderson@email.com",
  phone: "+91 9876543219",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
};


const paymentHistory = [
  {
    id: "BK-2024-001",
    carId: "SC001",
    amount: 7000,
    date: "Jan 15, 2024",
    status: "Paid",
  },
  {
    id: "BK-2024-002",
    carId: "SC002",
    amount: 9500,
    date: "Feb 1, 2024",
    status: "Paid",
  },
  {
    id: "BK-2024-003",
    carId: "SC003",
    amount: 8500,
    date: "Feb 10, 2024",
    status: "Pending",
  },
];

const savedCars = [
  {
    id: 1,
    name: "Tesla Model 3",
    price: "$75/day",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  },
  {
    id: 2,
    name: "BMW X5",
    price: "$95/day",
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
  },
  {
    id: 3,
    name: "Mercedes C-Class",
    price: "$85/day",
    image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
  },
];

const navLinks = [
  { label: "Profile Overview", anchor: "overview" },
  { label: "Booking History", anchor: "booking" },
  { label: "Payment History", anchor: "payments" },
  { label: "Saved Cars", anchor: "saved" },
];

const UserProfile = () => {
  const [saved, setSaved] = useState(new Set(savedCars.map((c) => c.id)));
  const [bookingHistory, setBookingHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId") || "USER123";
        const res = await import("../../../services/bookingService");
        const data = await res.getUserBookings(userId);
        setBookingHistory(data);
      } catch (err) {
        setBookingHistory([]);
      }
    };
    fetchBookings();
  }, []);

  const handleSaveToggle = (carId) => {
    setSaved((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(carId)) newSet.delete(carId);
      else newSet.add(carId);
      return newSet;
    });
  };

  const handleNav = (anchor) => {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userAvatar");
    navigate("/");
  };

  return (
    <div className={styles.profilePage}>
      <Header />
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.profileInfo}>
            <img src={user.photo} alt="Profile" className={styles.profilePic} />
            <h2>{user.name}</h2>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.phone}>{user.phone}</p>
          </div>
          <nav className={styles.navLinks}>
            {navLinks.map((link) => (
              <button key={link.anchor} onClick={() => handleNav(link.anchor)}>
                {link.label}
              </button>
            ))}
          </nav>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Booking History */}
          <section id="booking" className={styles.section}>
            <h3>Booking History</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Booking ID</th>
                    <th>Car ID</th>
<th>Car Name</th>
                    <th>Car Category</th>
                    <th>Price Per Day</th>
                    <th>Duration</th>
                    <th>Number of Days</th>
                    <th>Pick-Up Location</th>
                    <th>Return Location</th>
                    <th>Payment ID</th>
                    <th>Payment Date</th>
                    <th>Total Amount</th>
                    <th>Booking Status</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingHistory.map((b) => (
                    <tr key={b.bookingId}>
                      <td>{b.userId}</td>
                      <td>{b.bookingId}</td>
                      <td>{b.carId}</td>
                      <td>{b.carName}</td>
                      <td>{b.carCategory}</td>
                      <td>{b.pricePerDay}</td>
                      <td>{b.duration}</td>
                      <td>{b.numberOfDays}</td>
                      <td>{b.pickUpLocation}</td>
                      <td>{b.returnLocation}</td>
                      <td>{b.paymentId}</td>
                      <td>{b.paymentDate || "-"}</td>
                      <td>{b.totalAmount}</td>
                      <td>
                        <span
                          className={
                            b.bookingStatus === "Completed"
                              ? styles.completed
                              : b.bookingStatus === "Approved"
                              ? styles.approved
                              : styles.pending
                          }
                        >
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            b.paymentStatus === "Paid"
                              ? styles.completed
                              : styles.pending
                          }
                        >
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td>
                        {b.bookingStatus === "Pending" ? (
                          <span className={styles.waitingBadge}>Wait</span>
                        ) : b.bookingStatus === "Approved" ? (
                          <button
                            className={styles.actionButton}
                            onClick={() => navigate("/confirm-booking", { state: { bookingId: b.bookingId } })}
                          >
                            Go to Booking Page
                          </button>
                        ) : (
                          <button
                            className={styles.actionButton}
                            onClick={() => navigate("/")}
                          >
                            Browse Cars
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Payment History */}
          <section id="payments" className={styles.section}>
            <h3>Payment History</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Car ID</th>
<th>Amount</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.carId}</td>
                      <td>₹{p.amount}</td>
                      <td>{p.date}</td>
                      <td>
                        <span
                          className={
                            p.status === "Paid" ? styles.paid : styles.pending
                          }
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Saved Cars */}
          <section id="saved" className={styles.section}>
            <h3>Saved Cars</h3>
            <div className={styles.savedCarsGrid}>
              {savedCars.map((car) => (
                <div key={car.id} className={styles.savedCarCard}>
                  <img src={car.image} alt={car.name} />
                  <div className={styles.savedCarInfo}>
                    <div className={styles.savedCarHeader}>
                      <h4>{car.name}</h4>
                      <button
                        className={styles.heartBtn}
                        onClick={() => handleSaveToggle(car.id)}
                      >
                        <i
                          className={
                            saved.has(car.id) ? "fas fa-heart" : "far fa-heart"
                          }
                        ></i>
                      </button>
                    </div>
                    <p className={styles.savedCarPrice}>{car.price}</p>
                    <button className={styles.rentNow}>Rent Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <footer className={styles.footer}>
        © 2024 CarRent. All rights reserved.
      </footer>
    </div>
  );
};

export default UserProfile;
