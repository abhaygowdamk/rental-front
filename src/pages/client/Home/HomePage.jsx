import React from "react";
import Header from "../../../components/shared/Header";
import Footer from "../../../components/shared/Footer";
import SearchForm from "../Search/SearchForm";
import CategoryCard from "../../../components/cars/CategoryCard";
import styles from "./HomePage.module.css";

const categories = [
  {
    name: "Economy",
    price: 5999,
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    route: "/categories/economy",
  },
  {
    name: "SUV",
    price: 6999,
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    route: "/categories/suv",
  },
  {
    name: "Luxury",
    price: 7999,
    image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
    route: "/categories/luxury",
  },
  {
    name: "Convertible",
    price: 8999,
    image: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
    route: "/categories/convertible",
  },
];

const clients = [
  {
    name: "Roger Scott",
    role: "System Analyst",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    name: "Roger Scott",
    role: "Marketing Manager",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    name: "Roger Scott",
    role: "Interface Designer",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
];

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <h1>Rent Your Perfect Car</h1>
          <p>Choose from our wide range of vehicles for any occasion</p>
        </div>
        <div className={styles.heroFilter}>
          <SearchForm />
        </div>
      </section>

      <section className={styles.categorySection} id="category">
        <h2 className={styles.leftAlign}>Browse by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      <section className={styles.clientsSection} id="about">
        <h2>Happy Clients</h2>
        <div className={styles.clientsGrid}>
          {clients.map((client, index) => (
            <div key={index} className={styles.clientCard}>
              <img
                src={client.img}
                alt={client.name}
                className={styles.clientImage}
              />
              <p>{client.text}</p>
              <h4>{client.name}</h4>
              <span>{client.role}</span>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
