import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegister.css';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileno: '',
    address: '',
    pincode: '',
   
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    
      try {
        // Validate form data
        if (!formData.name || !formData.email || !formData.password) {
          setErrorMessage('Please fill in all required fields');
          return;
        }
    
        // Send data to Spring Boot backend
        const response = await fetch('http://localhost:8083/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
      
    
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
    
        setSuccessMessage('Registration successful! Redirecting...');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
    
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred during registration');
        console.error('Registration error:', error);
      }
    };

   
  

  return (
    <div className="container-fluid register d-flex justify-content-center align-items-center vh-100 bg-light">
      <motion.div
        className="register-card card shadow-lg p-5 rounded-4"
        style={{ maxWidth: '600px', width: '100%' }} // Increased card size
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="fw-bold">Full Name</label>
            <input type="text" className="form-control" id="name" name="name" required onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="fw-bold">Email Address</label>
            <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="fw-bold">Password</label>
            <input type="password" className="form-control" id="password" name="password" required onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="mobileno" className="fw-bold">Phone Number</label>
            <input type="tel" className="form-control" id="mobileno" name="mobileno" required onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="address" className="fw-bold">Address</label>
            <textarea className="form-control" id="address" name="address" rows="3" required onChange={handleChange}></textarea>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="pincode" className="fw-bold">Pincode</label>
            <input type="text" className="form-control" id="pincode" name="pincode" required onChange={handleChange} />
          </div>
         

          {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}

          <motion.button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            whileHover={{ scale: 1.05 }}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserRegister;
