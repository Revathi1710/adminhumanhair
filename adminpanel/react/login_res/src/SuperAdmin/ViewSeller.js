import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../SuperAdmin/addcategory.css';

import Sidebar from './sidebar'; 
import '../Vendors/UserProfile.css';
import './Vendorview.css';

const ViewSeller = () => {
    const { id } = useParams();
 
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState({
    fname: '',
    lname: '',
    email: '',
    alterEmail: '',
    number: '',
    alterNumber: '',
    whatsappNumber: '',
    jobTitle: '',
    businessName: ''
  });
  const [error, setError] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);


  useEffect(() => {
    axios.post(`http://localhost:5000/vendorDataAdmin`, { id })
      .then(response => {
        if (response.data.status === 'ok') {
          setVendorData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, [id]);

  const handleSubMenuToggle = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vendortoken = window.localStorage.getItem('vendortoken');
    const vendorId = window.localStorage.getItem('vendorId');
    axios.put('http://localhost:5000/updateUserProfileVendorAdmin', vendorData, {
      headers: { 'Authorization': `Bearer ${vendortoken} `}
    })
    .then(response => {
      if (response.data.status === 'ok') {
        navigate('/Vendor/Dashboard');
      } else {
        setError(response.data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error.message);
    });
  };

  return (
    <div className="update-profile-vendor">
      <Sidebar />
      <div className="content  content2 row mt-5">
      
        <div className='col-sm-7'>
          <h3>Vendor Profile</h3>
          {error && <p className="error">{error}</p>}
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="mb-3 col-sm-6">
                  <div className="labelcontainer mb-3">
                    <label htmlFor="fname">First Name:</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    name="fname"
                    placeholder='Enter First Name'
                    value={vendorData.fname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-sm-6">
                  <div className="labelcontainer mb-3">
                    <label htmlFor="lname">Last Name:</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    name="lname"
                    placeholder='Enter Last Name'
                    value={vendorData.lname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='row'>
                <div className="form-group col-sm-6">
                  <div className="mb-3">
                    <div className="labelcontainer mb-3">
                      <label htmlFor="email">Email:</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={vendorData.email}
                      onChange={handleChange}
                      placeholder='Enter Email'
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div className="mb-3">
                    <div className="labelcontainer mb-3">
                      <label htmlFor="alterEmail">Alternate Email:</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="alterEmail"
                      name="alterEmail"
                      placeholder='Alternate Email'
                      value={vendorData.alterEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="form-group col-sm-6">
                  <div className="mb-3">
                    <div className="labelcontainer mb-3">
                      <label htmlFor="number">Phone Number:</label>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="number"
                      name="number"
                      placeholder='Enter Phone Number'
                      value={vendorData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div className="mb-3">
                    <div className="labelcontainer mb-3">
                      <label htmlFor="alterNumber">Alternate Phone Number:</label>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="alterNumber"
                      name="alterNumber"
                      placeholder='Alternate Phone Number'
                      value={vendorData.alterNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="form-group col-sm-6">
                  <div className="mb-3">
                    <div className="labelcontainer mb-3">
                      <label htmlFor="whatsappNumber">WhatsApp Number:</label>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      placeholder='Enter WhatsApp Number'
                      value={vendorData.whatsappNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group col-sm-6">
                  <div className="mb-3">
                    <div className="labelcontainer mb-3">
                      <label htmlFor="jobTitle">Job Title:</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="jobTitle"
                      name="jobTitle"
                      placeholder='Enter Job Title'
                      value={vendorData.jobTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
             
              <div className="button-container mt-3">
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
          
          
        </div>
          
        
      </div>
    </div>
  );
};

export default ViewSeller;