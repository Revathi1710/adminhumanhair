import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

function ViewBuilderEnquiry() {
  const { id } = useParams();
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        console.log("Vendor ID from URL:", id); // Debug log
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getEnquiriesByVendor/${id}`);
        console.log("API Response:", response.data); // Debug log
        if (response.data.status === 'ok') {
          setEnquiries(response.data.data);
        } else {
          setMessage('No enquiries found');
        }
      } catch (error) {
        console.error('Error fetching enquiries:', error);
        setMessage('Failed to load enquiries');
      }
    };

    fetchEnquiries();
  }, [id]);

  const totalPages = Math.ceil(enquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEnquiries = enquiries.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Sidebar />
      <div className="add-category-container">
        <div className="title">
          <h2 className="mb-4">All Enquiries</h2>
        </div>
        <div className="mb-3">
          {message && <p className="text-danger">{message}</p>}
          {enquiries.length > 0 ? (
            <>
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>SI.No</th>
                    <th>Date/Time</th>
                    <th>Property</th>
                    <th>Customer Name</th>
                    <th>Customer Number</th>
                    <th>Builder Name</th>
                    <th>Builder Number</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEnquiries.map((enquiry, index) => (
                    <tr key={enquiry._id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                      <td style={{textAlign:'left'}}>
                   <img
  src={`${process.env.REACT_APP_API_URL}/${enquiry.property_id?.PropertyImages?.[0]}`}
  width={50}
  alt="Property"
/>



                        {enquiry.property_id.bedrooms}BNK {enquiry.property_id.bathrooms} Bath  <br/>
                        Address:{enquiry.property_id.locality}<br/>
                        city:{enquiry.property_id.city}
                        
                        </td>
                      
                      <td>{enquiry.customername}</td>
                      <td>{enquiry.customerIdNumber}</td>
                      <td>{enquiry.ownerName || 'No Vendor'}</td>
                      <td>{enquiry.ownerNumber || 'No Vendor'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination mt-3">
                <button className="btn btn-primary" onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span className="mx-3">
                  Page {currentPage} of {totalPages}
                </span>
                <button className="btn btn-primary" onClick={nextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </>
          ) : (
            !message && <p>No Enquiries found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewBuilderEnquiry;
