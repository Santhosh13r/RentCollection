import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './paymentpage.css';
import { motion } from 'framer-motion';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Rent Collection',
      description: 'Monthly Rent Payment',
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log('Payment successful:', response);
      },
      prefill: {
        name: 'Your Name', // Replace with dynamic user data if available
        email: 'your-email@example.com', // Replace with dynamic user data if available
        contact: '9999999999' // Replace with dynamic user data if available
      },
      theme: {
        color: '#3399cc'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="container-fluid payment-page d-flex justify-content-center align-items-center vh-100">
      <motion.div
        className="payment-card card shadow p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-center mb-4 fw-bold">Make Your Payment</h3>
        <div className="form-group mb-3">
          <label htmlFor="amount">Enter Amount (INR)</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <motion.button
          className="btn btn-success w-100 mt-3"
          onClick={handlePayment}
          whileHover={{ scale: 1.05 }}
        >
          Pay Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
