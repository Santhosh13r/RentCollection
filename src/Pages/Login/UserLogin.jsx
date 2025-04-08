import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserLogin.css' // Import the new CSS file
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../config/supabaseClient'

const UserLogin = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "" // Add password field for validation
    })
    const [errorMessage, setErrorMessage] = useState("") // State for error message
    const [successMessage, setSuccessMessage] = useState("") // State for success message

    // Handle input changes
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Check if the email and password exist in the Supabase table
            const { data, error } = await supabase
                .from('clientinfo') // Replace 'clientinfo' with your actual table name
                .select('*')
                .eq('email', user.email)
                .eq('password', user.password) // Validate password

            if (error) {
                setErrorMessage('Failed to fetch user data. Please try again.')
                console.error('Error fetching user data:', error)
                return
            }

            if (data.length === 0) {
                setErrorMessage('Invalid email or password. Please try again.')
                return
            }

            // User data is valid
            setSuccessMessage('Login successful! Redirecting to dashboard...')
            console.log('User data validated:', data)
            navigate('/ClientDashboard') // Redirect to ClientDashboard page

        } catch (err) {
            console.error('Unexpected error:', err)
            setErrorMessage('An unexpected error occurred. Please try again later.')
        }
    }

    return (
        <>
            <div className="container-fluid signup">
                <div className="card shadow-lg p-3 mb-5 bg-white">
                    <h2><i className="fa-solid fa-users"></i></h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} method="post">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            {errorMessage && ( // Display error message if it exists
                                <div className="alert alert-danger mt-2" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            {successMessage && ( // Display success message if it exists
                                <div className="alert alert-success mt-2" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary text-center mt-3">Sign In</button>
                            <div className="account-footer">
                                <p className="text-center mt-2">
                                    Create a new account? <Link to="/Register">Register</Link>
                                </p>
                                <p className="text-center">
                                    Forgot Password? <a href="/">Reset Password</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin