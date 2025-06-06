import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Adjust the path according to your directory structure
import './addcategory.css'; // Import a CSS file for styling
import { useParams } from 'react-router-dom'; // For accessing URL parameters

const UpdatePlan = () => {
  const { planId } = useParams(); // Extract planId from URL parameters
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('');
  const [planPrice, setPlanPrice] = useState('');
  const [planList, setPlanList] = useState(['']); // Initialize with one empty string
  const [active, setActive] = useState(true);

  // Fetch existing plan details on component mount
  useEffect(() => {
    console.log("planId:", planId); // Add this line
    if (planId) {
      fetch(`${process.env.REACT_APP_API_URL}/GetplanDetails/${planId}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok') {
            const plan = data.data;
            setPlanName(plan.planName);
            setPlanType(plan.planType);
            setPlanPrice(plan.planPrice);
            setPlanList(plan.planList);
            setActive(plan.active);
          } else {
            alert('Failed to fetch plan details');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [planId]);
  

  const handleAddPlanItem = () => {
    setPlanList([...planList, '']); // Add a new empty string to the array
  };

  const handleRemovePlanItem = (index) => {
    const newList = [...planList];
    newList.splice(index, 1); // Remove item at the specified index
    setPlanList(newList);
  };

  const handlePlanItemChange = (e, index) => {
    const newList = [...planList];
    newList[index] = e.target.value; // Update the value at the specific index
    setPlanList(newList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/updatePlan/${planId}`, { // Update endpoint
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ planName, planType, planPrice, planList, active })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "updatePlan");
      if (data.status === 'ok') {
        alert('Plan updated successfully!');
        window.location.href = "/SuperAdmin/Plandetails";
      } else {
        alert('Plan update failed!');
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div className="add-category-container">
      <Sidebar />
      <div className="add-category-content">
        <h1 className="page-title">Update Plan</h1>
        <form onSubmit={handleSubmit} className="category-form">
          <div className='form-row row'>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="planName">Plan Name</label>
              <input
                type='text'
                id='planName'
                placeholder='Plan Name'
                className='form-control'
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="planType">Plan Type</label>
              <input
                type='text'
                id='planType'
                placeholder='Plan Type'
                className='form-control'
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="planPrice">Plan Price</label>
              <input
                type='text'
                id='planPrice'
                placeholder='Plan Price'
                className='form-control'
                value={planPrice}
                onChange={(e) => setPlanPrice(e.target.value)}
              />
            </div>

            <div className='form-group col-12'>
              <label>Plan List</label>
              {planList.map((item, index) => (
                <div key={index} className="mb-2">
                  <input
                    type='text'
                    placeholder={`Plan Item ${index + 1}`}
                    className='form-control'
                    value={item}
                    onChange={(e) => handlePlanItemChange(e, index)}
                  />
                  <button type="button" onClick={() => handleRemovePlanItem(index)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={handleAddPlanItem}>Add More Items</button>
            </div>

            <div className='form-group'>
              <label>Status</label>
              <div className="status-options">
                <label>
                  <input
                    type='radio'
                    name="status"
                    value={true}
                    checked={active === true}
                    onChange={() => setActive(true)}
                  /> Active
                </label>
                <label>
                  <input
                    type='radio'
                    name="status"
                    value={false}
                    checked={active === false}
                    onChange={() => setActive(false)}
                  /> Inactive
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">Update Plan</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlan;
