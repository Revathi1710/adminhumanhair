import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AllEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/getAllEnquiry`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          setEnquiries(data.data);
        } else {
          setMessage('Error fetching enquiries: ' + data.message);
        }
      })
      .catch(() => {
        setMessage('Error fetching enquiries');
      });
  }, []);

  const totalPages = Math.ceil(enquiries.length / itemsPerPage);
  const displayedEnquiries = enquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    const modal = new window.bootstrap.Modal(document.getElementById('propertyModal'));
    modal.show();
  };

  return (
    <div>
      <Sidebar />
      <div className="add-category-container p-3">
        <h2 className='mb-4'>All Enquiries</h2>

        {message && <p className="text-danger">{message}</p>}

        {enquiries.length > 0 ? (
          <>
            <table className="table table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th>SI.No</th>
                  <th>Date/Time</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Buyer Number</th>
                  <th>Buyer Name</th>
                  <th>Seller Name</th>
                  <th>Seller Number</th>
                </tr>
              </thead>
              <tbody>
                {displayedEnquiries.map((enquiry, index) => (
                  <tr key={enquiry._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "N/A"}</td>
                    <td>
                      {enquiry.PropertyImages?.length > 0 ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${enquiry.PropertyImages[0].replace('\\', '/')}`}
                          alt="Property"
                          style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>
                      {enquiry.propertyBedrooms} BHK {enquiry.propertyBathrooms} Bath{' '}
                      <i
                        className="fa fa-eye text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openModal(enquiry)}
                      ></i>
                    </td>
                    <td>{enquiry.customerIdNumber}</td>
                    <td>{enquiry.customername}</td>
                    <td>{enquiry.ownerName}</td>
                    <td>{enquiry.ownerNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination d-flex justify-content-center align-items-center">
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
          <p>No Enquiries found</p>
        )}
      </div>

      {/* Modal */}
      <div className="modal fade" id="propertyModal" tabIndex="-1" aria-labelledby="propertyModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="propertyModalLabel">Property Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedEnquiry ? (
                <div className="row">
                   {selectedEnquiry.PropertyImages?.length > 0 && (
                    <div className='col-sm-4'>
                      {selectedEnquiry.PropertyImages.map((img, i) => (
                        <img
                          key={i}
                          src={`${process.env.REACT_APP_API_URL}/${img.replace('\\', '/')}`}
                          alt="Property"
                          className="m-2"
                          style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                        />
                      ))}
                    </div>
                  )}
                  <div className='col-sm-8 ' style={{textAlign:"left"}}>
                      <p><strong>Property:</strong> {selectedEnquiry.propertyBedrooms} BHK {selectedEnquiry.propertyBathrooms} Bath</p>
                  <p><strong>Location:</strong> {selectedEnquiry.propertyLocality}</p>
                  <p><strong>City:</strong> {selectedEnquiry.propertyCity}</p>
                      <p><strong>Area:</strong> {selectedEnquiry.propertyBuildUpArea}</p>
                         <p><strong>Amount:</strong> {selectedEnquiry.propertyPrice}</p>
                  <p><strong>Builder Name:</strong> {selectedEnquiry.ownerName}</p>
                  <p><strong>Builder Number:</strong> {selectedEnquiry.ownerNumber}</p>
                
                  <p><strong>Date:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                 </div> 
                </div>
              ) : (
                <p>No details available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEnquiry;
