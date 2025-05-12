import React, { useState } from 'react';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8083/api/auth/login', formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            const data = response.data; // Extract response data
            console.log("Login response data:", data);

            if (!data) {
                throw new Error('Login failed. No data received.');
            } else if (response.status !== 200) {
                throw new Error(data.message || 'Invalid credentials. Please try again.');
                
            }

            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(data));

            // Navigate to dashboard
            navigate('/ClientDashboard');

        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }

        // Function to delete user data from localStorage
        const clearUserData = () => {
            localStorage.removeItem('userData');
            console.log("User data removed from localStorage.");
        };

        // Example usage: Call `clearUserData()` when logging out or as needed
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow border-0">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login</h3>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
