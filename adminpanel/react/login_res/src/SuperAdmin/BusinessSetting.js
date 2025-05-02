import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Adjust path if needed
import './addcategory.css';

function BusinessSetting() {
  const [business, setBusiness] = useState({ otpEnable: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BUSINESS_ID = '6811cd66ebc5f31faa61db1f'; // Replace with your actual document ID

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/OTPenable/${BUSINESS_ID}`);
        setBusiness(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch settings');
        setLoading(false);
      }
    };

    fetchSetting();
  }, []);
  

  const handleToggle = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/OTPenable/${BUSINESS_ID}`, {
        otpEnable: !business.otpEnable,
      });
      setBusiness(res.data);
    } catch (err) {
      setError('Failed to update setting');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Sidebar />
      <div className="add-category-container">
        <div className="title">
          <h2 className="mb-4">Business Setting</h2>
        </div>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h5>Register OTP Enable / Disable</h5>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="otpToggle"
                checked={business.otpEnable}
                onChange={handleToggle}
              />
              <label className="form-check-label" htmlFor="otpToggle">
                {business.otpEnable ? 'Enabled' : 'Disabled'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessSetting;
