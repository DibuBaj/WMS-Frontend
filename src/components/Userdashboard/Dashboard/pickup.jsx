import React, { useState } from 'react';
import "./Pickup.css";

const Pickup = ({ addPickup }) => {
  const [formData, setFormData] = useState({
    dateTime: '',
    location: '',
    subscription: '1 Day ($1)',
    wasteType: 'Organic',
    amount: '',
    unit: 'kg' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const date = new Date(formData.dateTime);
    
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options); 
    
    const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }); 

    const newPickup = {
        date: `${formattedDate} ${time}`, 
        location: formData.location,
        subscription: formData.subscription,
        type: formData.wasteType,
        amount: `${formData.amount} ${formData.unit}`, 
        status: "Pending" 
    };

    addPickup(newPickup);
    setFormData({ dateTime: '', location: '', subscription: '1 Day ($1)', wasteType: 'Organic', amount: '', unit: 'kg' });
  };

  return (
    <div className="pickup-containerr">
      <h2 className='Maintext'>New Pickup Request</h2>
      <p className='subtext'>Schedule a new waste collection</p>
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
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
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
            <option value="1d">1 Day ($1)</option>
            <option value="1m">1 Day ($10)</option>
            <option value="1y">1 Day ($100)</option>
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

