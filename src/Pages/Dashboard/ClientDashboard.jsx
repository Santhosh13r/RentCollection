import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Tab, Nav } from 'react-bootstrap';
import { 
  FaUser, FaHome, FaDollarSign, FaCalendarAlt, FaPhoneAlt, 
  FaCreditCard, FaReceipt, FaLock, FaCheckCircle, FaGooglePay 
} from 'react-icons/fa';

const RentPaymentDashboard = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    try {
      // Create an order on the backend
      const response = await fetch('http://localhost:8083/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: paymentAmount * 100 }) // Amount in paise
      });

      const orderData = await response.json();
      if (!orderData || !orderData.id) {
        throw new Error('Failed to create Razorpay order.');
      }

      // Initialize Razorpay
      const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
        amount: orderData.amount,
        currency: 'INR',
        name: 'Rent Collection',
        description: 'Rent Payment',
        order_id: orderData.id,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Handle payment success (e.g., update backend and UI)
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || ''
        },
        theme: {
          color: '#4a89dc'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (!user) return <p className="text-center mt-5">Loading user data...</p>;

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f5f9ff', minHeight: '100vh' }}>
      <div className="row g-4">
        {/* User Profile Column */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div 
              className="text-white p-4" 
              style={{ 
                background: 'linear-gradient(135deg, #4a89dc, #7ab3ef)',
                borderTop: '4px solid #4a89dc'
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/45.jpg" 
                  alt="Profile" 
                  className="rounded-circle border border-3 border-white mb-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <h4 className="mb-1">{user.name || "User"}</h4>
                <small>ID: {user.id || "N/A"}</small>
              </div>
            </div>
            
            <div className="card-body">
              <div className="d-flex align-items-start mb-3">
                <div className="me-3 p-2 rounded-circle" style={{ backgroundColor: '#e6f0fa', color: '#4a89dc' }}>
                  <i className="fas fa-home"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Address</h6>
                  <p className="mb-0 fw-bold">{user.address || "N/A"}</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start mb-3">
                <div className="me-3 p-2 rounded-circle" style={{ backgroundColor: '#e6f0fa', color: '#4a89dc' }}>
                  <i className="fas fa-map-pin"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Pincode</h6>
                  <p className="mb-0 fw-bold">{user.pincode || "N/A"}</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start">
                <div className="me-3 p-2 rounded-circle" style={{ backgroundColor: '#e6f0fa', color: '#4a89dc' }}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-0">Email</h6>
                  <p className="mb-0 fw-bold">{user.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Dashboard Column */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <h4 className="mb-0" style={{ color: '#4a89dc' }}>Rent Payment</h4>
              </div>
              
              <form onSubmit={handleSubmitPayment}>
                <div className="mb-3">
                  <label htmlFor="paymentAmount" className="form-label">Enter Payment Amount</label>
                  <input 
                    type="number" 
                    id="paymentAmount"
                    className="form-control"
                    placeholder="Enter amount" 
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                  />
                </div>

                <ul className="nav nav-tabs mb-3" role="tablist">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'online' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('online')}
                      type="button"
                    >
                      <i className="fas fa-credit-card me-2"></i> Online Payment
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'gpay' ? 'active' : ''}`} 
                      onClick={() => setActiveTab('gpay')}
                      type="button"
                    >
                      <i className="fas fa-google-pay me-2"></i> GPay
                    </button>
                  </li>
                </ul>

                {activeTab === 'online' && (
                  <div className="card border-0 mb-4" style={{ backgroundColor: '#e6f0fa' }}>
                    <div className="card-body">
                      <h5 className="mb-3">Secure Payment</h5>
                      
                      <div className="row g-3">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input 
                              type="text" 
                              id="cardNumber"
                              className="form-control"
                              placeholder="1234 5678 9012 3456" 
                              name="number"
                              value={cardDetails.number}
                              onChange={handleCardChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-2">
                          <div className="mb-3">
                            <label htmlFor="cardExpiry" className="form-label">Expiry</label>
                            <input 
                              type="text" 
                              id="cardExpiry"
                              className="form-control"
                              placeholder="MM/YY" 
                              name="expiry"
                              value={cardDetails.expiry}
                              onChange={handleCardChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="col-md-2">
                          <div className="mb-3">
                            <label htmlFor="cardCVV" className="form-label">CVV</label>
                            <input 
                              type="text" 
                              id="cardCVV"
                              className="form-control"
                              placeholder="123" 
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleCardChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'gpay' && (
                  <div className="card border-0 mb-4" style={{ backgroundColor: '#e6f0fa' }}>
                    <div className="card-body">
                      <h5 className="mb-3">Manual GPay Payment</h5>
                      <p>Please send your payment to the following GPay ID and confirm below:</p>
                      
                      <div className="card mb-3">
                        <div className="card-body">
                          <p><strong>GPay ID:</strong> Rentcollection@gmail.com</p>
                          <p><strong>Amount:</strong> ${paymentAmount}</p>
                          <p><strong>Reference:</strong> Rent-July2024-Apt4B</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="paymentScreenshot" className="form-label">Upload Payment Screenshot</label>
                        <input 
                          type="file" 
                          id="paymentScreenshot"
                          className="form-control"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100" onClick={handleSubmitPayment}>
                  {activeTab === 'online' ? (
                    <i className="fas fa-lock me-2"></i>
                  ) : (
                    <i className="fas fa-check-circle me-2"></i>
                  )}
                  {activeTab === 'online' ? `Pay $${paymentAmount} Now` : 'Confirm Payment Sent'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPaymentDashboard;