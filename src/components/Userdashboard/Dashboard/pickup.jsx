import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Pickup.css";

const Pickup = ({ addPickup }) => {
  const [formData, setFormData] = useState({
    address: '',
    dateTime: '',
    subscription: '1 Day (Rs.500)',
    wasteType: '',
    route: '',
    amount: '',
    unit: 'kg'
  });

  const [routes, setRoutes] = useState([]);
  const [wasteTypes, setWasteTypes] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRoutes();
    fetchWasteTypes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/route/get-routes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setRoutes(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch routes", err);
    }
  };

  const fetchWasteTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/collections", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        const types = [...new Set(response.data.collections.map(col => col.type))];
        setWasteTypes(types);
        setFormData(prev => ({ ...prev, wasteType: types[0] || '' }));
      }
    } catch (err) {
      console.error("Failed to fetch waste types", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "unit") {
      setFormData(prev => {
        const currentAmount = parseFloat(prev.amount);
        if (!isNaN(currentAmount)) {
          let newAmount = currentAmount;
          if (value === "g" && prev.unit === "kg") {
            newAmount = currentAmount * 1000;
          } else if (value === "kg" && prev.unit === "g" && currentAmount >= 1000) {
            newAmount = currentAmount / 1000;
          }
          return { ...prev, unit: value, amount: newAmount.toString() };
        }
        return { ...prev, unit: value };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAmountConversion = () => {
    setFormData(prev => {
      const amt = parseFloat(prev.amount);
      if (prev.unit === "g" && amt >= 1000) {
        return {
          ...prev,
          amount: (amt / 1000).toString(),
          unit: "kg"
        };
      }
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { address, dateTime, subscription, wasteType, route, amount, unit } = formData;

    if (!address || !dateTime || !amount || !wasteType || !route) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(Number(amount))) {
      setError("Amount must be a number.");
      return;
    }

    let adjustedAmount = Number(amount);
    let adjustedUnit = unit;
    if (unit === 'g' && adjustedAmount >= 1000) {
      adjustedAmount = adjustedAmount / 1000;
      adjustedUnit = 'kg';
    }

    const payload = {
      address,
      pickupDateTime: new Date(dateTime).toISOString(),
      subscription,
      wasteType: wasteType.toLowerCase(),
      route,
      amount: adjustedAmount,
      unit: adjustedUnit
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/pickups",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Pickup Scheduled Successfully:", response.data);
      addPickup(payload);

      setFormData({
        address: '',
        dateTime: '',
        subscription: '1 Day (Rs.500)',
        wasteType: wasteTypes[0] || '',
        route: '',
        amount: '',
        unit: 'kg'
      });

    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.response?.data?.message || "Failed to schedule pickup.");
    }
  };

  return (
    <div className="pickup-containerr">
      <h2 className='Maintext'>New Pickup Request</h2>
      <p className='subtext'>Schedule a new waste collection</p>

      {error && <p className="error-message">{error}</p>}

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
            placeholder="Enter pickup address"
            className="pickup-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Route</label>
          <select
            name="route"
            value={formData.route}
            onChange={handleChange}
            className="pickup-select"
            required
          >
            <option value="">Select a route</option>
            {routes.map(route => (
              <option key={route._id} value={route.routeName}>
                {route.routeName} ({route.routeId}) - {route.status}
              </option>
            ))}
          </select>
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
            <option value="1 Day (Rs.500)">1 Day (Rs.500)</option>
            <option value="1 Month (Rs.5000)">1 Month (Rs.5000)</option>
            <option value="1 Year (Rs.50000)">1 Year (Rs.50000)</option>
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
            <option value="">Select waste type</option>
            {wasteTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Waste Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAmountConversion();
            }}
            onBlur={handleAmountConversion}
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
