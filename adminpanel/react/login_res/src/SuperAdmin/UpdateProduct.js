import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './addcategory.css';

const UpdateProductSuperAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lookingFor, setlookingFor] = useState('');
  const [city, setCity] = useState('');
    const [locality, setlocality] = useState('');
  const [smalldescription, setSmallDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);

  const [bedrooms, setBedrooms] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/GetproductVendor/${id}`);
      const data = response.data;
  
      if (data.status === 'ok') {
        const product = data.data;
        setlookingFor(product.lookingFor);
         setCategory(product.categoryId);
        setCity(product.city);
          setlocality(product.locality);
        setSmallDescription(product.smalldescription);
        setDescription(product.description);
        setActive(product.active);
      
        setBedrooms(product.bedrooms);
       
        if (product.image) {
          setImagePreview(`${process.env.REACT_APP_API_URL}/${product.image.replace('\\', '/')}`);
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getcategories`);
      const data = response.data;

      if (data.status === 'ok') {
        setCategories(data.data);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('_id', id);
    formData.append('lookingFor', lookingFor);
    formData.append('city', city);
    formData.append('smalldescription', smalldescription);
    if (image) formData.append('image', image);
    formData.append('description', description);
    formData.append('active', active);
    formData.append('locality', locality);
    formData.append('bedrooms', bedrooms);
    formData.append('category', category);
  
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateProductVendor`, formData);
      const data = response.data;
  
      if (data.status === 'ok') {
        alert('Product updated successfully!');
        navigate('/Vendor/AllProduct');
      } else {
        alert(data.message || 'Product update failed!');
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage('An error occurred while updating the product.');
    }
  };

  return (
       <div>
    <Sidebar />
    <div className="add-category-container">
      <div className="add-category-content">
        <h1 className="page-title">Update Property</h1>
        <form onSubmit={handleSubmit} className="category-form">
          <div className='form-group'>
            <label htmlFor="category">Category</label>
            <select id="category" className="form-control" onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
              <option value="others">Others</option>
            </select>
          </div>
          <div className='form-row row'>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="name">Name</label>
              <input
                type='text'
                id='name'
                placeholder='Product Name'
                className='form-control'
                value={lookingFor}
                onChange={(e) => setlookingFor(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="slug">Slug</label>
              <input
                type='text'
                id='slug'
                placeholder='Product Slug'
                className='form-control'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="originalPrice">Original Price</label>
              <input
                type='text'
                id='locality'
                placeholder='Original Price'
                className='form-control'
                value={locality}
                onChange={(e) => setlocality(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="sellingPrice">Selling Price</label>
              <input
                type='text'
                id='bedrooms'
                placeholder='Selling Price'
  className='form-control'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor="smalldescription">Small Description</label>
              <textarea
                id='smalldescription'
                className='form-control'
                placeholder='Small Description'
                rows="3"
                value={smalldescription}
                onChange={(e) => setSmallDescription(e.target.value)}
              />
            </div>
            <div className='form-group mb-4'>
              <label htmlFor="description">Description</label>
              <textarea
                id='description'
                className='form-control'
                placeholder='Product Description'
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='form-group col-sm-6 mb-4'>
              <label htmlFor="image">Image</label>
              <input
                type='file'
                id='image'
                className='form-control'
                accept='image/*'
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
              )}
            </div>
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
          <button type="submit" className="btn submit-btn">Update Product</button>
        </form>
      </div>
    </div>  </div>
  );
};

export default UpdateProductSuperAdmin;
