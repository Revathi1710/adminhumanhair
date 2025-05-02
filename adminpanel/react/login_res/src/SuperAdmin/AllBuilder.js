import React, { useState, useEffect } from 'react';  
import Sidebar from './Sidebar';
import axios from 'axios';
import "../Vendors/table.css";

const AllBuilder = () => {
  const [vendors, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/allBuilder`);
        const data = response.data;
        if (data.status === 'ok') {
          setUsers(data.data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('An error occurred: ' + error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleView = (VendorId) => {
    window.location.href = `/SuperAdmin/ViewSeller/${VendorId}`;
  };

  const handleApproved = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateApprovedVendor/${id}`,
        { approved: newStatus }
      );

      const data = response.data;
      if (data.status === 'ok') {
        setUsers(vendors.map(vendor =>
          vendor._id === id ? { ...vendor, approved: newStatus } : vendor
        ));
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  const toggleRow = (vendorId) => {
    setExpandedRows(prev => ({
      ...prev,
      [vendorId]: !prev[vendorId]
    }));
  };

  return (
    <div>
    <Sidebar />
    <div className="add-category-container">
        <div className="title">
        <h2 className='mb-4'>All Builder</h2>
        </div>
        {message && <p>{message}</p>}
        {vendors.length > 0 ? (
            <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>SI.No</th>
                <th>Name</th>
                <th>Email</th>
               
                <th>Number</th>
                <th>Date Added</th>
               <th>View</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td>
                   
                    {index + 1}
                  </td>
                  <td>{vendor.fname}</td>
                  <td>{vendor.email}</td>
                  
                  <td>{vendor.number}</td>
                  <td>{new Date(vendor.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                 
                
                  
                  <td>
                    <button
                      className="btn btn-primary btn-sm mt-2 mb-2 width-100"
                      onClick={() => handleView(vendor._id)}
                    >
                      View
                    </button>
                 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No vendors found</p>
        )}
      </div>
    </div>
  );
};

export default AllBuilder;
