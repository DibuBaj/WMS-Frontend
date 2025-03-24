import React from 'react';
import "./Pickup.css";

const Pickup = () => {
  return (
    <>
      <div className="pickup-container">
        <h2 className='Maintext'>New Pickup Request</h2>
        <p className='subtext'>Schedule a new waste collection</p>
        <div>
          <form className="pickup-form">
            <label  className='Textt-pickup'>Pickup Date & Time</label>
            <input type="datetime-local" className="pickup-input" />
            
            <label className='Textt-location'>Location</label>
            <input type="text" placeholder="Enter address" className="pickup-input" />
            
            <label className='Textt-route'>Route</label>
            <select className="pickup-select">
              <option>#123-Kathmandu</option>
            </select>
            
            <label className='Textt-type'>Waste Type</label>
            <select className="pickup-select">
              <option>Organic</option>
            </select>
            
            <label className='Textt-amount'>Amount (kg)</label>
            <input type="number" placeholder="Enter amount" className="pickup-input" />
            
            <button type="submit" className="pickup-button">Schedule Pickup</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pickup;