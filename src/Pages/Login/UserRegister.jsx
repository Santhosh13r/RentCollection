import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserRegister.css';
import { motion } from 'framer-motion';
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/client';

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneno: '',
    address: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [clientError, setClientError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
     
        const{data,error}=await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        })

        if(error){
          setErrorMessage("Eror during registration. Please try again.");
          console.error('Login error:', error);
          return;
        }
       else{
        console.log("Registration successful:", data);
        setSuccessMessage("Registration successful! Please check your email for verification.");
        // Store user data in the database
        const { data: userdata, error: userdataerror } = await supabase
          .from('users')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phoneno: formData.phoneno,
              address: formData.address,
              password: formData.password
            }
          ]);

        if (userdataerror) {
          console.error("Error storing user data:", userdataerror);
          setClientError(`Error storing user data: ${userdataerror.message}`);
          setErrorMessage("There was an issue saving your details. Please try again later.");
        } else {
          setSuccessMessage("Registration successful! Redirecting to login...");
          console.log("User data stored successfully:", userdata);
          setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-fluid register d-flex justify-content-center align-items-center vh-100">
      <motion.div
        className="register-card card shadow p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-center mb-4 fw-bold">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Full Name</label>
            <input type="text" className="form-control" id="name" name="name" required onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email Address</label>
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
          {clientError && <div className="alert alert-danger mt-2">{clientError}</div>}
          {/* {authError && <div className="alert alert-danger mt-2">{authError}</div>} */}
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
