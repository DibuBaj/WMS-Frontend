import React, { useState } from 'react';
import axios from 'axios';
import "./Pickup.css";

const Pickup = ({ addPickup }) => {
  const [formData, setFormData] = useState({
    address: '',
    dateTime: '',
    subscription: '1 Day ($1)',
    wasteType: 'Organic',
    amount: '',
    unit: 'kg'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    // Validate fields before sending request
    if (!formData.dateTime || !formData.address || !formData.amount) {
      setError("All fields are required.");
      return;
    }

    // Prepare payload (ensure proper format)
    const payload = {
      address: formData.address,  // ✅ FIX: Include location
      pickupDateTime: new Date(formData.dateTime).toISOString(),
      subscription: formData.subscription,
      wasteType: formData.wasteType.toLowerCase(),
      amount: Number(formData.amount),  // ✅ FIX: Ensure amount is a number
      unit: formData.unit
    };

    console.log("Sending Payload:", payload); // Debugging log

    try {
      const response = await axios.post(
        "http://localhost:3000/api/pickups",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Pickup Scheduled Successfully:", response.data);
      addPickup(response.data); // Update UI with the new pickup

      // Reset form fields after successful request
      setFormData({
        address: '',
        dateTime: '',
        subscription: '1 Day ($1)',
        wasteType: 'Organic',
        amount: '',
        unit: 'kg'
      });

    } catch (err) {
      console.error("Full Error Response:", err.response); // Debugging log
      setError(err.response?.data?.message || "Failed to schedule pickup");
    }
  };

  return (
    <div className="pickup-containerr">
      <h2 className='Maintext'>New Pickup Request</h2>
      <p className='subtext'>Schedule a new waste collection</p>
      
      {error && <p className="error-message">{error}</p>} {/* Show error message */}

      <form className="pickup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Pickup Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="pickup-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="pickup-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Subscription</label>
          <select
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            className="pickup-select"
            required
          >
            <option value="1 Day ($1)">1 Day ($1)</option>
            <option value="1 Month ($10)">1 Month ($10)</option>
            <option value="1 Year ($100)">1 Year ($100)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Waste Type</label>
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            className="pickup-select"
            required
          >
            <option value="Organic">Organic</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Non-Recyclable">Non-Recyclable</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="pickup-input"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="pickup-select"
            required
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        </div>

        <button type="submit" className="pickup-button">Schedule Pickup</button>
      </form>
    </div>
  );
};

export default Pickup;






