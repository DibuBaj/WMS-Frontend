import React, { useState } from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar.jsx";
import Pickup from "../components/Userdashboard/Dashboard/Pickup.jsx";
import Recentpickup from "../components/Userdashboard/Dashboard/Recentpickup.jsx";
import Header from "../components/Userdashboard/Navbar/Header.jsx";
import "../components/Userdashboard/Dashboard/Dashboard.css";
import Esewa from "../assets/Esewa.jpg";
import Khalti from "../assets/Khalti.png";
import Imepay from "../assets/Imepay.jpg";
import SuccessPopup from "../components/Userdashboard/Navbar/SuccessPopup";
import ErrorPopup from "../components/Userdashboard/Navbar/ErrorPopup";



const Userdashboard = () => {
  const [recentPickups, setRecentPickups] = useState([
    { date: "Jan 15, 2025 5:30am", location: "Newroad", type: "Organic", amount: "50 kg", status: "Pending", payment: "" },
    { date: "Jan 14, 2025 6:30am", location: "Newroad", type: "Recyclable", amount: "30 kg", status: "Completed", payment: "" },
    { date: "Jan 13, 2025 8:30am", location: "Newroad", type: "Organic", amount: "25 kg", status: "Completed", payment: "" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [currentPickup, setCurrentPickup] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const addPickup = (newPickup) => {
    setCurrentPickup(newPickup);
    setPopupMessage(
      `New pickup request added successfully!\nSubscription: ${newPickup.subscription}.\nPlease select a payment method.`
    );
    setShowPopup(true);
  };

  const handlePaymentSelection = (paymentMethod) => {
    if (currentPickup) {
      const updatedPickup = { ...currentPickup, payment: paymentMethod };
      setRecentPickups(prev => [updatedPickup, ...prev]);
      setShowPopup(false);

      // Simulate payment processing
      if (paymentMethod) {
        // If paymentMethod is valid, show success popup
        setPaymentSuccess(true);
        setPaymentError(false);

        
        setTimeout(() => {
          setPaymentSuccess(false);
        }, 3000);
      } else {
       
        setPaymentError(true);
        setPaymentSuccess(false);

        setTimeout(() => {
          setPaymentError(false);
        }, 3000);
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
              <img src={Esewa} alt="Esewa" onClick={() => handlePaymentSelection("Esewa")} className="payment-icon" />
              <img src={Khalti} alt="Khalti" onClick={() => handlePaymentSelection("Khalti")} className="payment-icon" />
              <img src={Imepay} alt="Imepay" onClick={() => handlePaymentSelection("Imepay")} className="payment-icon" />
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render SuccessPopup or ErrorPopup based on the payment status */}
      {paymentSuccess && <SuccessPopup message="Payment successful! Your pickup has been processed." />}
      {paymentError && <ErrorPopup message="Payment failed. Please try again." />}
    </>
  );
};

export default Userdashboard;

