import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/Auth/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import AdminProfile from "./pages/admin/Profile/AdminProfile";
import ManageCars from "./pages/admin/Cars/ManageCars";
import AddCar from "./pages/admin/Cars/AddCar";
import EditCar from "./pages/admin/Cars/EditCar";
import AdminCarDashboard from "./pages/admin/Dashboard/AdminCarDashboard";
import HomePage from "./pages/client/Home/HomePage";
import LoginPage from "./pages/client/Auth/LoginPage";
import SignupPage from "./pages/client/Auth/SignupPage";
import UserDashboard from "./pages/client/Profile/UserDashboard";
import SearchResults from "./pages/client/Search/SearchResults";
import ConfirmPage from "./pages/client/Booking/ConfirmPage";
import PaymentPage from "./pages/client/Payment/PaymentPage";
import BookingSuccess from "./pages/client/Payment/BookingSuccess";
import PaymentSuccess from "./pages/client/Payment/PaymentSuccess";
import Economy from "./pages/client/Categories/Economy";
import SUV from "./pages/client/Categories/SUV";
import Luxury from "./pages/client/Categories/Luxury";
import Convertible from "./pages/client/Categories/Convertible";
import About from "./pages/client/About/About";
import Contact from "./pages/client/Contact/Contact";
import ViewBookings from "./pages/admin/Bookings/ViewBookings";
import ManagePayments from "./pages/admin/Payments/ManagePayments";
import AllUsersPage from "./pages/client/Auth/AllUsersPage";
import AddressForm from "./components/AddressForm";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Dashboard" element={<UserDashboard />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/booking" element={<ConfirmPage />} />
<Route path="/confirm-booking" element={<ConfirmPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="/admin" element={<AdminLogin/>}/>

        {/* Category Routes */}
        <Route path="/categories/economy" element={<Economy />} />
        <Route path="/categories/suv" element={<SUV />} />
        <Route path="/categories/luxury" element={<Luxury />} />
        <Route path="/categories/convertible" element={<Convertible />} />

        {/* Address Form Route */}
        <Route path="/address-form" element={<AddressForm />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route
            path="manage-cars"
            element={<AdminCarDashboard />}
          />
          <Route path="bookings" element={<ViewBookings />} />
          <Route path="payments" element={<ManagePayments />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
