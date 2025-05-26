import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Adjust the path as needed
import './addcategory.css'; // Add styles or Bootstrap override here
import 'bootstrap/dist/css/bootstrap.min.css';

function BusinessSetting() {
  const [business, setBusiness] = useState({ otpEnable: false, NumberViewEnable: false });
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

  const handleOtpToggle = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/OTPenable/${BUSINESS_ID}`, {
        otpEnable: !business.otpEnable,
      });
      setBusiness(res.data);
    } catch (err) {
      setError('Failed to update OTP setting');
    }
  };

  const handleNumberViewToggle = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/OTPenable/${BUSINESS_ID}`, {
        NumberViewEnable: !business.NumberViewEnable,
      });
      setBusiness(res.data);
    } catch (err) {
      setError('Failed to update Number View setting');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading settings...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <>
      <Sidebar />
      <div className='add-category-container'>
      <div className="container mt-4">
        <div className="card shadow-sm rounded p-4">
          <h3 className="mb-4 text-primary">Business Settings</h3>

          <div className="form-group d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="mb-1">Register OTP</h5>
              <small className="text-muted">Enable or disable OTP verification during registration.</small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="otpToggle"
                checked={business.otpEnable}
                onChange={handleOtpToggle}
              />
              <label className="form-check-label ms-2" htmlFor="otpToggle">
                {business.otpEnable ? 'Enabled' : 'Disabled'}
              </label>
            </div>
          </div>

          <div className="form-group d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">View Mobile Number</h5>
              <small className="text-muted">Control whether Builder' phone numbers are viewable.</small>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="numberViewToggle"
                checked={business.NumberViewEnable}
                onChange={handleNumberViewToggle}
              />
              <label className="form-check-label ms-2" htmlFor="numberViewToggle">
                {business.NumberViewEnable ? 'Enabled' : 'Disabled'}
              </label>
            </div>
          </div>
        </div>
      </div></div>
    </>
  );
}

export default BusinessSetting;
