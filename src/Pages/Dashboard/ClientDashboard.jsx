import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = () => {
            const storedUser = localStorage.getItem('userData'); // Updated key to match login storage
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                }
            }
        };

        fetchUserData();

        // Optional: Add an event listener to detect changes in localStorage
        const handleStorageChange = () => fetchUserData();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (!user) return <p className="text-center mt-5">Loading user data...</p>;

    return (
        <div className="container mt-5">
    <div className="row">
        {/* User Profile Card - 4 columns */}
        <div className="col-md-4 mb-4">
            <div className="card shadow border-0" style={{ 
                background: 'linear-gradient(135deg, #e6f2ff 0%, #cce5ff 100%)',
                borderLeft: '5px solid #4d94ff',
                borderRadius: '10px'
            }}>
                <div className="card-body text-center py-4">
                    <div className="mb-3">
                        <i className="fas fa-user-circle" style={{ 
                            fontSize: '3rem', 
                            color: '#4d94ff' 
                        }}></i>
                    </div>
                    <h4 className="card-title mb-3" style={{ color: '#0066cc' }}>Welcome, {user.name || "User"}!</h4>
                    <div className="text-start ps-4">
                        <p className="card-text mb-2">
                            <i className="fas fa-envelope me-2" style={{ color: '#4d94ff' }}></i>
                            <strong>Email:</strong> {user.email}
                        </p>
                        {user.role && <p className="card-text mb-2">
                            <i className="fas fa-user-tag me-2" style={{ color: '#4d94ff' }}></i>
                            <strong>Role:</strong> {user.role}
                        </p>}
                        {user.phone && <p className="card-text mb-2">
                            <i className="fas fa-phone me-2" style={{ color: '#4d94ff' }}></i>
                            <strong>Phone:</strong> {user.phone}
                        </p>}
                        {user.address && <p className="card-text mb-2">
                            <i className="fas fa-map-marker-alt me-2" style={{ color: '#4d94ff' }}></i>
                            <strong>Address:</strong> {user.address}
                        </p>}
                        {user.pincode && <p className="card-text mb-2">
                            <i className="fas fa-map-pin me-2" style={{ color: '#4d94ff' }}></i>
                            <strong>Pincode:</strong> {user.pincode}
                        </p>}
                        {user.city && <p className="card-text mb-2">
                            <i className="fas fa-city me-2" style={{ color: '#4d94ff' }}></i>
                            <strong>City:</strong> {user.city}
                        </p>}
                        {user.state && <p className="card-text mb-2">
                            <i className="fas fa-flag me-2" style={{ color: '#4d94ff' }}></i>
                            <strong>State:</strong> {user.state}
                        </p>}
                    </div>
                </div>
            </div>
        </div>

        {/* Rent Payment Table - 8 columns */}
        <div className="col-md-8">
            <div className="card shadow border-0">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Next Month's Rent Payment</h5>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Due Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sunshine Apartments (#203)</td>
                                    <td>June 5, 2023</td>
                                    <td>$1,200.00</td>
                                    <td><span className="badge bg-warning text-dark">Pending</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-primary">
                                            <i className="fas fa-credit-card me-1"></i> Pay Now
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mountain View Villa</td>
                                    <td>June 10, 2023</td>
                                    <td>$1,500.00</td>
                                    <td><span className="badge bg-success">Paid</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-secondary" disabled>
                                            <i className="fas fa-receipt me-1"></i> Receipt
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="table-light">
                                    <td colSpan="2"><strong>Total</strong></td>
                                    <td><strong>$2,700.00</strong></td>
                                    <td colSpan="2"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <div className="mt-3 p-3 bg-light rounded">
                        <h6><i className="fas fa-info-circle text-primary me-2"></i>Payment Instructions</h6>
                        <p className="mb-1">• Make payment before due date to avoid late fees</p>
                        <p className="mb-1">• A 5% late fee will be applied after due date</p>
                        <p className="mb-0">• Contact landlord for any payment issues</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default ClientDashboard;
