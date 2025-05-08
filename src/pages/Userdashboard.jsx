import React, { useState, useEffect } from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar.jsx";
import Pickup from "../components/Userdashboard/Dashboard/pickup.jsx";
import Recentpickup from "../components/Userdashboard/Dashboard/Recentpickup.jsx";
import Header from "../components/Userdashboard/Navbar/Header.jsx";
import "../components/Userdashboard/Dashboard/Dashboard.css";
import Esewa from "../assets/Esewa.jpg";
import Khalti from "../assets/Khalti.png";
import Imepay from "../assets/Imepay.jpg";
import SuccessPopup from "../components/Userdashboard/Navbar/SuccessPopup";
import ErrorPopup from "../components/Userdashboard/Navbar/ErrorPopup";
import Footer from "../components/Userdashboard/Navbar/Footer.jsx";

const Userdashboard = () => {
  const [recentPickups, setRecentPickups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [currentPickup, setCurrentPickup] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch recent pickups on mount
  useEffect(() => {
    const fetchRecentPickups = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pickups/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.message === "Pickup history retrieved successfully for user") {
          const transformedData = result.pickups
            .map((pickup) => ({
              date: new Date(pickup.pickupDateTime).toLocaleString(),
              address: pickup.address, // Address from the API response
              type: pickup.wasteType.charAt(0).toUpperCase() + pickup.wasteType.slice(1),
              amount: `${pickup.amount} ${pickup.unit}`,
              status: pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1),
              payment: "", 
            }))
            .slice(0, 5); 

          setRecentPickups(transformedData);
        }
      } catch (err) {
        console.error("Error fetching recent pickups:", err);
      }
    };

    fetchRecentPickups();
  }, [token]);

  const addPickup = (newPickup) => {
    setCurrentPickup(newPickup);
    setPopupMessage(
      `New pickup request added successfully!\nSubscription: ${newPickup.subscription}.\nPlease select a payment method.`
    );
    
    setShowPopup(true);
  };

  const handlePaymentSelection = async (paymentMethod) => {
    if (currentPickup) {
      // Update the current pickup with payment method
      const updatedPickup = { ...currentPickup, payment: paymentMethod };

      // Hide the payment popup
      setShowPopup(false);

      try {
        // Re-fetch the data from the API to reflect the latest pickup list
        const response = await fetch("http://localhost:3000/api/pickups/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.message === "Pickup history retrieved successfully for user") {
          const transformedData = result.pickups
            .map((pickup) => ({
              date: new Date(pickup.pickupDateTime).toLocaleString(),
              address: pickup.address, // Address from the API response
              type: pickup.wasteType.charAt(0).toUpperCase() + pickup.wasteType.slice(1),
              amount: `${pickup.amount} ${pickup.unit}`,
              status: pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1),
              payment: "", // Placeholder, since it's not in the API
            }))
            .slice(0, 5); // Take only the first 5 pickups

          // Merge the newly added pickup with the fetched data, filter out empty/invalid pickups
          setRecentPickups((prev) => {
            const validUpdatedPickup = updatedPickup && updatedPickup.date && updatedPickup.address; // Check if pickup is valid
            const newData = validUpdatedPickup ? [updatedPickup, ...transformedData] : [...transformedData];
            return newData.slice(0, 5); // Always limit to 5 most recent pickups
          });
        }
      } catch (err) {
        console.error("Error updating pickups:", err);
        setPaymentError(true);
        setTimeout(() => setPaymentError(false), 3000);
      }

      // Show success message if payment method is selected successfully
      if (paymentMethod) {
        setPaymentSuccess(true);
        setTimeout(() => setPaymentSuccess(false), 3000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="user-dashboard">
        <Sidebar />
        <div className={`dashboard-wrapper ${showPopup ? "blurred" : ""}`}>
          <Pickup addPickup={addPickup} />
          <Recentpickup recentPickups={recentPickups} />
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">
            <button className="close-button" onClick={() => setShowPopup(false)}>✖</button>
            <p>{popupMessage}</p>
            <div className="payment-options">
              <img className="esewa payment-icon" src={Esewa} alt="Esewa" onClick={() => handlePaymentSelection("Esewa")} />
              <img className="khalti payment-icon" src={Khalti} alt="Khalti" onClick={() => handlePaymentSelection("Khalti")} />
              <img className="imepay payment-icon" src={Imepay} alt="Imepay" onClick={() => handlePaymentSelection("Imepay")} />
            </div>
          </div>
        </div>
      )}

      {paymentSuccess && <SuccessPopup message="Payment successful! Your pickup has been processed." />}
      {paymentError && <ErrorPopup message="Payment failed. Please try again." />}
      <Footer/>

    </>
  );
};

export default Userdashboard;
