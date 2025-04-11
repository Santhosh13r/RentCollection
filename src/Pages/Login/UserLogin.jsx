import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

const UserLogin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            // Authenticate with Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: user.password,
            });

            if (error) {
                setErrorMessage("Invalid email or password. Please try again.");
                setTimeout(() => navigate('/Register'), 2000); // Redirect to register after 2 seconds
                console.error('Login error:', error);
            } else {
                console.log('Login successful:', data);
                navigate('/ClientDashboard'); // Redirect to dashboard
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid login">
            <div className="card shadow-lg p-3 mb-5 bg-white">
                <h2><i className="fa-solid fa-users"></i></h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" required onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" required onChange={handleChange} />
                        </div>
                        {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
                        <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                        <div className="account-footer text-center mt-2">
                            <p>New here? <Link to="/Register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
