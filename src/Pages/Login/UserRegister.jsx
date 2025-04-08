import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserRegister.css' // Import the CSS file for styling
import supabase from '../../config/supabaseClient'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phoneno: '',
    address: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Insert user data into the Supabase table
      const { data, error } = await supabase.from('clientinfo').insert([
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneno :formData.phone,
          address: formData.address
        }
      ])

      if (error) {
        setErrorMessage('Failed to register user. Please try again.')
        console.error('Error inserting data:', error)
        alert(" something error..") // Show error message to the user
      } else {
        setSuccessMessage('Registration successful! Your data has been saved.')
        setErrorMessage('')
        console.log('Inserted data:', data)
        alert("Registration successful! Your data has been saved.") // Show success message to the user
        navigate('/login') // Redirect to login page after successful registration
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setErrorMessage('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <div className="container-fluid register">
      <div className="card shadow-lg p-4 mb-5 bg-white">
        <h2 className="text-center mb-4">User Registration</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
              <label htmlFor="phone">Phoneno</label>
              <input
                type="tel"
                className="form-control"
                id="phoneno"
                name="phoneno"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                required
                onChange={handleChange}
              ></textarea>
            </div>
            {errorMessage && (
              <div className="alert alert-danger mt-2" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success mt-2" role="alert">
                {successMessage}
              </div>
            )}
            <button type="submit" className="btn btn-primary w-100 mt-3">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserRegister