import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegister.css';
import { motion } from 'framer-motion'; // Import animation library
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phoneno: '',
    address: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Sign up user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) {
        setErrorMessage(authError.message);
        console.error('Auth error:', authError);
        return;
      }

      console.log('User signed up:', authData);
       {var user = authData.id}
      console.log('User ID:', user);

      // Insert user data into clientinfo table
      const { data: clientData, error: clientError } = await supabase
        .from('clientinfo')
        .insert([
          {
            client_id: user,
            name: formData.name,
            email: formData.email,
            phoneno: formData.phoneno,
            address: formData.address
          }
        ]);

      if (clientError) {
        setErrorMessage('Failed to save user details. Please try again.');
        console.error('Database error:', clientError);
        return;
      }

      console.log('User details saved:', clientData);

      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-fluid register d-flex justify-content-center align-items-center vh-100">
      <motion.div
        className="card register-card shadow-lg p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
      >
        <h2 className="text-center mb-4">User Registration</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" required onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" required onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" required onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phoneno">Phone Number</label>
              <input type="tel" className="form-control" id="phoneno" name="phoneno" required onChange={handleChange} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <textarea className="form-control" id="address" name="address" rows="3" required onChange={handleChange}></textarea>
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
        </div>
      </motion.div>
    </div>
  );
};

export default UserRegister;
